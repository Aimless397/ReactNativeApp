import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

interface Props {
  title: string;
  position?: 'br' | 'bl'
  onPress: () => void;
}


export const Fab = ({ title, onPress, position = 'br' }: Props) => {

  console.log(`props: `, title);

  return (
    <View
      style={[
        styles.fabLocation,
        (position === 'bl') ? styles.left : styles.right
      ]}
    >
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#28425B', true, 30)}
      >
        <View style={styles.fab}>
          <Text style={styles.fabText}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>

  )
}

const styles = StyleSheet.create({

  fabLocation: {
    position: 'absolute',
    bottom: 25,
  },
  right: {
    right: 25
  },
  left: {
    left: 25
  },
  fab: {
    backgroundColor: '#5856D6',
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  fabText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  }

})