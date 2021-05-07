import React, { useRef } from 'react'
import { Animated } from 'react-native'

export const useFade = () => {

  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = (callback?: Function) => {
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }
    ).start(() => callback ? callback() : null);    // Si el callback existe, ejecútalo, sino no hagas nada
  }

  const fadeOut = (duration: number = 300) => {
    Animated.timing(
      opacity,
      {
        toValue: 0,
        duration,
        useNativeDriver: true
      }
    ).start();
  }


  return {
    opacity,
    fadeIn,
    fadeOut
  }
}
