<?php

namespace App\Controller\Product;

use App\Component\Product\ProductComponent;
use App\Document\Product;

use App\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Doctrine\ODM\MongoDB\DocumentManager;
use App\Component\Common\UpdateHandler;

use App\Component\Common\FilterHandler;


class ProductController extends BaseController
{
    /**
     * @Route("/api/product/list", methods={"POST"})
     */
    public function list(FilterHandler $filter, DocumentManager $dm): Response {
        $data = $this->data();

        $filters = $data['filters'];
        $user = $this->getUser();
        $appends = [
            [
                'field' => 'status',
                'operator' => 'equals',
                'value' => 'ACTIVE'
            ]
        ];

        $filtered = $filter->handle(Product::class, $filters, $appends);
        $products = $filtered['rows'];
            

        return $this->json([
            'status' => 'success',
            'products' => $products,
            'filtre' =>$filters,
            'page' => $filtered['page']
        ], 200);
    }

    /**
     * @Route("/api/product/archive", methods={"POST"})
     */
    public function archive(DocumentManager $dm): Response {
        $archive = $dm->createQueryBuilder(Product::class)
                ->field('status')->equals('INACTIVE')
                ->getQuery()
                ->execute();

        return $this->json([
            'status' => 'success',
            'archive' => $archive
        ], 200);
    }

    /**
     * @Route("/api/product/create", methods={"POST"})
     */
    public function create(ProductComponent $productComponent): Response {
        $data = $this->data();
        $user = $this->getUser();

        $name = $data['name'];
        $designation = $data['designation'];
        $prixVente = $data['prixVente'];


        $product = $productComponent->create($name, $designation,  $prixVente);

        if (!$product instanceof Product) {
            return $this->json([
                'status' => 'error',
                'errors' => $product
            ], 403);
        }

        return $this->json([
            'status' => 'success',
            'product' => $product,
        ], 201);
    }

    /**    
     * @Route("api/product/detail", name="product_detail", methods="POST")
     */
    public function detail(DocumentManager $dm): Response
    {
        $productId = $this->data('productId');
        $product = $dm->getRepository(Product::class)->find($productId);

    
        return $this->json([
            'status' => 'success',
            'product' => $product
        ]);
    }

    /**
     * @Route("api/product/delete", methods="POST")
     */
    public function delete(DocumentManager $dm): Response 
    {
        $productId = $this->data('productId');
        $product = $dm->createQueryBuilder(Product::class)
                ->findAndUpdate()
                ->returnNew()
                ->field('id')->equals($productId)
                ->field('status')->equals('ACTIVE')
                ->limit(1)

                ->field('status')->set('INACTIVE')
                ->getQuery()
                ->execute();

        return $this->json([
            'status' => 'success',
            'products' => $product
        ], 200);
    }

}
