import React, {useState, useEffect} from 'react';
import Menu from '../../components/Menu';

import {FiCheck, FiXCircle} from 'react-icons/fi'

import './orders.css'

import api from '../../services/api'
import { Link } from 'react-router-dom';
function Orders() {
  
  const [token, setToken] = useState('')


  const [itemsOrder, setItemsOrder] = useState([])
  const [orders, setOrders] = useState([])
  const [selectedItem, setSelectedItem] = useState('')

  const [loading, setLoading] = useState(true);

  useEffect( ()=> {
    async function getAuth(){
      const storagedToken = await JSON.parse(localStorage.getItem("SANCES_TOKEN"))
      setToken(storagedToken)
    }
    getAuth()
  }, [])
  useEffect( () => {
    async function loadOrders(){
      const Bearer = 'Bearer '.concat(token)
      await api.get('items-order' , {headers : { Authorization : Bearer}}).then( ({data}) => {
        setItemsOrder(data)
      })
      await api.get('orders' , {headers : { Authorization : Bearer}}).then( ({data}) => {
        setOrders(data)
      })
      setLoading(false)
    }
    loadOrders()
  }, [token])


  function handleEditItem({id}){
    setSelectedItem(id)
  }
  async function handleStatus(status){
      await api.put(`/orders/${selectedItem}`, {status, token}).then( data => {
        if(data){
          setToken(token)
        };
      })
  }

  return(
    <div id="products-page">
      <Menu/>
      <div className="content">
            <h1>Pedidos</h1>
            <h3>Para detalhes clique sobre os pedidos</h3>
            <div className="options-row">
              <div>
                <button onClick={() => handleStatus("aproved")}>Aprovar</button>
                <button onClick={() => handleStatus("canceled")}>Cancelar</button>
              </div>
            </div>
            <div id="products-list">
                <ul>
                  <li className="product-item strong">
                    <p>Código</p>
                    <p>Status</p>
                    <p>Items</p>
                  </li>
                  { orders.map( item => { 
                    let translateStatus;
                    if(item.status === "processing"){
                      translateStatus = "Em Analise"
                    }
                    if(item.status === "aproved"){
                      translateStatus = "Aprovado"
                    }
                    if(item.status === "canceled"){
                      translateStatus = "Cancelado"
                    }
                    return (
                    <li onClick={() => handleEditItem(item)} key={item.id} className={ selectedItem === item.id ? "product-item selected" : "product-item"}>
                      <p>{item.id}</p>
                      <p>{translateStatus}</p>
                      <p>{
                        itemsOrder.map( itemOrder => (
                          itemOrder.order_id === item.id && `${itemOrder.name} `
                        ))
                        }</p>
                    </li>
                    )
                    })}
               </ul>
            </div>
        </div>
    </div>  
  );
}

export default Orders;