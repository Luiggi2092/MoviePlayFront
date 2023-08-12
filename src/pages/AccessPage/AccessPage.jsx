import { useState,useEffect } from 'react'
import { useDispatch } from "react-redux"
import './accessPage.css'
import { NavLink,useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Footer from '../../components/Footer/Footer'
import {acceso} from "../../redux/actions";
import axios from 'axios';

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
const passwordRegex = /^[0-9a-zA-Z]+$/

const AccessPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [formCorrecto, setFormCorrecto] = useState(false)
    const [mensajeBack, setMensajeBack] = useState('')
    const [mensajeTrue, setMensaje] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch()

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


    const redirectToHome = () => {
        setTimeout(() => {
            navigate('/home')
        }, 1000);
    }

    
    const onSubmitForm = async (event) => {
        
        event.preventDefault();

        if (email === '' || password === '' || passwordError === true || emailError === true) {

            setFormCorrecto(true)
            setTimeout(() => {
                setFormCorrecto(false)
            }, 5000)
        
        } else {

            let userGet = {
                email,
                password
            }

            try {
                const {data} = await axios.post('/usuario/login', userGet)

                localStorage.setItem('id', data.id);
                localStorage.setItem('name', data.nombre);
                localStorage.setItem('email', data.email);
                localStorage.setItem('State', 'true')
                
                
                setEmail('')
                setPassword('')
                
                redirectToHome()
            
            } catch (error) {
                if (error.response.data.message) {
                    setMensajeBack(error.response.data.message)
                    setMensaje(true)
                    setTimeout(() => {
                        setMensaje(false)
                    }, 5000)
                
                } else {
                    setMensajeBack(error.response.data.errors)
                    setMensaje(true)
                    setTimeout(() => {
                        setMensaje(false)
                    }, 5000)
                }
            }

        }
    } 

    

    async function handleCallbackResponse(response) {
        
        const userObject = jwt_decode(response.credential);

        const email = {
            email: userObject.email
        }

        try {

            const responso = await axios.post('/usuario/google', email)  

            console.log(responso)

            localStorage.setItem('TokenUsu', response.credential);
            localStorage.setItem('email', userObject.email);
            localStorage.setItem('nombre', userObject.given_name); 
            localStorage.setItem('name', userObject.name); 
            localStorage.setItem('foto', userObject.picture); 
            localStorage.setItem('State', 'true')

            setEmail('')
            setPassword('')

            dispatch(acceso('true'))

            redirectToHome()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // global google

        const loadGoogleSignIn = () => {
            // Load the Google Sign-In API script
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            document.head.appendChild(script);
      
            // Initialize the Google Sign-In API once the script is loaded
            script.onload = () => {
              window.google.accounts.id.initialize({
                client_id: "455768951489-dpmia14fe22vcrimo4fmgbtqnngab2b7.apps.googleusercontent.com",
                callback: handleCallbackResponse
            });
      
            window.google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { theme: "outline", size: "large" }
              );
            };
        };
      
        loadGoogleSignIn();
        // google.accounts.id.prompt();
          
    }, [])
    
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
                    <br/>
                    <div id="signInDiv"></div>
                    {/* <button onClick={() => window.google.accounts.id.prompt()}>Sign in with Google</button> */}
              
                    <button className='buttonFormAccessPage'>Acceder</button>
                    
                </form>

                {
                    formCorrecto === true && <p className='mensajeError'>❌ Error: Revise el formulario</p>
                }

                {
                    mensajeTrue === true && <p className='mensajeError'>❌ Error: {mensajeBack}</p>
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
            
            <Footer/>
        </section>
    )
}

export default AccessPage