import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";


function errosFirebase(error){
  switch (error.code) {
    case AuthErrorCodes.INVALID_EMAIL:
      return 'E-mail inválido';
    case AuthErrorCodes.EMAIL_ALREADY_IN_USE:
      return 'E-mail já cadastrado';
    case AuthErrorCodes.WEAK_PASSWORD:
      return 'Senha fraca';
    default:
      return 'Erro desconhecido';
  }
}



export async function cadastrar(email, senha) {

  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
  .then((dadosDoUsuario) => {
    console.log(dadosDoUsuario)
    return
  })
  .catch((error) => {
    console.log(error)
    return errosFirebase(error);
  });

  return resultado;
}