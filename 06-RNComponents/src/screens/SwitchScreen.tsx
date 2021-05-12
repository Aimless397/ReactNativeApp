import React, { useContext, useState } from 'react'
import { Platform, StyleSheet, Switch, Text, View } from 'react-native'
import { CustomSwitch } from '../components/CustomSwitch';
import { HeaderTitle } from '../components/HeaderTitle';
import { ThemeContext } from '../context/themeContext/ThemeContext';


export const SwitchScreen = () => {

  const { theme: { colors } } = useContext(ThemeContext);

  const [state, setState] = useState({
    isActive: false,
    isHungry: false,
    isHappy: false
  });

  const { isActive, isHungry, isHappy } = state;

  const onChange = (value: boolean, field: keyof typeof state) => {
    setState({
      ...state,
      [field]: value
    })
  }

  return (
    <View style={{ marginHorizontal: 20 }}>

      <HeaderTitle title="Switches" />

      <View style={styles.switchRow}>
        <Text style={{ ...styles.switchText, color: colors.text }}>isActive</Text>
        <CustomSwitch isOn={isActive} onChange={(value) => onChange(value, 'isActive')} />
      </View>

      <View style={styles.switchRow}>
        <Text style={{ ...styles.switchText, color: colors.text }}>isHungry</Text>
        <CustomSwitch isOn={isHungry} onChange={(value) => onChange(value, 'isHungry')} />
      </View>

      <View style={styles.switchRow}>
        <Text style={{ ...styles.switchText, color: colors.text }}>isHappy</Text>
        <CustomSwitch isOn={isHappy} onChange={(value) => onChange(value, 'isHappy')} />
      </View>

      <Text style={styles.switchText}>
        {JSON.stringify(state, null, 5)}
      </Text>

    </View>
  )
}


const styles = StyleSheet.create({
  switchText: {
    fontSize: 25
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  }
})
