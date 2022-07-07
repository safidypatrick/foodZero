
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Loading, Currency, Block, BlockTitle } from '@/components/UI';
import { BiArrowBack } from "react-icons/bi";
import { useQuery } from '@/context/hazumi/hooks';
import Moment from 'react-moment';
import {useParams } from 'react-router-dom';
import 'moment-timezone';



const CommandeDetail = () => {
    let params = useParams();
    const commandeId = params?.commandeId;
    const { data, loading } = useQuery('commande/detail', {
        variables: {
            commandeId
        }
    });

    if (loading) return <Loading text={`Chargement detail commande`} />;

    const commande = data?.commande ?? {};
    const details = data?.detail ?? [];

    return (
        <div>
            <div className="pt-2 hover:text-blue:300">
                <NavLink to="/commandes" className="text-lg text-blue-800 flex items-center"><BiArrowBack />Retour</NavLink>
            </div>
            <div className="flex">
                <Block className="w-full">
                    <div className=" w-full m-2 p-1 ">
                        <BlockTitle title={'Infomation du client'} />
                        <div className="flex w-full">
                            <div className="mb-2 w-full mr=1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Nom :
                                </label>
                                <span
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 "
                                >
                                    {commande.user.name}
                                </span>
                            </div>
                            <div className="mb-2 w-full ml-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Prénom :
                                </label>
                                <span
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4"
                                >
                                    {commande.user.username}
                                </span>
                            </div>
                        </div>
                        <div className="w-full mb-6 md:mb-0">
                         
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                email :
                            </label>
                            <span
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3"
                            >
                                {commande.user.email}
                            </span>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Contact :
                            </label>
                            <span
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3"
                            >
                                {commande.user.contact}
                            </span>
                        </div>
                    </div>
                </Block>
                <Block className="w-full">
                    <div className=" w-full m-2 p-1 ">
                        <BlockTitle title={'Date de reservation'} />
                        <div className="flex w-full">
                            <div className="mb-2 w-full mr=1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Date de reservation :
                                </label>
                                <span
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 "
                                >
                                    <Moment format="DD/MM/YYYY">
                                        {commande.dateCreation}
                                    </Moment>
                                    
                                </span>
                            </div>
                        </div>

                    </div>
                  
                </Block>
            </div>
                <Block className="w-full ">
                    <div className=" w-full my-4 p-4">
                        <BlockTitle title={"Détails du reservation"} />
                        <table className=" w-full custom-table-01 mb-4">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th>Marque</th>
                                    <th>Quantité</th>
                                    <th>Prix Unitaire</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>

                                {details.map((detail, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="font-bold text-lg" align="left">{detail.product.name}</td>
                                            <td className="font-bold text-lg" align="right">{detail.quantity}</td>
                                            <td className="font-bold text-lg" align="right"><Currency value={detail.prixVente} /></td>
                                            <td className="font-bold text-lg" align="right"><Currency value={detail.prixVente * detail.quantity} /></td>
                                        </tr>)
                                })}

                                {/* Affichage net à payer */}
                                <tr>
                                    <td colSpan="2"></td>
                                    <td className="font-bold text-lg" align="left">NET A PAYER</td>
                                    <td className="font-bold text-lg" align="right"><Currency value={commande.montantTotal} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Block>
        </div>
    )
}
export default CommandeDetail;