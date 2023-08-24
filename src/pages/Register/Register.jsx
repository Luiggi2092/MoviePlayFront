import style from './register.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import jwt_decode from "jwt-decode";
import validation from './validations'
import { NavLink } from 'react-router-dom'
import { useSelector} from "react-redux"

const Register = () => {

    const navigate = useNavigate();

    const email = useSelector((state) => state.EmailSUSCRIPTO)

    const [input, setInput] = useState({
        nombre: '',
        apellido: '',
        email: email ? email : '',
        password:''
    })

    const [error, setErrors] = useState({})

    const [mensajeBack, setMensajeBack] = useState('')
    const [mensajeTrue, setMensaje] = useState(false)

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

    function generarContrasenaAleatoria(longitud) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        let contrasena = "";
      
        for (let i = 0; i < longitud; i++) {
          const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
          const caracterAleatorio = caracteres.charAt(indiceAleatorio);
          contrasena += caracterAleatorio;
        }
      
        return contrasena;
    }
      

    const handleSubmit = async (event) => {
        event.preventDefault()

        const errorSave = validation(input)
        
        if(Object.values(errorSave).length !== 0)alert("Debes cumplir con todas las condiciones requeridas")
        
        else if(!input.nombre || !input.apellido || !input.email || !input.password)alert("Por favor complete el formulario")
        
        else {
    
            try {
                const {data} = await axios.post('/usuario', input)

                // console.log(data)

                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.email);
                localStorage.setItem('rol', data.rol)
                localStorage.setItem('name', data.nombre); 
                localStorage.setItem('foto', data.image || 'https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png')
                localStorage.setItem('State', 'true')
                localStorage.setItem('token', data.token)
                //para evitar bugs del carrito
                localStorage.setItem('recargado', 'no')

                setInput({
                    nombre: '',
                    apellido: '',
                    email:'',
                    password:''
                })

                redirectToHome()

            } catch (error) {
                setMensajeBack(error.response.data.error)
                setMensaje(true)
                setTimeout(() => {
                    setMensaje(false)
                }, 5000)
            }
        }
    }

    async function handleCallbackResponse(response) {

        const longitudDeseada = 10; // Cambia esto a la longitud que desees
        const contrasenaGenerada = generarContrasenaAleatoria(longitudDeseada);
        
        const userObject = jwt_decode(response.credential);
        
        // console.log(userObject)
        // console.log(response)

        const datos = {
            nombre: userObject.given_name,
            apellido: userObject.family_name,
            email: userObject.email,
            password: contrasenaGenerada,
            image: userObject.picture
        }
        
        try {
            const responso = await axios.post('/usuario', datos)

            // console.log(response)
            
            localStorage.setItem('Token', response.credential);
            localStorage.setItem('id', responso.data.id)
            localStorage.setItem('email', responso.data.email);
            localStorage.setItem('name', responso.data.nombre); 
            localStorage.setItem('foto', userObject.picture);
            localStorage.setItem('rol', responso.data.rol);  
            localStorage.setItem('State', 'true')
            //para evitar bugs del carrito
            localStorage.setItem('recargado', 'no')
        
            
            redirectToHome()
        
        } catch (error) {
            // console.log(error)
            setMensajeBack(error.response.data.error)
            setMensaje(true)
            setTimeout(() => {
                setMensaje(false)
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
          
    }, [])


    return(
        <section className={style.maxContainer}>
            
            <form className={style.divContainerTodo} onSubmit={handleSubmit} > 
            
                <h2 className='h2FormAccessPage'>Ingresa tus datos</h2>
                
                <label className={style.labelFormAccessPage}>Nombre</label>
                <input placeholder='Nombre' value={input.nombre} name='nombre' onChange={handleChange} className={style.inputFormAccessPage}/>
                {error.nombre && <p className={style.error}>{error.nombre}</p>}
                
                <label className={style.labelFormAccessPage}>Apellido</label>
                <input placeholder='Apellido' value={input.apellido} name='apellido' onChange={handleChange} className={style.inputFormAccessPage}/>
                {error.apellido && <p className={style.error}>{error.apellido}</p>}
                
                <label className={style.labelFormAccessPage}>Email</label>
                <input placeholder='Email' value={input.email} name='email' onChange={handleChange} className={style.inputFormAccessPage}/>
                {error.email && <p className={style.error}>{error.email}</p>}
                
                <label className={style.labelFormAccessPage}>Contraseña</label>
                <input placeholder='Contraseña' type='password' value={input.password} name='password' onChange={handleChange} className={style.inputFormAccessPage}/>
                {error.password && <p className={style.error}>{error.password}</p>}
                
                <br/>
                <div id="signInDiv"></div>

                {
                    mensajeTrue === true && <p className='mensajeError'>❌ Error: {mensajeBack}</p>
                }
                
                <button type='submit' className={style.buttonFormAccessPage}>Registrarse</button>

                <p className='pFromAccessPage'>¿Ya tienes cuenta? 
                    <NavLink to='/login'>
                        <span className='spanFormAccessPage'>Login</span>
                    </NavLink>
                </p>
            </form>            
        </section>
    )
}

export default Register