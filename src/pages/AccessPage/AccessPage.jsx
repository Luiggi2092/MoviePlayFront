import { useState } from 'react'
import './accessPage.css'
import { NavLink } from 'react-router-dom'


const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
const passwordRegex = /^[0-9a-zA-Z]+$/

const AccessPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [formCorrecto, setFormCorrecto] = useState(false)

    const validateEmail = () => {
        if (!emailRegex.test(email)) {
            setEmailError(true)
        
        }else {
            setEmailError(false)
        }
    }

    const validatePassword = () => {
        if (!passwordRegex.test(password)) {
            setPasswordError(true)
        
        }else {
            setPasswordError(false)
        }
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        validateEmail()
	}

    const onChangePassword = (e) => {
        setPassword(e.target.value)
        validatePassword()
    }

    const onSubmitForm = (event) => {
        event.preventDefault();

        if (email === '' || password === '' || passwordError === true || emailError === true) {

            setFormCorrecto(true)
            setTimeout(() => {
                setFormCorrecto(false)
            }, 5000)
        
        } else {
            setEmail('')
            setPassword('')
        }
    } 


    return (
        <section className='containerDivAccessPage'>
            
            <div className='divContainerTodo'>

                <h2 className='h2FormAccessPage'>Inicia sesión</h2> 

                <form onSubmit={onSubmitForm} className='formularioAccessPage'>
                    
                    <label className='labelFormAccessPage'> Email </label>
                    <input 
                        className='inputFormAccessPage' 
                        type="text" 
                        placeholder='Email' 
                        name='email' 
                        value={email} 
                        onChange={onChangeEmail} 
                        style={emailError ? {border: '3px solid red'} : null}
                        />
                    {
                        emailError === true && <p className='pErrorEmailAccessPage'>Email incorrecto. Corrobore que el email tenga @ y .com</p>
                    }

                    <label className='labelFormAccessPage'> Contraseña </label>
                    <input 
                        className='inputFormAccessPage' 
                        type="text" 
                        placeholder='Contraseña' 
                        name='password' 
                        value={password} 
                        onChange={onChangePassword} 
                        style={passwordError ? {border: '3px solid red'} : null}
                        />
                    {
                        passwordError === true && <p className='pErrorEmailAccessPage'>Contraseña incorrecta. Corrobore que la contraseña sea la adecuada</p>
                    }
                    
                    <button className='buttonFormAccessPage'>Acceder</button>
                    
                </form>

                {
                    formCorrecto === true && <p className='mensajeError'>❌ Error: Revise el formulario</p>
                }

                    
                <div className='divpFormAccessPage'>
                    <p className='pFromAccessPage'>¿Aún no tienes cuenta? 
                        <NavLink to='/register'>
                            <span className='spanFormAccessPage'>Registrarse</span>
                        </NavLink>
                    </p>

                    <p className='pFromAccessPage'>¿Olvidaste tu contraseña? 
                        <NavLink to='/'>
                            <span className='spanFormAccessPage'>Click aquí</span>
                        </NavLink>
                    </p>
                </div>

            </div>

        </section>
    )
}

export default AccessPage