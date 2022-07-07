import React from 'react'
import { userLogoutAttempt } from '@/redux/Auth/auth.action';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { FaUser } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import './Navbar.styles.scss';

const Navbar = ({ userLogout, user }) => {
    
    let navigate = useNavigate();

    const handleLogout = () => {
        userLogout().then(() => navigate('/'))
    }
    
    return (
        <>
            <nav className="navbar bg-gray-800 w-full mx-auto">
                <div className="relative flex items-center justify-between">
                    <div className="flex flex-auto text-white ml-24">
                        FoodZero
                    </div>
                    <div className=" text-white mr-8">
                        <NavLink to="/"> Home </NavLink>
                    </div>
                    <div className=" text-white mr-8">
                        <NavLink to="/commandes"> Contact </NavLink>
                    </div>
                    <div className=" text-white mr-8">
                        <NavLink to="/produits"> Products </NavLink>
                    </div>
                    <div className="flex ">
                        
                    </div>
                    <div className="flex items-center">
                        <div className="user-menu ml-3 relative">
                            <div className="user-wrapper">
                                <div className="p-2 cursor-pointer text-white user-icon mr-1"><FaUser /></div> 
                                { user.username }    
                            </div>

                            <div className="profil-menu" tabIndex="-1">
                                <div className="profil-info">
                                    <div className="flex items-center profil-username"><FaUser className="profil-icon mr-1"/> { user.username }</div>
                                    <div className="profil-name">{ user.name }</div>
                                </div>
                                
                                <div className="profil-action">
                                    <div onClick={() => handleLogout()} className="menu-action">Se déconnecter</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.AuthReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch(userLogoutAttempt())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
