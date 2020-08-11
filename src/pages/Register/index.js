import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api'
import '../Home/home.css';

import home from '../../assets/images/home.png'
function Home() {

    const history = useHistory()
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleNewAccount(e){
        e.preventDefault()

        const {data} = await api.post('register', {username, email, password})

        if (data){
            const res = await api.post('authenticate', {email, password})
            const token = await localStorage.setItem('SANCES_TOKEN', JSON.stringify(res.data.token))
            history.push('/orders')
        }
        else{
            console.log(data)
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
                    <h2>Preencha os seguintes dados</h2>
                    <p>Após isso você poderá acessar sempre que quiser.</p>
                    <form onSubmit={handleNewAccount}>
                        <label htmlFor="name">Nome Completo</label>
                        <input type="text" name="name" id="name" value={username} onChange={ e=> setUsername(e.target.value)} />
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" id="email" value={email} onChange={ e=> setEmail(e.target.value)} />
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" value={password} onChange={ e=> setPassword(e.target.value)} />
                        <button type='submit'>Cadastar</button>
                    </form>
              </div>
          </div>
      </div>
  );
}

export default Home;