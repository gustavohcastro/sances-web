import React from 'react';
import Menu from '../../components/Menu';

import './products.css'

function Products() {
  return (
    <div id="products-page">
        <Menu/>
        <div className="content">
            <h1>Produtos</h1>
            <h3>Cadastre um novo produto</h3>
            <form>
                <input type="text" placeholder="Nome do produto" className="input-large"/>
                <input type="text" placeholder="Valor Unitário" className="input"/>
                <input type="text" placeholder="Quantidade" className="input"/>
                <button>Cadastrar</button>
            </form>
        </div>
    </div>
  )
}

export default Products;