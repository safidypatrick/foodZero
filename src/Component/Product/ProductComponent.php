<?php
namespace App\Component\Product;

use App\Document\Product;
use App\Component\Common\Validator;
use App\Document\Boutique;
use Doctrine\ODM\MongoDB\DocumentManager;
use App\Helpers\CurrencyHelper;

class ProductComponent {
    private $validator = null;
    private $dm = null;

    public function __construct(Validator $validator, DocumentManager $dm) {
        $this->validator = $validator;
        $this->dm = $dm;
    }

    public function create($name, $designation, $prixVente) {
        
        $product = new Product();
        $product->setName($name);
        $product->setDesignation($designation);
        $product->setPrixVente(CurrencyHelper::format($prixVente));

        if ($errors = $this->validator->check($product)) {
            return $errors;
        }

        $this->dm->persist($product);
        $this->dm->flush();

        return $product;
    }

}