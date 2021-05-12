import React from 'react'
import { Alert, Button, View } from 'react-native'
import prompt from 'react-native-prompt-android';

import { log } from 'react-native-reanimated'

import { HeaderTitle } from '../components/HeaderTitle'
import { styles } from '../theme/appTheme'


const showAlert = () => {
  Alert.alert(
    "Título",
    "Este es el mensaje de la alerta",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "destructive"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    {
      cancelable: true,
      onDismiss: () => console.log("On Dismiss"),

    }
  );
}

const showPrompt = () => {
  prompt(
    'Enter password',
    'Enter your password to claim your $1.5B in lottery winnings',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'OK', onPress: password => console.log('OK Pressed, password: ' + password) },
    ],
    {
      type: 'secure-text',
      cancelable: false,
      defaultValue: 'test',
      placeholder: 'placeholder'
    }
  );
}

export const AlertScreen = () => {
  return (
    <View style={styles.globalMargin}>
      <HeaderTitle title="Alerts" />

      <Button
        title="Mostrar Alerta"
        onPress={showAlert}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Mostrar Prompt"
        onPress={showPrompt}
      />
    </View>
  )
}
