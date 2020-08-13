import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';

import api from '../../services/api'


import './products.css'

function Products() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const [selectedItem, setSelectedItem] = useState([])

  const [products, setProducts] = useState([])

  const [token, setToken] = useState('')

  const [alert, setAlert] = useState("");


useEffect( ()=> {
    async function getAuth(){
      const storagedToken = await JSON.parse(localStorage.getItem("SANCES_TOKEN"))
      setToken(storagedToken)
      
    }
    getAuth()
}, [])
useEffect( () => {
  async function loadProducts(){
    const Bearer = 'Bearer '.concat(token)
    const {data} = await api.get('products', {headers : { Authorization : Bearer}})
    setProducts(data)
  }
  loadProducts()
}, [token])


  async function handleNewProduct(e){
    e.preventDefault();

    if ( name !== "" && stock !== '' && price !== ""){
      const res = await api.post('/products', {name, price, stock, token})
      if (res){
        setAlert("Cadastrado com Sucesso")
        console.log(res)
      }
    }
    else{
      setAlert("Preencha todos os campos")
    }
  }

  function handleSelectItem({id}) {
    if (selectedItem.includes(id)){
        const filteredItems = selectedItem.filter( item => item !== id) ;
        setSelectedItem(filteredItems)
    }else{
      setSelectedItem([...selectedItem, id])
    }
  }

  async function handleNewOrder(){
    if (selectedItem.length > 0){
      let status = "processing"
      await api.post('/orders', {status, token}).then( ({data}) => {
       const {id} = data
        selectedItem.forEach( async (item) => {
          console.log({id, item})
          await api.post('/items-order', {order_id : id, product_id: item, token}).then( data => {
            if(data){
              setSelectedItem('')
            }
          })
        })
      })
    }
  }
  return (
    <div id="products-page">
        <Menu/>
        <div className="content">
            <h1>Produtos</h1>
            <h3>Cadastre um novo produto</h3>
            <form onSubmit={handleNewProduct}>
                <input type="text" placeholder="Nome do produto" className="input-large" value={name} onChange={ e => setName(e.target.value)}  />
                <input type="text" placeholder="Valor Unitário" className="input" value={price} onChange={ e => setPrice(e.target.value)}/>
                <input type="number" placeholder="Quantidade" className="input" value={stock} onChange={ e => setStock(e.target.value)}/>
                <button type='submit'>Cadastrar</button>
            </form>
            {
              alert && (
                <p id="alert">{alert}</p>
              )
            }
            <div id="products-list">
              <ul>
                <li className="product-item strong">
                  <p>Código</p>
                  <p>Nome</p>
                  <p>Valor</p>
                  <p>Estoque</p>
                </li>
                {products.map( item => 
                    <li key={item.id} onClick={() => handleSelectItem(item)} className={ selectedItem.includes(item.id) ? "product-item selected" : "product-item"} >
                      <p>{item.id}</p>
                      <p>{item.name}</p>
                      <p>R$ {item.price}</p>
                      <p>{item.stock}</p>
                    </li>
                )}  
              </ul>
            </div>
            <div id="new-order">
              <button className="large" onClick={handleNewOrder}>Novo Pedido</button>
              <p>*Clique nos produtos que você deseja inserir no pedido</p>
            </div>
        </div>
    </div>
  )
}

export default Products;