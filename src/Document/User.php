<?php
namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @MongoDB\Document(collection="users")
*/
class User implements UserInterface
{
    /** 
     * @MongoDB\Id
     * @Groups("user")
    */
    protected $id;

    /** @MongoDB\Field(type="string")
     * @Groups("user")
    */
    protected $username;

    /** @MongoDB\Field(type="string") 
     * @Groups("user")
    */
    protected $password;

    /** @MongoDB\Field(type="string") 
     * @Groups("user")
    */
    protected $name;

    /** @MongoDB\Field(type="string") 
     * @Groups("user")
    */
    protected $email;

    /** @MongoDB\Field(type="string") 
    * @Groups("user")
    */
    protected $type;

    /** @MongoDB\Field(type="string") 
     * @Groups("user")
    */
    protected $setup = "INACHEVER";
  
    /** @MongoDB\Field(type="string") 
     * @Groups("user")
    */
    protected $contact;

    /** @MongoDB\Field(type="collection") 
     * @Groups("user")
    */
    private $roles = [];

    public function getId() { return $this->id; }

    public function getUsername(): ?string { return $this->username; }
    public function setUsername(string $username): void { $this->username = $username; }

    public function getPassword(): ?string { return $this->password; }
    public function setPassword(string $password): void { $this->password = $password; }

    public function getName(): ?string { return $this->name; }
    public function setName(string $name): void { $this->name = $name; }

    public function getType(): ?string { return $this->type; }
    public function setType(string $type): void { $this->type = $type; }

    public function getSetup(): ?string { return $this->setup; }
    public function setSetup(string $setup): void { $this->setup = $setup; }

    public function getEmail(): ?string { return $this->email; }
    public function setEmail(string $email): void { $this->email = $email; }

    public function getContact(): ?string { return $this->contact; }
    public function setContact(string $contact): void { $this->contact = $contact; }


    public function getRoles() {
        if (empty($this->roles)) return ['ROLE_USER'];

        return $this->roles;
    }

    public function setRoles($role) { $this->roles = [$role]; }

    public function getSalt() { return null; }

    public function eraseCredentials() { }
}