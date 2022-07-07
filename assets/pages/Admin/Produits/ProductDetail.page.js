import React from 'react';
import { useQuery } from '@/context/hazumi/hooks';
import { NavLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Loading, Currency } from '@/components/UI';
import { useMutation } from '@/context/hazumi/hooks/useMutation';
import { InlineEdit, Block, BlockTitle } from '@/components/UI';


const ProductDetail = () => {
    let params = useParams();
    const productId = params.productId;
    const [deleteProduct] = useMutation('product/update')

    const { data, loading, refetch } = useQuery('product/detail', {
        variables: {
            productId
        }
    });

    if (loading) return <Loading text={`Chargement detail du produit`} />;

    const product = data?.product ?? {};
    
    return (
        <>
            <div className="pt-2 hover:text-blue:300">
                <NavLink to="/produits" className="text-lg text-blue-800 flex items-center"><BiArrowBack/>Retour</NavLink>
            </div>
            <div className="flex">
                <Block className="w-5/6 mr-2">
                    <BlockTitle title={"Détails du produit"} 
                                description="Information a propos du produit"
                    />
                    <section className=" py-4 bg-blueGray-50">
                        <div>
                            <div>
                                <div className="flex-auto px-2">
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-6/12 px-2">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                    Nom du produit
                                                </label>
                                                <div className="text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                    <InlineEdit
                                                        onSave={(value) => deleteProduct({
                                                            name: value,
                                                            productId
                                                        }).then(response => refetch())}
                                                        value={ product.name }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-2">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                    Prix de vente
                                                </label>
                                                <div className="text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                    <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                        <Currency value={ product?.prixVente } />   
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                    Désignation
                                                </label>
                                                <div className="text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                                    <InlineEdit
                                                        onSave={(value) => deleteProduct({
                                                            designation: value,
                                                            productId
                                                        }).then(response => refetch())}
                                                        value={ product.designation }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-6/12 px-2">
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>    
                </Block>
            </div>
        </>
    )
}

export default ProductDetail
