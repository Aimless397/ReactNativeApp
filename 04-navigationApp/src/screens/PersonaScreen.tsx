import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { RootStackParams } from '../navigator/StackNavigator';
import { styles } from '../theme/appTheme';

/* 
interface RouterParams {
  id: number;
  nombre: string;
}
 */
interface Props extends StackScreenProps<RootStackParams, 'PersonaScreen'> { };

export const PersonaScreen = ({ navigation, route }: Props) => {

  /* const params = route.params as RouterParams; */

  const params = route.params;

  const {changeUsername} = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      title: params.nombre
    })
  }, [])

  useEffect(() => {
    changeUsername(params.nombre);
  }, [])

  return (
    <View style={styles.globalMargin}>
      <Text style={styles.title}>
        {
          JSON.stringify(params, null, 3)
        }
      </Text>
    </View>
  )
}
