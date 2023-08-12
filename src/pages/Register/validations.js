const validation = (input) =>{
    let errors = {}
    if(!/^[a-zA-Z\s]*$/.test(input.nombre)|| input.nombre.length < 3 || input.nombre.length >= 40) errors.nombre = 'Debe contener de 3 a 40 caracteres, solo letras';
    if(!/^[a-zA-Z\s]*$/.test(input.apellido)|| input.apellido.length < 3 || input.apellido.length >= 40) errors.apellido = 'Debe contener de 3 a 40 caracteres, solo letras';
    if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input.email))errors.email = 'Verifica que el correo electrónico sea correcto';
    if(input.password.length < 4)errors.password = 'La contraseña debe contener al menos 3 caracteres';
    return errors
}

export default validation