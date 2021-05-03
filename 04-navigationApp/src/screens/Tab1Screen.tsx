import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native'
import { styles } from '../theme/appTheme';
import { TouchableIcon } from '../components/TouchableIcon';

export const Tab1Screen = () => {

  useEffect(() => {
    console.log('Tab1Screen effect');

  }, [])

  return (
    <View style={styles.globalMargin}>
      <Text style={styles.title}>Iconos</Text>
      <Text>
        <TouchableIcon iconName="airplane-outline" />
        <TouchableIcon iconName="attach-outline" />
        <TouchableIcon iconName="bicycle-outline" />
        <TouchableIcon iconName="car-sport-outline" />
        <TouchableIcon iconName="desktop-outline" />
        <TouchableIcon iconName="globe-outline" />
        <TouchableIcon iconName="game-controller-outline" />
        
      </Text>
    </View>
  )
}
