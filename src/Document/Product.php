<?php
namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @MongoDB\Document(collection="products")
 */
class Product
{
    /** 
     * @MongoDB\Id 
     * @Groups("product")
     */
    protected $id;

    /** 
     * @MongoDB\Field(type="string") 
     * @Assert\NotBlank
     * @Groups("product")
     */
    protected $name;

    /** 
     * @MongoDB\Field(type="string") 
     * @Assert\NotBlank
     * @Groups("product")
     */
    protected $designation;


    /** 
     * @MongoDB\Field(type="float")
     * @Groups("product")
     * */
    protected $prixVente;

    /** 
     * @MongoDB\Field(type="string") 
     */
    protected $status = "ACTIVE";

    public function getId() { return $this->id; }

    public function getName(): ?string { return $this->name; }
    public function setName(string $name): void { $this->name = $name; }

    public function getStatus(): ?string { return $this->status; }
    public function setStatus(string $status): void { $this->status = $status; }

    public function getDesignation(): ?string { return $this->designation; }
    public function setDesignation(string $designation): void { $this->designation = $designation; }

    public function getPrixVente(): ?float { return $this->prixVente; }
    public function setPrixVente(float $prixVente): void { $this->prixVente = $prixVente; }

}