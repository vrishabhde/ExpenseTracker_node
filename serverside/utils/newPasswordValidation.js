export const newPasswordValidation = (newPassword) => {
    if(newPassword.length < 5){
        throw new Error('Password should be at least 5 characters long.');
    }
    if(!/[a-z]/.test(newPassword)){
        throw new Error('Password should contain at least one lowercase character.');
    }
    if(!/[A-Z]/.test(newPassword)){
        throw new Error('Password should contain at least one uppercase character.');
    }
    if(!/\d/.test(newPassword)){
        throw new Error('Password should contain at least one digit.');
    }
    if(!/[!@#$%^&*]/.test(newPassword)){
        throw new Error('Password should contain at least one special character.');
    }
}