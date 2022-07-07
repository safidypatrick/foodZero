<?php

namespace App\Controller\Commande;

use App\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ODM\MongoDB\DocumentManager;

use App\Document\CommandeDetail;
use App\Document\Commande;
use App\Document\Product;
use App\Component\Commande\CommandeComponent;
use App\Component\Common\FilterHandler;
use App\Helpers\CurrencyHelper;

class CommandeController extends BaseController
{
    /**
     * @Route("/api/commande/lists", name="commande_lists", methods="POST")
     */
    public function lists(DocumentManager $dm):Response {
        $commandes = $dm->createQueryBuilder(Commande::class)
                ->select(
                    'id'
                )
                ->field('status')->equals('ACTIVE')
                ->getQuery()
                ->execute();

        return $this->json([
            'status'=>'succes',
            'commandes'=> $commandes
        ],201);

    }
    /**
     * @Route("/api/commande/list", methods={"POST"})
     */
    public function list(FilterHandler $filter): Response {
        $filters = $this->data('filters');
        $appends = [
            [
                
                'field' => 'status',
                'operator' => 'equals',
                'value' => 'ACTIVE'
            ]
        ];
        
        $filtered = $filter->handle(Commande::class, $filters, $appends);
        $commandes = $filtered['rows'];
        
        return $this->json([
            'status' => 'success',
            'commandes' => $commandes,
            'page' => $filtered['page']
        ]);
    }

    /**
     * @Route("/api/commande/create", methods={"POST"})
     */
    public function create(DocumentManager $dm, ValidatorInterface $validator): Response {
        $data = $this->data();
        $user = $this->getUser();
        $lines = $data['lines'];

        $montantTotal = 0;
        foreach ($lines as $line) {
            $montantTotal += (int)$line['prixVente'] * (int)$line['quantity'];
        }

        $commande = new Commande();
        $commande->setUser($user);
        $commande->setMontantTotal($montantTotal);

        $dm->persist($commande);
        $dm->flush();

        foreach ($lines as $line) {
            $productId = $line['productId'];
            $prix = $line['prixVente'];
            $quantity = $line['quantity'];

            $commandeDetail = new CommandeDetail();
            $commandeDetail->setCommande($commande);
            $commandeDetail->setProductId($productId);
            $commandeDetail->setPrixVente($prix);
            $commandeDetail->setQuantity($quantity);

            $dm->persist($commandeDetail);
            $dm->flush();

        } 

        $errors = $validator->validate($commande);

        if (count($errors) > 0) {
            return $this->json([
                'status' => 'error',
                'errors' => $errors
            ], 403);
        }
        return  $this->json([
            'status' => 'success',
            'commandeDetail' => $commandeDetail,
            'commande' => $commande,
        ], 201);
    }


    /**    
     * @Route("api/commande/detail", name="commande_detail", methods="POST")
     */
    public function detail(DocumentManager $dm): Response {
        $data = $this->data();
        $commandeId = $data['commandeId'];
        $commande = $this->getCommande($commandeId, $dm);

      
        return $this->json([
            'status' => 'success',
            'commande' => $commande['information'],
            'detail' => $commande['detail'],
            "data" => $data
        ]);
    }

    private function getCommande($commandeId, $dm) {
        $commande = $dm->getRepository(Commande::class)->find($commandeId);

        $commandeDetail = $dm->createQueryBuilder(CommandeDetail::class)
            ->select(
                'quantity',
                'productId',
                'prixVente'
            )
            ->field('commande.id')->equals($commandeId)
            ->sort('quantity', 'asc')
            ->getQuery()
            ->execute();

        foreach ($commandeDetail as $key => $detail) {
            $product = $dm->getRepository(Product::class)->find($detail->getProductId());
            $detail->setProduct($product);
        }

        $commande = $this->serialize(
            $commande,
            ['user', 'commande']
        );

        return  [
            'information' => $commande,
            'detail' => $commandeDetail
        ];
    }
    /**
     * @Route("/api/commande/delete", methods="POST")
     */
    public function delete(DocumentManager $dm): Response 
    {
        $commandes = $dm->createQueryBuilder(Commande::class)
                ->findAndUpdate()
                ->returnNew()
                ->field('status')->equals('ACTIVE')

                ->field('status')->set('INACTIVE')
                ->getQuery()
                ->execute();

        return $this->json([
            'status' => 'success',
            'client' => $commandes
        ], 200);
    }
}
