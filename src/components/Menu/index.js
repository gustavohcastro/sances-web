import React from 'react';
import { Link } from 'react-router-dom';

import {FiDatabase, FiShoppingBag} from 'react-icons/fi'

import dashboard from '../../assets/images/dashboard.png'
import './menu.css'

function Menu() {
  return (
    <div className="menu">
        <img src={dashboard} alt="Dashboard Logo"/>
        <h3>Dashboard</h3>
        <ul>
            <li>
                <Link to="/orders">
                    <FiDatabase size={40} color="#fafafa"/>
                    Pedidos
                </Link>
            </li>
            <li>
                <Link to="/products">
                    <FiShoppingBag size={40} color="#fafafa"/>
                    Produtos
                </Link>
            </li>
        </ul>
        <Link id="logout" to="/">Sair</Link>
    </div>
    );
}

export default Menu;