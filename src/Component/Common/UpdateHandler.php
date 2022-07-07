<?php
namespace App\Component\Common;
use App\Document\User;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ODM\MongoDB\DocumentManager;

class UpdateHandler {
    private $validator = null;
    private $dm = null;

    public function __construct(ValidatorInterface $validator, DocumentManager $dm) {
        $this->validator = $validator;
        $this->dm = $dm;
    }

    public function handle($class, $columns, $data, $target) {
        $result = $this->update($class, $columns, $data, $target);
        
        if ($result instanceof $class) return [
            'status' => 'success',
            'updated' => $result
        ];

        if ($result === true) return [
            'status' => 'unupdated'
        ];
        

        if ($result instanceof \Symfony\Component\Validator\ConstraintViolationList) return [
            'status' => 'error',
            'errors' => $this->getViolation($result)
        ];

        return [
            'status' => 'fatal error',
            'message' => 'Erreur non reconnue'
        ];
    }

    private function update($class, $columns, $data, $target) {
        $object = $this->dm->getRepository($class)->find($target);

        if (!isset($object)) 
            throw new \Exception("The target document is not exist $class :id => $target");

        $countUpdate = 0;

        // Handling updates
        foreach ($columns as $column) {

            $type = is_array($column) ? 'array' : 'string';
            $field = $this->getColumn($column);

            if (property_exists($object, $field) && isset($data[$field])) {
                if ($this->check($object, $field)) {
                    if ($this->hasUpdate($object, $field, $data[$field])) {
                        if ($type === 'string') {
                            $object->{$this->setter($field)}($data[$field]);
                            $countUpdate++;
                        } else if ($type === 'array') {
                            $embedded = $column['embedded'];
                            $value = $this->dm->getRepository($embedded)->find($data[$field]);

                            if (isset($value)) {
                                $this->dm->createQueryBuilder($class)
                                    // Find the job
                                    ->findAndUpdate()
                                    ->returnNew()
                                    ->field('id')->equals($target)

                                    // Update found job
                                    ->field($field)->set($value)
                                    ->getQuery()
                                    ->execute();

                                $countUpdate++;
                            }
                        }
                    }
                }
            }
        }

        $errors = $this->validator->validate($object);

        if (count($errors) > 0) {
            // throw new \Exception("Updating failed $class (:id => $target). $errors");
            return $errors;
        }

        if ($countUpdate > 0) {
            $this->dm->persist($object);
            $this->dm->flush();

            return $object;
        }

        return true;
    }

    private function getViolation($errors) {

        // dd($errors);
        $violations = [];

        foreach($errors as $violation) {
            $violations []= $violation;
        }

        return $violations;
    }

    private function getColumn($column) {
        if (is_array($column)) {
            if (isset($column['column'])) return $column['column'];
        }

        return $column;
    }

    private function check($object, $column) {
        return method_exists($object, $this->getter($column)) && method_exists($object, $this->setter($column));
    }

    private function setter($column) {
        return 'set' . ucfirst($column); //set{field} exemple field = nom => setNom / field : Numero_facture
    }

    private function getter($column) {
        return 'get' . ucfirst($column); //get{field} exemple field = nom => getNom
    }

    private function hasUpdate($object, $column, $update) {
        return $object->{$this->getter($column)}() != $update;
    }
}