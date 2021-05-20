import React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Tab1 } from './src/navigator/Tab1'
import { Tabs } from './src/navigator/Tabs'

const App = () => {
  return (
    <NavigationContainer>
      {/* <Tab1 /> */}
      <Tabs />
    </NavigationContainer>
  )
}

export default App;
