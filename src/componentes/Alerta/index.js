import React from 'react'

import { Snackbar } from 'react-native-paper'

export function Alerta ({mensagem, error= false, setError, duracao = 1000}){
    return(
        <Snackbar
            visible={error}
            onDismiss={() => setError(false)}
            duration={duracao}
            action={{
                label: 'Ok',
                onPress: () => setError(false),
            }}
        >
            {mensagem}
        </Snackbar>
    )
}