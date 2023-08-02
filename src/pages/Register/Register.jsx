import style from './register.module.css'

const Register = () => {
    return(
        <section className={style.maxContainer}>
            <form className={style.formContainer}> 
                <h1>Ingresa tus datos</h1>
                <input placeholder='ENTER YOUR NAME'/>
                <input placeholder='ENTER YOUR EMAIL'/>
                <input placeholder='ENTER YOUR PASSWORD'/>
                <input placeholder='CONFIRM PASSWORD'/>
                <br/>
                <div>
                <span>ENTER YOUR IMAGE</span>
                <input className={style.file} type='file'/>
                </div>
                <button type='submit'>Registrarse</button>
            </form>            
        </section>
    )
}

export default Register