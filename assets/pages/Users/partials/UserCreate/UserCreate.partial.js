import React from 'react'
import { useForm } from 'react-hook-form'
import { handleError, showError } from '@/utils';
import { useMutation } from '@/context/hazumi/hooks';

const UserCreate = ({ onSuccess }) => {
    const { register, handleSubmit, setError, reset, formState: { errors }} = useForm();
    const [saveUser, { fusion }] = useMutation('user/create'); 

    const onSubmit = (data) => {
        saveUser(data).then(response => {
            if (response.status === 201) {
                reset();
                if (typeof onSuccess === 'function') onSuccess();
            }
        }).catch(error => {
            handleError(error.response, setError);
        })
    }

    return (
        <div className="mb-2 bg-blue-100 p-8 py-4">
            <h1 className="text-xl font-bold" style={{color:'#3730A3'}}>Création d'un nouvel utilisateur</h1>   
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inline-flex mr-2">
                    <div className="mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            Nom
                        </label>
                        <input
                            className={`appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            type="text"
                            placeholder="Nom"
                            {...register("nom", { required: true })}
                        />
                        { errors.nom && <p className="text-red-500">{ showError(errors, 'nom')  }</p> }
                    </div>
                </div>

                <div className="inline-flex">
                    <div className="mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Prénom
                        </label>
                        <input
                            className={`appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            type="text"
                            placeholder="Prénom"
                            {...register("prenom", { required: true })}
                        />
                        { errors.prenom && <p className="text-red-500">{ showError(errors, 'prenom')  }</p> }
                    </div>
                </div>

                <div className="mb-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Nom d'utilisateur
                    </label>
                        <input
                            className={`appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            type="text"
                            placeholder="username"
                            {...register("username", { required: true })}
                    />
                    { errors.username && <p className="text-red-500">{ showError(errors, 'username')  }</p> }
                </div>

                <div className="mb-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Email
                    </label>
                        <div className="flex">
                            <input
                                className={`appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                type="text"
                                placeholder="Email"
                                {...register("email", { required: true })}
                            /> 
                        </div>
                    { errors.email && <p className="text-red-500">{ showError(errors, 'email')  }</p> }
                </div>

                <div className="mb-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Mot de passe
                    </label>
                        <div className="flex">
                            <input
                                className={`appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                type="password"
                                placeholder="Mot de passe"
                                {...register("password", { required: true })}
                            /> 
                        </div>
                    { errors.password && <p className="text-red-500">{ showError(errors, 'password')  }</p> }
                </div>

                <div className="mb-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Rôle</label>
                    <div className="relative inline-block w-1/4 text-gray-700">
                        <select
                            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                            {...register("role", { required: true })}>
                            <option value="">---Select Role---</option>
                            <option value="ROLE_GERANT">Gérant</option>
                            <option value="ROLE_TITULAIRE">Titulaire</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                        { errors.role && <p className="text-red-500">This field is required</p> }
                    </div>
                </div>

                <button
                    {...fusion()}
                    type="submit"
                    className="mt-2 px-4 py-2 mr-2 rounded text-white hover:bg-green-600" style={{backgroundColor:'#6366F1'}}>
                    + Créer l'utilisateur
                </button>
            </form>
        </div>
    )
}

export default UserCreate;
