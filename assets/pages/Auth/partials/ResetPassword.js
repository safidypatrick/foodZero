import React from 'react';
import { useQuery } from '@/context/hazumi/hooks';
import UpdatePassword from './UpdatePasswordForm';
import { NavLink } from 'react-router-dom';

const ResetPassword = ({ match, history }) => {
    const token = match.params?.token;

    const { data, loading } = useQuery('token/verification', {
        variables: {
            token
        }
    })

    if (loading) 
        return (
            <>
                <p className="flex justify-center font-bold mt-6">
                    Chargement...
                </p>
            </>
        );

    //date d'expiration
    const dateExpiration = new Date(data?.userReset?.dateExpiration).toLocaleString("en-US", {timeZone: "Indian/Antananarivo"});
    const accessToken = data?.userReset?.accessToken;

    //date du système
    const date = new Date().toLocaleString("en-US", {timeZone: "Indian/Antananarivo"});
    
    return (
        <div className="flex justify-center min-h-screen bg-gray-100 antialiased">  
            {token === accessToken && dateExpiration >= date ? 
                <UpdatePassword token={token} history={history} /> 
                : 
                <>
                    { dateExpiration < date && 
                        <div className="flex flex-col items-center h-full w-full m-auto">
                            <p className="font-semibold">Le lien de réinitialisation de mot de passe est expiré. Veuillez renvoyer votre email pour réinitialiser votre mot de passe.</p> 
                            <NavLink to="/forgot_password" 
                                className="bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                                    Renvoyer l'e-mail
                            </NavLink>
                        </div>
                    }

                    { token !== accessToken &&
                        <div className="w-full h-full flex flex-col items-center m-auto">
                            <h1 className="text-5xl font-semibold text-blue-600">Page not found</h1>
                            <h2 className="text-5xl font-bold text-red-600">404</h2>
                        </div> 
                    }
                </>
            }
        </div>
    )
}

export default ResetPassword
