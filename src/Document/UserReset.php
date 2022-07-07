<?php
namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
// use Doctrine\ODM\MongoDB\PersistentCollection as Collection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Document\User;

/**
 * @MongoDB\Document(collection="user_resets")
*/
class UserReset
{
    /** 
     * @MongoDB\Id 
     * @Groups("user_reset")
    */
    protected $id;
   
    /** 
     * @MongoDB\Field(type="date") 
     * @Assert\NotBlank
     * @Groups("user_reset")
    */
    protected $dateCreation;

    /** 
     * @MongoDB\Field(type="date") 
     * @Assert\NotBlank
     * @Groups("user_reset")
    */
    protected $dateExpiration;


    /** 
     * @MongoDB\ReferenceOne(targetDocument=User::class)
     * @Groups("user_reset")
    */
    protected $user;

    /** 
     * @MongoDB\Field(type="string") 
     * @Groups("user_reset")
    */
    protected $accessToken;

    public function __construct() {
        $this->dateCreation = new \DateTime();
    }

    public function getId() { return $this->id; }

    public function getDateCreation(): ?\DateTime { return $this->dateCreation; }

    public function getDateExpiration(): ?\DateTime { return $this->dateExpiration; }
    public function setDateExpiration(\DateTime $dateExpiration): void { $this->dateExpiration = $dateExpiration; }
    
    public function getUser(): ?User { return $this->user; }
    public function setUser(User $user): void { $this->user = $user; }

    public function getAccessToken(): ?string { return $this->accessToken; }
    public function setAccessToken(string $accessToken): void { $this->accessToken = $accessToken; }
}