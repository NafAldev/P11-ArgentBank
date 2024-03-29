// Verification format des imputs (email et password)

export const isValidEmail  = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email)
}


export const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/; 
    return regex.test(password);
};