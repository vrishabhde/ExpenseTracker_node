export const passwordValidation = (password) => {
    if(password.length < 5){
        throw new Error('Password should be at least 5 characters long.');
    }
    if(!/[a-z]/.test(password)){
        throw new Error('Password should contain at least one lowercase character.');
    }
    if(!/[A-Z]/.test(password)){
        throw new Error('Password should contain at least one uppercase character.');
    }
    if(!/\d/.test(password)){
        throw new Error('Password should contain at least one digit.');
    }
    if(!/[!@#$%^&*]/.test(password)){
        throw new Error('Password should contain at least one special character.');
    }
}