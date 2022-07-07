<?php
namespace App\Component\Common;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Query\Expr;

class FilterHandler {
    private $validator = null;
    private $dm = null;

    public function __construct(ValidatorInterface $validator, DocumentManager $dm) {
        $this->validator = $validator;
        $this->dm = $dm;
    }

    public function handle($object, $filters = null, $appends = null) {
        $qb = $this->dm->createQueryBuilder($object)->find();

        if (isset($filters['search'])) {
            // Search handling
            $search = $filters['search'];

            foreach ($search['fields'] as $field) {
                $expr = new Expr($this->dm);
                $expr = $expr->field($field)->equals(new \MongoDB\BSON\Regex(''. $search['value'], 'i'));
                $qb->addOr($expr);
            }
        }

        if (isset($appends) && is_array($appends)) {
            foreach ($appends as $append) {
                $field = $append['field'];
                $operator = $append['operator'];
                $value = $append['value'];

                $expr = new Expr($this->dm);
                $expr = $expr->field($field)->$operator($value);
                $qb->addAnd($expr);
            }
        }

        $limit = 10;
        $current = 1;
        $counter = clone $qb;

        if (isset($filters['pagination'])) {
            // Pagination handling
            $pagination = $filters['pagination'];
            $limit = $pagination['limit'];
            $current = $pagination['current'];
        }

        $page = $this->page($counter, $limit, $current);

        $qb
            ->limit($page['limit'])
            ->skip($page['skip']);

        $rows = $qb
            ->getQuery()
            ->execute();

        

        return [
            'rows' => $rows,
            'page' => @$page ? $page : null
        ];
    }

    private function page($counter, $limit, $current) {
        $skip = 0;

        if ($current > 1) $skip = ($current - 1) * $limit;

        $total = $counter
                    ->count()
                    ->getQuery()
                    ->execute();

        $number = ceil($total / $limit);

        return [
            'limit' => $limit,
            'skip' => $skip,
            'total' => $total,
            'number' => $number
        ];
    }
}