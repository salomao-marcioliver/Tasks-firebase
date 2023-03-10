import { useState } from 'react';
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault();

    if (email !== '' & password !== '') {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', { replace: true })
        })
        .catch((error) => {
          if(error.code === 'auth/weak-password'){
            toast.error('A senha deve ter pelo menos 6 caracteres')
          }else if(error.code === 'auth/invalid-email'){
            toast.error('Poxa, o email inserido é inválido ):')
          }else if(error.code === 'auth/email-already-in-use'){
            toast.error('O email inserido já está em uso')
          }
        })
    } else {
      toast.warning("Preencha todos os campos!")
    }
  }

  return (
    <div className='home-container'>
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta!</span>

      <form className='form' onSubmit={handleRegister}>
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

        <button type='submit'>Cadastrar</button>
      </form>

      <Link className='button-link' to="/">
        Já possui uma conta ? Faça o login!
      </Link>

    </div>
  )
}

export default Register;