import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineMenu } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.scss';
import { checkRole } from '@/store';

function Sidebar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar=()=>{
        setSidebar(!sidebar)
    }
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div>
                    <span className={sidebar ? 'hamburger active' : 'hamburger'} onClick={showSidebar}>{sidebar ? "X" : <AiOutlineMenu/>}</span>
                </div>
                <span className={sidebar ? 'background':''} onClick={showSidebar}></span>
                <nav className={sidebar ? 'sidebar active' : 'sidebar'} onClick={showSidebar}>
                    <div className='nav-menu'>
                        <div className="flex items-center justify-center mb-2 text-white text-xl text-center">
                            <div>
                                <svg className="w-10 text-white font-bold" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225">
                                    <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                        <g>
                                            <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="font-bold">FoodZero</div>
                        </div>

                        {SidebarData.map((item, index) => {

                            if (!checkRole(item.roles))
                                return (<div key={index}></div>);

                            return (
                                <NavLink key={index} to={item.path} className="nav-link">
                                    <div className={`nav-item`}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;