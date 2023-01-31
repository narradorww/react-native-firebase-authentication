import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import estilos from "./estilos";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import { Alerta } from "../../componentes/Alerta";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [statusError, setStatusError] = useState("");
  const [messageError, setMessageError] = useState("");

  async function realizarCadastro() {
    if (email === "") {
      setMessageError("O campo e-mail é obrigatório");
      setStatusError("email");
    } else if (senha === "") {
      setMessageError("O campo senha é obrigatório");
      setStatusError("senha");
    } else if (confirmaSenha === "") {
      setMessageError("O campo confirmar senha é obrigatório");
      setStatusError("confirmaSenha");
    } else if (senha != confirmaSenha) {
      setMessageError("As senhas não conferem");
      setStatusError("confirmaSenha");
    } else {
      const resultado = await cadastrar(email, senha);
      if (resultado == "sucesso") {
        setMessageError("Cadastro realizado com sucesso");
        setEmail("");
        setSenha("");
        setConfirmaSenha("");
        } else {
        setStatusError("firebase");
        setMessageError(resultado);
        console.log("depois de 9 meses", resultado);
      }
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
        error={statusError == "email"}
        messageError={messageError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        secureTextEntry
        error={statusError == "senha"}
        messageError={messageError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={(texto) => setConfirmaSenha(texto)}
        secureTextEntry
        error={statusError == "confirmaSenha"}
        messageError={messageError}
      />

      <Alerta
        mensagem={messageError}
        error={statusError == "firebase"}
        setError={setStatusError}
        duracao={5000}
      />

      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}
