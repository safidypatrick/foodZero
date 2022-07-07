<?php
namespace App\EventListener;

// use App\Component\User\UserComponent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener {
    // private $userComponent = null;

    // public function __construct(UserComponent $userComponent) {
    //     $this->userComponent = $userComponent;
    // }

    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $auth_info = [];

        if ($event->getResponse()->getStatusCode() == 200) {
            $user_id = $user->getId();
            // $client = $this->userComponent->client($user_id);
            $auth_info = [
                'status' => 'success',
                'token' => $event->getData()['token'],
                'user' => [
                    // 'client_id' => @$client['id'] ? $client['id'] : null,
                    'user_id' => $user_id,
                    'name' => $user->getName(),
                    'username' => $user->getUsername(),
                    'roles' => $user->getRoles(),
                    'setup' => $user->getSetup(),
                ]
            ];
        }

        $event->setData($auth_info);
    }
}