import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../servicos/requisicoesFirebase';
import estilos from './estilos';
import { Alerta } from '../../componentes/Alerta';
import {auth} from '../../config/firebase'
import animacaoCarregando from '../../../assets/loader.gif';


export default function Login({ navigation }) {
  const [dados, setDados] = useState({
    email: '',
    senha: '',
  });
  const alterarDados = (variavel, valor) => {
    setDados({
      ...dados,
      [variavel]: valor,
    });
  }

  const [messageError, setMessageError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(()=>{
    const estadoUsuario = auth.onAuthStateChanged((usuario)=>{
      if(!!usuario){
        navigation.replace('Principal')
      }
      setCarregando(false)
    })
    return ()=>estadoUsuario
  },[])

  async function realizarLogin() {
    if (dados.email === '') {
      setMessageError('O campo e-mail é obrigatório');
      setStatusError('email');
    } else if (dados.senha === '') {
      setMessageError('O campo senha é obrigatório');
      setStatusError('senha');
    } else {
      const resultado = await logar(dados.email, dados.senha);
      if (resultado == 'erro') {
        setStatusError('firebase');
        setMessageError('E-mail ou senha inválidos');
      } else {
        navigation.replace('Principal');
      
      }
    }
  }

  if (carregando) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image style={estilos.animacao} source={animacaoCarregando} />
      </View>
    );
  }


  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="E-mail"
        value={dados.email}
        onChangeText={valor => alterarDados('email', valor)}
        error={statusError == "email"}
        messageError={messageError}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={valor => alterarDados('senha', valor)}
        secureTextEntry
        error={statusError == "senha"}
        messageError={messageError}
      />

<Alerta
        mensagem={messageError}
        error={statusError == "firebase"}
        setError={setStatusError}
        duracao={1800}
      />
      
      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>



    </View>
  );
}
