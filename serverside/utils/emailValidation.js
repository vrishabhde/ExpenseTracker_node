export const emailValidation = (email) =>{
   
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;

        if(!emailPattern.test(email)){
            throw new Error("Invalid email address format.");
        }
    
}