import { useState,useEffect } from 'react'
import './accessPage.css'
import { NavLink,useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Footer from '../../components/Footer/Footer'


const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
const passwordRegex = /^[0-9a-zA-Z]+$/
const google="";

const AccessPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [formCorrecto, setFormCorrecto] = useState(false)
    
  const [user, setUser] = useState({})
    const navigate = useNavigate();

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

   
  function handleCallbackResponse(response) {
    console.log("Enconded JWT ID token" + response.credential)
    const userObject = jwt_decode(response.credential);
    console.log(userObject)
    localStorage.setItem('TokenUsu', JSON.stringify(response.credential));
    localStorage.setItem('TypoUsu', JSON.stringify(userObject.iss));      
    setUser(userObject)
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
          
      }, [])
    
      const redirectToGoogle = () => {
        const redirectUri = encodeURIComponent('http://localhost:/redirect-from-google');
        const googleAuthUrl = `https://accounts.google.com/signin/oauth?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=${redirectUri}&scope=openid%20email%20profile`;
      
        window.location.href = googleAuthUrl;
      }; 
    

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
                    <br/>
                    <div id="signInDiv"></div>
                    <button onClick={() => window.google.accounts.id.prompt()}>Sign in with Google</button>
              
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
            
            <Footer/>
        </section>
    )
}

export default AccessPage