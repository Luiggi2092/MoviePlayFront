const validation = (input) =>{
    let errors = {}
    if(!/^[a-zA-Z\s]*$/.test(input.name)|| input.name.length < 3 || input.name.length >= 40) errors.name = 'Must contain 3 to 40 characters, letters only';
    if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input.email))errors.email = 'Verify that the email is correct';
    if(input.password.length < 4)errors.password = 'Password must contain at least 3 characters';
    if(input.confirmPassword !== input.password)errors.confirmPassword = 'Password must match'
    return errors
}

export default validation