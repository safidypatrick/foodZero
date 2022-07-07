import React from 'react'
import { useMutation,useQuery } from '@/context/hazumi/hooks';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { handleError } from '@/utils';
import { useForm, useFieldArray } from 'react-hook-form';
import ProductSelect from '@/components/Product/ProductSelect';
import { Block, BlockTitle, Currency,Modal} from '@/components/UI';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CommandeCreate = () => {
    let navigate = useNavigate();
    const [modal, toggleModal] = React.useState(false);
    const { data } = useQuery('stocks/etat');
    const produits = data?.produits;
    const {
        control,
        setValue,
        getValues,
        watch,
        reset,
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            lines: [{ quantity: 1, name: "", prixVente: 0, max: 1 }]
        }
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "lines", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });
  
    watch('lines');
  

    const handleChange = (product, index) => {
        const {prixVente,id } = product
        // const {  prixVente } = product?.prixVente;

        setValue(`lines[${index}].prixVente`, prixVente);
        setValue(`lines[${index}].productId`,id );
    }
    const lines = getValues().lines;
    console.log(lines)
    const getMax = (index) => {
        return lines[index].max 
    }
    const getMontant = (index) => {
        console.log(index)
        return lines[index].prixVente * lines[index].quantity
    }

    const totalCommande = lines.reduce((accumulator, line) => accumulator + (line.quantity * line.prixVente), 0);

    const [createCommande, { fusion }] = useMutation('commande/create')

    const onSubmit = (data) =>{
        console.log(data)
        createCommande({
            lines: data.lines
        }).then(response => {
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    text:'la reservation a été créé avec suucès'
                });
                navigate(`/commandes`)
            }
        }).catch(error => {
            handleError(error.response, setError);
            Swal.fire({
                icon: 'error',
                title: 'Désolé',
                text:'Essayer à nouveau'
            });
        })
    }
    return (
        <Block>
        <div>
            <label> Commander ici votre plat preferer </label>
        </div>
            <BlockTitle 
                title={"Création d'une nouvelle reservation"}
            />
            
            {/* Formulaire de création de commande */}
                {/* Selection de client pour la commande */}
            <form
                className="mt-4"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete={'off'}>

                {/* Liste des commandes à effectuer */}
                <div>
                    <table className="custom-table-01 mb-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantité</th>
                                <th>Prix Unitaire</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {fields.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td className='w-80'>

                                        {/* Séléction produit */}
                                        <ProductSelect 
                                            onChange={(product) => handleChange(product, index)}/>
                                        
                                    </td>
                                    <td>

                                        {/* Saisie quantité */}
                                        <input 
                                            {...register(`lines.${index}.quantity`,{ required: true })}
                                            className="w-28 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            min="1"
                                            type="number"/>
                                    </td>
                                    <td>

                                        {/* Saisie quantité */}
                                        <input 
                                            className="w-28 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            readOnly= {true}
                                            Value={getMax(index)}
                                            />
                                    </td>

                                    <td>

                                        {/* Affichage prix unitaire */}
                                        <div
                                            
                                            className="appearance-none block w-40 bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            readOnly={true}>
                                            <Currency value={lines[index].prixVente}/>
                                        </div>    
                                    </td>
                                    <td>

                                        {/* Calcul montant total  */}
                                        <div
                                            className="text-right appearance-none block w-40 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        >
                                            <Currency value={ getMontant(index) }/>
                                        </div>
                                    </td>
                                    <td className='flex'>
                                        {/* Création nouvelle ligne */}
                                        { index === (fields.length - 1) ? (
                                            <div
                                                type="button"
                                                className="cursor-pointer my-5 mx-1 px-2 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                                title="Autre produit"
                                                onClick={() => append({
                                                quantity: 1,
                                                prixVente: 0
                                                })}>
                                                <FaShoppingCart/>
                                            </div>
                                        ) : null }
                                        {/* Suppression ligne */}
                                        <button
                                            className="my-5 mx-1 px-2 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                                            title="Supprimer produit"
                                            onClick={() => remove(index)}>
                                            <FaTimes className="mr-1"/>  
                                        </button>
                                    </td>
                                </tr>)
                            })}

                            {/* Affichage net à payer */}
                            <tr>
                                <td colSpan="2"></td>
                                <td className="font-bold text-lg text-blue-500" align="center">NET A PAYER</td>
                                <td className="font-bold text-lg" align="right">
                                    <Currency value={ totalCommande }/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                    </div>  
                    <div className="w-full flex justify-end">
                        {/* Bouton validation commande */}
                        <button
                            {...fusion()}
                            type="submit" 
                            className="px-4 py-2 rounded text-white hover:bg-green-600"
                            style={{ backgroundColor: 'green' }}>
                            Sauvegarder la commande
                        </button>
                    </div>
                </div>
            </form>
        </Block>
    )
}

export default CommandeCreate;
