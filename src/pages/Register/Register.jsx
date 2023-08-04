import style from './register.module.css'
import validation from './validations'
import { useState } from 'react'

const Register = () => {

    const [input, setInput] = useState({
        name: '',
        email:'',
        password:'',
        confirmPassword:''
    })

    const [error, setErrors] = useState({})

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

    const handleSubmit = (event) => {
        const errorSave = validation(input)
        if(Object.values(errorSave).length !== 0)alert("You must fullfill all the required conditions")
        else if(!input.name || !input.email || !input.password)alert("Please complete the form")
        else{
            alert('User created!');
            setInput({
                name: '',
                email:'',
                password:'',
                confirmPassword:''
            })
        }
    }


    return(
        <section className={style.maxContainer}>
            <form className={style.formContainer} onSubmit={handleSubmit} > 
                <h1>Ingresa tus datos</h1>
                <input placeholder='ENTER YOUR NAME' value={input.name} name='name' onChange={handleChange}/>
                {error.name && <p className={style.error}>{error.name}</p>}
                <input placeholder='ENTER YOUR EMAIL' value={input.email} name='email' onChange={handleChange}/>
                {error.email && <p className={style.error}>{error.email}</p>}
                <input placeholder='ENTER YOUR PASSWORD' type='password' value={input.password} name='password' onChange={handleChange}/>
                {error.password && <p className={style.error}>{error.password}</p>}
                <input placeholder='CONFIRM PASSWORD' type='password' value={input.confirmPassword} name='confirmPassword' onChange={handleChange}/>
                {error.confirmPassword && <p className={style.error}>{error.confirmPassword}</p>}
                <br/>
                <div className={style.form}>
                <span>ENTER YOUR IMAGE {'(optional)'}</span>
                <input className={style.file} type='file'/>
                </div>
                <button type='submit'>Registrarse</button>
            </form>            
        </section>
    )
}

export default Register