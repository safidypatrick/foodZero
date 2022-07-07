<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Asset\UrlPackage;
use Symfony\Component\Asset\VersionStrategy\EmptyVersionStrategy;
use Symfony\Component\Serializer\SerializerInterface;

class BaseController extends AbstractController
{
    protected $requestStack;
    public $serializer;
    protected $packages;

    public function __construct(RequestStack $requestStack, SerializerInterface $serializer)
    {
        $this->requestStack = $requestStack;
        $this->serializer = $serializer;
        $this->packages = new UrlPackage(
            'http://localhost:8000/',
            new EmptyVersionStrategy()
        );
    }

    public function data($column = null)
    {
        $request = $this->requestStack->getCurrentRequest();
        $body = $request->getContent();
        $body = json_decode($body, true);

        if ($column && isset($body[$column])) return $body[$column];

        return $body;
    }

    public function serialize($object, $groups)
    {
        $json = $this->serializer->serialize(
            $object,
            'json',
            ['groups' => $groups]
        );

        return json_decode($json);
    }
}
