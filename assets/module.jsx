import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';

import Sidebar from './components/Sidebar/Sidebar.component';
import Navbar from './components/Navbar/Navbar';
import { useQuery } from '@/context/hazumi/hooks/useQuery';

import Auth from './pages/Auth/Auth.page';
import SignUp from './pages/Auth/SignUp.page';
import ForgotPassword from './pages/Auth/partials/ForgotPassword';
import ResetPassword from './pages/Auth/partials/ResetPassword';

import Home from './pages/Home/Home.page';


import ProductDetail from './pages/Admin/Produits/ProductDetail.page';

import Commande from './pages/Admin/Commande/Commande.page';
import Produits from './pages/Admin/Produits/Produits.page';
import CommandeCreate from './pages/Admin/Commande/Partials/CommandeCreate/CommandeCreate';


import CommandeDetail from './pages/Admin/Commande/CommandeDetail.page';


const Module = ({ isAuthenticated, user }) => {
    const setup = user?.setup
    const isAdmin = (user) => user?.roles.includes('ROLE_GERANT');

    return (
        <BrowserRouter >
            {isAuthenticated ?  (
                <>
                            
                        <div className="main-container">
                            <Navbar />
                            <Sidebar />
                            {isAdmin(user)  ? (
                                <Routes>
                                    <Route exact path="/" element={<Home/>} />
                                    <Route exact path="/produits" element={<Produits/>} />
                                    <Route exact path="/commandes" element={<Commande/>} />
                                    <Route exact path="/commande/:commandeId" element={<CommandeDetail/>} />
                                    <Route exact path="/commandes/create" element={<CommandeCreate/>} />
                                    <Route exact path="/product/:productId" element={<ProductDetail/>} />

                                    <Route path="*" element={<Home/>}/>
                                         
                                </Routes>
                            ) : null}
                        </div>
                    
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Auth />}/>
                    <Route exact path="/signup" element={<SignUp/>}/>
                    <Route exact path="/forgot_password" element={<ForgotPassword/>} />
                    <Route exact path="/reset_password/:token" element={<ResetPassword/>} />
                </Routes>
            )}
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.AuthReducer
    }
}


export default connect(mapStateToProps)(Module);
