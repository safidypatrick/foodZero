import React from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@/context/hazumi/hooks';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [resetPassword, {fusion}] = useMutation('/auth/reset');

    const onSubmit = (data) => {
        resetPassword(data).then(response => {
            if (response.status === 200) {
                if (typeof onSuccess === 'function') onSuccess();
                Swal.fire({
                    icon: 'success',
                    title: 'Email envoyé avec succès',
                    text: 'Veuillez consulter votre adresse e-mail.'
                });
                reset();
            }
        }).catch(error => (
            Swal.fire({
                icon: 'error',
                title: 'Email invalide',
                text: 'Veuillez saisir votre adresse e-mail associé à votre compte.'
            })
        ))
    }
    return (
        <div className="flex justify-center min-h-screen bg-gray-100 antialiased">  
            <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white"> 
                <div className="text-center m-6">
                <h1 className="text-3xl font-semibold text-gray-700">Mot de passe oublié?</h1>
                <p className="text-gray-500">Entrez simplement votre adresse e-mail ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe !</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="m-6">
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Adresse email</label>
                        <input 
                            type="email"
                            placeholder="Votre adresse email" 
                            className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" 
                            {...register('email', { required: true })}
                        />
                    </div>
                    <div className="mb-6">
                        <button 
                            {...fusion()}
                            type="submit" 
                            className="w-full px-3 py-4 text-white bg-indigo-500 rounded-full hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out">
                            Envoyer le lien de réinitialisation
                        </button>
                    </div>
                    <p className="text-sm text-center text-gray-400">
                        Vous n'avez pas encore de compte? &nbsp;
                        <NavLink to="/signup" className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline">Créer un compte</NavLink>.
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
