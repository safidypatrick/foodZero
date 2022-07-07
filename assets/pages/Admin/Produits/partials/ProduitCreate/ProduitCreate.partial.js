import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { handleError, showError } from '@/utils';
import { useMutation } from '@/context/hazumi/hooks';
import { CurrencyInput,Currency } from '@/components/UI';
import Swal from 'sweetalert2';

const ProduitCreate = ({ onSuccess }) => {
    const { register, handleSubmit,  getValues,setError,watch, control, reset, formState: { errors }} = useForm();
    const [saveProduct, {fusion}] = useMutation('product/create');

    watch('prixVente');
    watch('prixAchat');

    const onSubmit = (data) => {
        console.log(data)
        saveProduct(data).then(response => {
            if (response.status === 201) {
                reset();
                if (typeof onSuccess === 'function') onSuccess();
                Swal.fire({
                    icon: 'success',
                    text:'le produit a été créé avec suucès'
                });
            }
        }).catch(error => {
            handleError(error.response, setError);
            Swal.fire({
                icon: 'error',
                text:'Desole essayer a nouveau'
            });
        })
    }

    const valueVente = getValues("prixVente");
  
    return (
        <div className="mb-2 p-8 py-4">
            <h1 className="text-xl font-bold" style={{color:'#3730A3'}}>Création d'un nouveau produit</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2 mb-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Marque
                    </label>
                    <input
                        className={`appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    /> 
                </div>

                <div className="mb-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Désignation
                    </label>
                    <input
                        className={`appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                        type="text"
                        placeholder="designation"
                        {...register("designation", { required: true })}
                    /> 
                </div>

                <div className="mb-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Prix de vente
                    </label>
                    <div>
                        <Controller
                            name="prixVente"
                            isClearable
                            rules={{ required: true }}
                            control={control}
                            render={({ field }) => (
                                 <CurrencyInput
                                    {...field}
                                    // onChange={(e)=>ValidateVente(e.target.value)}
                                    className={`appearance-none block bg-white text-gray-700 ${errors && errors.content ? 'border border-red-500 focus:border-red-600' : 'border border-gray-200 focus:border-gray-500'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100`}
                                    placeholder={`Prix de Vente`}/>
                            )}/>
                    </div>
                    { errors.prixVente && <p className="text-red-500">{ showError(errors, 'prixVente')  }</p> }
                </div>

                <button
                    {...fusion()}
                    type="submit"
                    className="mt-2 px-4 py-2 mr-2 rounded text-white hover:bg-green-600" style={{backgroundColor:'#6366F1'}}>
                    + Créer le produit
                    {/* { challengeId ? `Update challenge` : `Create challenge` } */}
                </button>
            </form>
        </div>
    )
}

export default ProduitCreate
