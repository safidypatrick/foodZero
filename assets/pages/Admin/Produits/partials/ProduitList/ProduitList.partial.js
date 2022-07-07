import React from 'react';
import { useQuery } from '@/context/hazumi/hooks'
import { NavLink } from 'react-router-dom';
import ProduitCreate from '@/pages/Admin/Produits/partials/ProduitCreate/ProduitCreate.partial';
import { Loading, Currency, Modal, DataTable, Block, BlockTitle, SweetAlert } from '@/components/UI';
import { FaEye , FaTimes } from 'react-icons/fa';
import { useMutation } from '@/context/hazumi/hooks/useMutation';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

const ProductList = ({ defaultBoutique }) => {
    const [filters, setFilters] = React.useState(null);
    const [modal, toggleModal] = React.useState(false);

    const { data, loading, refetch } = useQuery('product/list', {
        variables: {
            filters
        }
    });

    React.useEffect(() => {
      if (defaultBoutique) refetch();
    
      return () => {}
    }, [defaultBoutique])
    
    const [deleteProduct] = useMutation('product/delete');
    if (loading) return <Loading text={`Chargement liste des produits`}/>;
    const products = data?.products ?? null
    const page = data?.page ?? {};
    console.log(products)

    const removeProduct = (product) => {
        SweetAlert.fire({
            icon: 'question',
            title: <p>Suppression d'un produit</p>,
            text: `Voulez-vous vraiment supprimer le produit ${product.name} ?`,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            showCancelButton: true,
            // showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct({
                    productId: product.id
                }).then(() => refetch())
                Swal.fire({
                    icon: 'success',
                    text:`produit ${product.marque} est supprimé avec succès`
                });
            }
        })
    }

    const columns = [{
        name: 'name',
        label: 'Name'
    }, {
        name: 'designation',
        label: 'Désignation'
    }, {
        name: 'prixVente',
        label: 'Prix ',
        component: ({ prixVente }) => <div><Currency value={prixVente} /></div>
    }, {
        name: 'action',
        label: 'Action',
        component: (product) => {
            return (
                <div className="flex items-center">
                    <NavLink to={`/product/${product.id}`}>
                    <button 
                        className="mx-1 px-2 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                        title="Consulter vos produit"
                    >
                    <FaEye /> 
                    </button>
                    </NavLink>
                    <button
                        onClick={() =>  removeProduct(product)}
                        className="mx-1 px-2 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                        title="Supprimer vos prouit"
                    >
                    <FaTimes /> 
                    </button>
                </div>
            )
        }
    }]


    return (
        <Block>
            <BlockTitle
                title={"list des produits"}
                description={"liste de nos produits dans cette section"}/>
            <Modal
                show={modal}
                toggleModal={toggleModal}>
                <ProduitCreate onSuccess={() => {
                    refetch();
                    toggleModal(false);
                }}/>
            </Modal>
            
            <div>
                <button
                    onClick={() => toggleModal(true)}
                    className="mb-2 px-4 py-2 mr-2 rounded text-white hover:bg-green-600" style={{backgroundColor:'#6366F1'}}>
                    + Nouveau produit
                </button>

                <DataTable
                    columns={columns}
                    rows={products}
                    page={page}
                    onFilter={(filters) => setFilters(filters)}
                    />
            </div>
        </Block>
    )
}

const mapStateToProps = (state) => {
    const { defaultBoutique } = state.AuthReducer?.user;

    return {
        defaultBoutique
    }
}

export default connect(mapStateToProps)(ProductList);
