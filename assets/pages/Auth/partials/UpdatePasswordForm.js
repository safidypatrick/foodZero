import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useMutation } from '@/context/hazumi/hooks';
import Swal from 'sweetalert2';

const UpdatePassword = ({ token, history }) => {
    //validation
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Mot de passe obligatoire')
            .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
        confirmPassword: Yup.string()
            .required('Confirmation du mot de passe obligatoire')
            .oneOf([Yup.ref('password')], 'Les mots de passe doivent être identiques.')
            
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    //fonction pour créer un formulaire avec useForm()
    const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);


    //affichage ou masque du mot de passe
    const [passwordShown, setPasswordShown] = React.useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const [updatePassword, {fusion}] = useMutation('user/update/password');

    //Validation du formulaire
    const onSubmit = data => {
        updatePassword({
            ...data,
            token
        }).then(response => {
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Mot de passe à jour',
                    text: 'Mot de passe modifié avec succès.'
                });
                reset();
                history.push('/');
            }
        }).catch( error => (
            Swal.fire({
                icon: 'error',
                title: 'Oups!',
                text: 'Lien de réinitialisation du mot de passe expiré.'
            })
        ))
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 antialiased">
            <div className="container my-auto max-w-md border-2 border-gray-200 p-3 bg-white"> 
                <div className="text-center m-6">
                <h1 className="text-3xl font-semibold text-gray-700">Réinitialisation du mot de passe</h1>
                <p className="text-gray-500">Veuillez saisir votre nouveau mot de passe!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="m-6">
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Nouveau mot de passe</label>
                        <div className="flex items-center w-full">
                            <input
                                type= { passwordShown ? "text" : "password" }
                                placeholder="Entrer votre nouveau mot de passe"
                                {...register("password")}
                                className={`form-control ${errors.password ? 'is-invalid' : ''} w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500`}
                                
                            />
                            <span
                                className="text-indigo-500 cursor-pointer"
                                onClick={togglePassword}>
                                {passwordShown ? <FaRegEyeSlash />: <FaRegEye />}
                            </span>
                        </div>
                        <div className="text-sm text-red-600">{errors.password?.message}</div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirmation du mot de passe</label>
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Confirmation du mot de passe"
                            {...register("confirmPassword")}
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''} w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500`} 
                        />
                        <div className="text-sm text-red-600">{errors.confirmPassword?.message}</div>
                    </div>

                    <div className="mb-6">
                        <button 
                            {...fusion()}
                            type="submit" 
                            className="w-full px-3 py-4 text-white bg-indigo-500 rounded-full hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out">
                            Valider
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword
