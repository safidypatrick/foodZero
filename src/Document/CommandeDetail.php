<?php
namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
// use Doctrine\ODM\MongoDB\PersistentCollection as Collection;
use Symfony\Component\Validator\Constraints as Assert;
use App\Document\Commande;


/**
 * @MongoDB\Document(collection="commande_details")
 */
class CommandeDetail
{
    /** @MongoDB\Id */
    protected $id;

   
    /** 
     * @MongoDB\Field(type="date") 
     * @Assert\NotBlank
     * Groups("commande_detail")
     */
    protected $dateCreation;


     /** 
     * @MongoDB\Field(type="string") 
     * @Assert\NotBlank
     * Groups("commande_detail")
     */
    protected $productId;


     /** 
     * @MongoDB\Field(type="float") 
     * @Assert\NotBlank
     * Groups("commande_detail")
     */
    protected $quantity;


     /** 
     * @MongoDB\Field(type="float") 
     * @Assert\NotBlank
     * Groups("commande_detail")
     */
    protected $prixVente;


     /** 
     * @MongoDB\ReferenceOne(targetDocument=Commande::class)
     * Groups("commande_detail")
     */
    protected $commande = null;

    public $product;


    public function __construct() {
        $this->dateCreation = new \DateTime();
    }

    public function getId() { return $this->id; }

    public function getDateCreation(): ?\DateTime { return $this->dateCreation; }

    public function getPrixVente(): ?float { return $this->prixVente; }
    public function setPrixVente(float $prixVente): void { $this->prixVente = $prixVente; }
    
    public function getQuantity(): ?float { return $this->quantity; }
    public function setQuantity(float $quantity): void { $this->quantity = $quantity; }

    public function getProductId(): ?string { return $this->productId; }
    public function setProductId(string $productId): void { $this->productId = $productId; }

    public function getProduct() { return $this->product; }
    public function setProduct($product): void { $this->product = $product; }

    public function getCommande(): ?Commande { return $this->commande; }
    public function setCommande(Commande $commande): void { $this->commande = $commande; }

}