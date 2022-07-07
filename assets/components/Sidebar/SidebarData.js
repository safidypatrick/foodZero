import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
 
  {
    title: 'Reserver',
    path: '/commandes',
    icon: <FaIcons.FaCubes />,
    className: 'nav-text',
    roles: ['ROLE_GERANT']
  },
  {
    title: 'listes des produits',
    path: '/produits',
    icon: <FaIcons.FaRegAddressBook />,
    className: 'nav-text',
    roles: ['ROLE_GERANT']
  },
];