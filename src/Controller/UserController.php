<?php

namespace App\Controller;

use App\Document\User;
// use App\Document\Boutique;
use App\Document\UserReset;

use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\Response;  

use App\Controller\BaseController;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use App\Component\Common\UpdateHandler;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;


class UserController extends BaseController
{
    /**
     * @Route("/api/user/list", name="userlist", methods="POST")
     */
    public function list(DocumentManager $dm):Response {
        $user = $this->getUser();
        return $this->json([
            'status'=>'succes',
            'user'=> $user
        ]);
    }

    /**
    *@Route("/api/user/detail", name="userdetail", methods="POST")
    */
    public function detail(DocumentManager $dm){
        $userId = $this->getUser()->getId();
        $user = $dm->getRepository(User::class)->find($userId);
        return $this->json([
                'status'=>'succes',
                'user' =>$user
            ]);
    }

    /**
     * @Route("api/user/update", name="user_update", methods="POST")
     */
    public function updateUser(UpdateHandler $updateHandler): Response
    {
        $userId = $this->getUser()->getId();
        $data = $this->data();

        $update = ['name', 'username', 'email','contact'];
        $result = $updateHandler->handle(User::class, $update, $data, $userId);
        

        return $this->json([
            'status' => 'success',
            'data' => $data,
            'result' => $result
        ]);
    }

    /**
     * @Route("/api/user/type", name="type", methods="POST")
     */
    public function type(DocumentManager $dm):Response{
        $user = $this->getUser()->getId();

        $data = $this->data();
        $type = $data['type'];

        $users = $dm->createQueryBuilder(user::class)
            ->findAndUpdate()
            ->returnNew()
            ->field('id')->equals($user)
            ->field('type')->equals(null)

            ->field('type')->set($type)
            ->getQuery()
            ->execute();

        return $this->json([
            'status' => 'success',
            'user' => $users
        ], 201);

    }

     /**
     * @Route("/api/user/status", name="status", methods="POST")
     */
    public function status(DocumentManager $dm):Response{
        $userId = $this->getUser()->getId();

        $user = $dm->createQueryBuilder(user::class)
            ->findAndUpdate()
            ->returnNew()
            ->field('id')->equals($userId)
            ->field('setup')->equals('INACHEVER')
            ->field('setup')->set('ACHEVER')
            ->getQuery()
            ->execute();

        return $this->json([
            'status' => 'success',
            'user' => $user
        ], 201);

    }

    /**
	*@Route("/api/user/create", name="user_create", methods="POST")
    */
    public function userCreate(DocumentManager $dm, UserPasswordEncoderInterface $passwordEncoder):Response
    {
        $data = $this->data();
        $user = new User;
        $user->setUsername($data['username']);
        $user->setName($data['name']);
        $user->setEmail($data['email']);
        $user->setRoles("ROLE_GERANT");
        $user->setContact($data['contact']);
        //cryptage password
        $crypted_password = ($data['password']);
        $crypted_password = $passwordEncoder->encodePassword(
            $user,
            $crypted_password
        );
        $user->setPassword($crypted_password);
            
            if($data['password'] !== $data['confirmPassword'])
            {
                return $this->json([
                    'status'=>'error',
                    'message'=>' mot de passe non identique'
                    ],401);
            }
            $dm->persist($user);
            $dm->flush();	

            return $this->json([
                'status'=>'succes',
                'user'=>$user
            ],201);
    }

    /**
     * @Route("/api/auth/reset", name="user_reset", methods="POST")
     */
    public function resetPassword(DocumentManager $dm, MailerInterface $mailer): Response {
        $email = $this->data('email');

        $user = $dm->getRepository(User::class)->findOneBy(['email' => $email]);

        //check if user exist
        if (!isset($user))
            return $this->json([
                'status' => 'error',
                'message' => 'This user is not found!'
            ], 404);
        
        $userReset = new UserReset();

        $dateExpiration = new \DateTime();
        // $dateExpiration->setTimezone(new \DateTimeZone('Indian/Antananarivo'));
        $dateExpiration->modify('+15 minutes');

        $accessToken = $dateExpiration->format('YmdHisu');
        $accessToken = sha1($accessToken);

        $userReset->setDateExpiration($dateExpiration);
        $userReset->setUser($user);
        $userReset->setAccessToken($accessToken);
        
        $dm->persist($userReset);
        $dm->flush();

        //sending mail
        $email = (new TemplatedEmail())
            ->from('yevento.codinplay@gmail.com')
            ->to($userReset->getUser()->getEmail())
            ->subject('Réinitialisation du mot de passe')
            //path to the twig template
            ->htmlTemplate('emails/reset_password.html.twig')

            // pass variables (name => value) to the template
            ->context([
                'username' => $userReset->getUser()->getName(),
                'token' => $accessToken,
            ]);

        $mailer->send($email);

        return $this->json([
            'user' => $userReset,
            'date' => $dateExpiration,
            'token' => $accessToken
        ]);
    }
    
    /**
     * @Route("/api/token/verification", name="token_verification", methods="POST")
     */
    public function verificationToken(DocumentManager $dm): Response {
        $token = $this->data('token');

        $result = $dm->getRepository(UserReset::class)->findOneBy(['accessToken' => $token]);
        
        $user = $result->getUser();

        $user = $this->serialize(
            $user, 
            ['userReset', 'user']
        );
        
        return $this->json([
            'userReset' => $result,
        ]);
    }

    /**
     * @Route("/api/user/update/password", name= "update_password", methods="POST")
     */
    public function updatePassword(DocumentManager $dm, UserPasswordEncoderInterface $passwordEncoder): Response {
        $token = $this->data('token');
        $newPassword = $this-> data('password');
        $confirmPassword = $this->data('confirmPassword');
        
        $userReset = $dm->getRepository(UserReset::class)->findOneBy(['accessToken' => $token]);
        
        $dateExpiration = $userReset->getDateExpiration();
        $date = new \DateTime();

        if ($dateExpiration > $date) {
            if( $newPassword === $confirmPassword ){
                //Récupétion de l'utilisateur via l'userReset
                $user = $userReset->getUser();

                //cryptage mot de passe
                $crypted_password = $passwordEncoder->encodePassword(
                    $user,
                    $newPassword
                );
                //Mis à jour du mot de passe
                $user->setPassword($crypted_password);

                $dm->persist($user);
                $dm->flush();

                //réinitialisation du token et de la date d'expiration pour qu'ils ne soient plus réutilisables.
                // $userReset->setAccessToken(null);
                // $userReset->setDateExpiration(null);
    
                return $this->json([
                    'status' => 'success',
                    'message' => 'Mot de passe modifié'
                ], 201);
            }
            return $this->json([
                'status' => 'error',
                'message' => 'mot de passe non identique'
            ], 404);
        }
        return $this->json([
            'status' => 'error',
            'message' => 'Lien de réinitialisation du mot de passe expiré'
        ], 404);
    }
   
}
