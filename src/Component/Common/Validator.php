<?php
namespace App\Component\Common;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class Validator {
    private $validator = null;

    public function __construct(ValidatorInterface $validator) {
        $this->validator = $validator;
    }

    public function check($object) {
        $errors = $this->validator->validate($object);

        if (count($errors) > 0) {
            return $errors;
        }

        return false;
    }
}