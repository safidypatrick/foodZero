<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Request;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/{reactRouting}/{params}", name="home", defaults={"reactRouting": null, "params": null})
     */
    public function index(): Response {
        return $this->render('default/index.html.twig');
    }
}
