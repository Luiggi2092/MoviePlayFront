import style from './register.module.css'
import validation from './validations'
import { useState } from 'react'
// import Footer from '../../components/Footer/Footer'

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
            <form className={style.divContainerTodo} onSubmit={handleSubmit} > 
            <h2 className='h2FormAccessPage'>Ingresa tus datos</h2>
                <label className={style.labelFormAccessPage}>Name</label>
                <input placeholder='ENTER YOUR NAME' value={input.name} name='name' onChange={handleChange} className={style.inputFormAccessPage}/>
                {error.name && <p className={style.error}>{error.name}</p>}
                <label className={style.labelFormAccessPage}>Email</label>
                <input placeholder='ENTER YOUR EMAIL' value={input.email} name='email' onChange={handleChange} className={style.inputFormAccessPage}/>
                {error.email && <p className={style.error}>{error.email}</p>}
                <label className={style.labelFormAccessPage}>Password</label>
                <input placeholder='ENTER YOUR PASSWORD' type='password' value={input.password} name='password' onChange={handleChange} className={style.inputFormAccessPage}/>
                {error.password && <p className={style.error}>{error.password}</p>}
                <label className={style.labelFormAccessPage}>Confirm password</label>
                <input placeholder='CONFIRM PASSWORD' type='password' value={input.confirmPassword} name='confirmPassword' onChange={handleChange} className={style.inputFormAccessPage}/>
                {error.confirmPassword && <p className={style.error}>{error.confirmPassword}</p>}
                <br/>
                <div className={style.form}>
                <span className={style.labelFormAccessPage}>ENTER YOUR IMAGE {'(optional)'}</span>
                <input className={style.file} type='file'/>
                </div>
                <button type='submit' className={style.buttonFormAccessPage}>Registrarse</button>
            </form>            

            {/* <Footer/> */}
        </section>
    )
}

export default Register