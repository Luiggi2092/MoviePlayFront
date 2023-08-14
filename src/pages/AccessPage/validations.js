const validation = (input) =>{
    let errors = {}
    if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input.email))errors.email = 'Verifica que el correo electrónico sea correcto';
    if(input.password.length < 4)errors.password = 'La contraseña debe contener al menos 3 caracteres';
    return errors
}

export default validation