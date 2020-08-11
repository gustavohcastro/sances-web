import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'

import home from '../../assets/images/home.png'
import './home.css';

function Home() {

    const history = useHistory()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function handleLogin(e){
        e.preventDefault()

        const res = await api.post('authenticate', {email, password})

        if (res.data){
            const token = await localStorage.setItem('SANCES_TOKEN', JSON.stringify(res.data.token))
            history.push('/orders')
        }
        else{
            console.log(res)
        }
        
    }

  return(
      <div className="container">
          <div className="login-form">
              <div className="logo">
                  <h1>Sances Project</h1>
                  <img src={home} alt="Login Reference"/>
              </div>
              <div className="form">
                  <h2>Seja bem vindo a plataforma</h2>
                  <p>Faça o login com seus dados</p>
                  <form onSubmit={handleLogin}>
                      <label htmlFor="email">E-mail</label>
                      <input type="text" name="email" id="email" value={email} onChange={ e=> setEmail(e.target.value)} />
                      <label htmlFor="password">Senha</label>
                      <input type="password" name="password" id="password" value={password} onChange={ e=> setPassword(e.target.value)}/>
                      <button type="submit">Entrar</button>
                  </form>
                  <Link to="/register">Criar nova conta</Link>
              </div>
          </div>
      </div>
  );
}

export default Home;