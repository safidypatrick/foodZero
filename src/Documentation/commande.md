#create reservation :
link : http://localhost:8000/api/commande/create
    {
	"lines":[
			{"productId":"62c5fb7d932d0000f4004b53",
			"prixVente": 1200,
			"quantity": 1}
	]
  }
# liste des reservations
    link : http://localhost:8000/api/commande/list
response:
    {
        {
	"status": "success",
	"commandes": [
		{
			"id": "62c6ba03662b000071001242",
			"dateCreation": "2022-07-07T12:48:35+02:00",
			"montantTotal": 1101,
			"status": "ACTIVE",
			"user": {
				"id": "62c5f9e2932d0000f4004b52",
				"username": "kiady",
				"password": "$2y$13$JHO0zWm1\/ZTTE.tjHcSR5eMJwFXLhrRGtuQd463eBSBfnxIU.01fu",
				"name": "kiady",
				"type": null,
				"setup": "INACHEVER",
				"email": "safidypatrick8@gmail.com",
				"contact": "0349543592",
				"roles": [
					"ROLE_GERANT"
				],
				"salt": null
			}
		}
	],
	"page": {
		"limit": 10,
		"skip": 0,
		"total": 1,
		"number": 1
	}
    }
    }

# commandeDetail ou detail du reservation 

 link : http://localhost:8000/api/commande/detail

 # variable :  
 	data: {commandeId: "62c6ba03662b000071001242"}

 # response: 
  {
	"status": "success",
	"commande": {
		"id": "62c6ba03662b000071001242",
		"dateCreation": "2022-07-07T12:48:35+02:00",
		"user": {
			"id": "62c5f9e2932d0000f4004b52",
			"username": "kiady",
			"password": "$2y$13$JHO0zWm1\/ZTTE.tjHcSR5eMJwFXLhrRGtuQd463eBSBfnxIU.01fu",
			"name": "kiady",
			"email": "safidypatrick8@gmail.com",
			"type": null,
			"setup": "INACHEVER",
			"contact": "0349543592",
			"roles": [
				"ROLE_GERANT"
			]
		},
		"montantTotal": 1101
	},
	"detail": [
		{
			"id": "62c6ba05662b000071001243",
			"dateCreation": null,
			"prixVente": 1100,
			"quantity": 1,
			"productId": "62c681859338000017001b22",
			"product": {
				"id": "62c681859338000017001b22",
				"name": "legume",
				"status": "ACTIVE",
				"designation": "GOUTY",
				"prixVente": 1100
			},
			"commande": null
		},
		{
			"id": "62c6ba06662b000071001244",
			"dateCreation": null,
			"prixVente": 1,
			"quantity": 1,
			"productId": "62c5fb7d932d0000f4004b53",
			"product": {
				"id": "62c5fb7d932d0000f4004b53",
				"name": "steack",
				"status": "INACTIVE",
				"designation": "borco",
				"prixVente": 1
			},
			"commande": null
		}
	],
	"data": {
		"commandeId": "62c6ba03662b000071001242"
	}
}


