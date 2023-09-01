import { useState,useEffect } from 'react'
import { useDispatch } from "react-redux"
import './accessPage.css'
import { NavLink,useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import validation from './validations'
import { setFavorites} from '../../redux/actions';


const AccessPage = () => {

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [formCorrecto, setFormCorrecto] = useState(false)
    const [mensajeBack, setMensajeBack] = useState('')
    const [mensajeTrue, setMensaje] = useState(false)
    const [mesajeGoogle, setMensajeGoogle] = useState(false)
    const [input, setInput] = useState({
        email:'',
        password:''
    })
    const [error, setErrors] = useState({})

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = (event) =>{
        const { name, value } = event.target;
        
        setInput({
            ...input,
            [name]: value
        });

        setErrors({
            ...error,
            [name]: validation({ ...input, [name]: value })[name]
        });
    }

    const redirectToHome = () => {
        navigate('/home')
    }

    
    const onSubmitForm = async (event) => {
        
        event.preventDefault();

        if (input.email === '' || input.password === '' || error.email || error.password) {

            setFormCorrecto(true)
            setTimeout(() => {
                setFormCorrecto(false)
            }, 5000)
        
        } else {

            let userGet = {
                email: input.email,
                password: input.password,
            }

            try {
                const {data} = await axios.post('/usuario/login', userGet)

               console.log(data);

                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.email);
                localStorage.setItem('name', data.nombre);
                localStorage.setItem('rol', data.rol)
                localStorage.setItem('foto', data.image || 'https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png')
                localStorage.setItem('State', 'true')
                localStorage.setItem('Token', data.token)
                localStorage.setItem('recargado', 'no')
                localStorage.setItem('apellido',data.apellido)
                
                
                setInput({
                    email: '',
                    password: ''
                })

              redirectToHome()
            
            } catch (error) {
                console.log(error)
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
        
         console.log(userObject)
        
        const email = {
            email: userObject.email
        }

        try {

            const {data} = await axios.post(`/usuario/google?email=${email.email}`)  

             console.log(data);


            localStorage.setItem('Token', response.credential);
            localStorage.setItem('email', data.login.email);
            localStorage.setItem('name', data.login.nombre); 
            localStorage.setItem('foto', userObject.picture); 
            localStorage.setItem('rol', data.login.rol);
            localStorage.setItem('id', data.login.id);
            localStorage.setItem('State', 'true')
            localStorage.setItem('recargado', 'no')
            localStorage.setItem('apellido',data.login.apellido)

            setInput({
                email: '',
                password: ''
            })

           // redirectToHome()

        } catch (error) {
            setMensajeGoogle(true)
            setTimeout(() => {
                setMensajeGoogle(false)
            }, 5000)
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

    const handleLogin = () => {
        // Luego de autenticar al usuario, obtén los favoritos asociados con el usuario desde el servidor
        const userFavorites = ['movie1', 'movie2']; // Ejemplo de favoritos recuperados
        const userRatings = { movie1: 4, movie2: 3 }; 

        dispatch(setFavorites(userFavorites)); // Establece los favoritos en el estado de Redux
        // dispatch(setRatings(userRatings));
    };
    
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
                        value={input.email} 
                        onChange={handleChange} 
                        style={emailError ? {border: '3px solid red'} : null}
                        />
                        {error.email && <p className='pErrorEmailAccessPage'>{error.email}</p>}

                    <label className='labelFormAccessPage'> Contraseña </label>
                    <input 
                        className='inputFormAccessPage' 
                        type="password" 
                        placeholder='Contraseña' 
                        name='password' 
                        value={input.password} 
                        onChange={handleChange} 
                        style={passwordError ? {border: '3px solid red'} : null}
                        />
                        {error.password && <p className='pErrorEmailAccessPage'>{error.password}</p>}

                    <br/>
                    <div id="signInDiv"></div>
                    {/* <button onClick={() => window.google.accounts.id.prompt()}>Sign in with Google</button> */}
              
                    <button onClick={handleLogin} className='buttonFormAccessPage'>Acceder</button>
                    
                </form>

                {
                    formCorrecto === true && <p className='mensajeError'>❌ Error: Revise el formulario</p>
                }

                {
                    mensajeTrue === true && <p className='mensajeError'>❌ Error: {mensajeBack}</p>
                }

                {
                    mesajeGoogle === true && <p className='mensajeError'>❌ Error: el usuario no existe</p>
                }

                    
                <div className='divpFormAccessPage'>
                    <p className='pFromAccessPage'>¿Aún no tienes cuenta? 
                        <NavLink to='/register'>
                            <span className='spanFormAccessPage'>Registrarse</span>
                        </NavLink>
                    </p>

                    {/* <p className='pFromAccessPage'>¿Olvidaste tu contraseña? 
                        <NavLink to='/'>
                            <span className='spanFormAccessPage'>Click aquí</span>
                        </NavLink>
                    </p> */}
                </div>

            </div>
        </section>
    )
}

export default AccessPage