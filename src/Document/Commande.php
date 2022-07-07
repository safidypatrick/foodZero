<?php
namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Document\User;



/**
 * @MongoDB\Document(collection="commandes")
 */
class Commande
{
    /** 
     * @MongoDB\Id 
     * @Groups("commande")
     */
    protected $id;
   
    /** 
     * @MongoDB\Field(type="date") 
     * @Assert\NotBlank
     * @Groups("commande")
     */
    protected $dateCreation;


    /** 
     * @MongoDB\ReferenceOne(targetDocument=User::class)
     * @Groups("commande")
    */
    protected $user;

    /** 
     * @MongoDB\Field(type="float") 
     * @Assert\NotBlank
     * @Groups("commande")
     */
    protected $montantTotal;

    /** 
     * @MongoDB\Field(type="string") 
     */
    protected $status = "ACTIVE";

    public function __construct() {
        $this->dateCreation = new \DateTime();
    }


    public function getId() { return $this->id; }

    public function getDateCreation(): ?\DateTime { return $this->dateCreation; }

    public function getMontantTotal(): ?float { return $this->montantTotal; }
    public function setMontantTotal(float $montantTotal): void { $this->montantTotal = $montantTotal; }

    public function getStatus(): ?string { return $this->status; }
    public function setStatus(string $status): void { $this->status = $status; }
    
    public function getUser(): ?User { return $this->user; }
    public function setUser(User $user): void { $this->user = $user; }

}