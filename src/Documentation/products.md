
# create product:
  # link :   
    http://localhost:8000/api/product/create, methode: POST
  
   # variable :
             {
                "name": "steack",
                "designation": "steack frais",
                "prixVente": 10000
            }

# list des produits 
    # link: 
        http://localhost:8000/api/product/list , methode: POST 

    # variable:
             {
                "filters": ""
              }

# detail d'un produit 
    link: http://localhost:8000/api/product/detail, methode: POST

    variable:{
                "productId": "62c6fc62662b000071001247"
             }

# supprimer un produit
    link: http://localhost:8000/api/product/delete, methode: POST

    variable: {
                "productId": "62c6fc62662b000071001247"
            }
           
