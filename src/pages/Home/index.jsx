import { useState } from 'react';
import { Link } from 'react-router-dom'
import './home.css'
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== '' & password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', { replace: true })
        })
        .catch((error) => {
          if(error.code === 'auth/wrong-password'){
            toast.error('Senha Incorreta')
          }else if(error.code === 'auth/user-not-found'){
            toast.error('Usuário não cadastrado')
          }else if(error.code === 'auth/invalid-email'){
            toast.error('O email inserido é inválido')
          }
        })
    } else {
      toast.warning("Preencha todos os campos!")
    }
  }

  return (
    <div className='home-container'>
      <h1>Listas de Tarefas</h1>
      <span>Gerencie sua agenda de forma fácil.</span>

      <form className='form' onSubmit={handleLogin}>
        <input
          type="text"
          placeholder='Digite seu email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Digite sua senha'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type='submit'>Acessar</button>
      </form>

      <Link className='button-link' to="/register">
        Não possui uma conta ? Cadastre-se!
      </Link>

    </div>
  )
}

export default Home;