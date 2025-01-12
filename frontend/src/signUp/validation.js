export const regEx={
    reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

}

export const emailValidation = (email)=> {
const isEmailValid =  regEx.reg.test(email);
return isEmailValid;


}

export const nameValidation = (name) =>{
const isNameValid = name.length>=2;
return isNameValid;
}