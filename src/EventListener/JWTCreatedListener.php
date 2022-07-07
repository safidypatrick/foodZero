<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $expiration = new \DateTime('+1 day');
        $expiration->setTime(2, 0, 0);


        // Testing if JWT token expired
        // $expiration = new \DateTime();
        // $expiration->add(new \DateInterval('PT3600S'));

        $payload        = $event->getData();
        $payload['exp'] = $expiration->getTimestamp();

        $event->setData($payload);
    }
}