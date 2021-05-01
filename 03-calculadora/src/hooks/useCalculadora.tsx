import { useRef, useState } from 'react';

export enum Operadores {
  // sumar = 0, restar = 1, multiplicar = 2, dividir = 3
  sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {

  const [numeroAnterior, setNumeroAnterior] = useState('0')   // numero anterior pequeño
  const [numero, setNumero] = useState('0');    // primer número

  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  }

  const armarNumero = (numeroIngresado: string) => {    // numeroIngresado = numero que ingresa por teclado

    // No aceptar doble punto
    if (numero.includes('.') && numeroIngresado === '.') { return }

    // Si el número empieza con cero o con cero negativo
    if (numero.startsWith('0') || numero.startsWith('-0')) {

      // Punto decimal. Si se ingresa un "."
      if (numeroIngresado === '.') {
        setNumero(numero + numeroIngresado);    // Concatena el "0" y el "."

        // Permite ingresar "0.000000". Se ingresa "0" y el número actual incluye un "."
      } else if (numeroIngresado === '0' && numero.includes('.')) {
        setNumero(numero + numeroIngresado);    // Concatena el valor actual con el número ingresado

        // Evaluar si es diferente de cero y no tiene un punto. Permite reemplazar "123" cuando el valor inicial es "0"
      } else if (numeroIngresado !== '0' && !numero.includes('.')) {
        setNumero(numeroIngresado);   // El nuevo valor es el número ingresado

        // Evitar 0000.0
      } else if (numeroIngresado === '0' && !numero.includes('.')) {
        setNumero(numero);    // Mantiene el valor actual. Mantiene el "0"

        // Permite ingresar "0.1234056"
      } else {
        setNumero(numero + numeroIngresado);    // Concatena el valor actual con el número ingresado
      }

      // Si no empieza con "0", permite ingresar "123900432"
    } else {
      setNumero(numero + numeroIngresado);    // Concatena el valor actual con el número ingresado
    }

  }

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''))
    } else {
      setNumero('-' + numero)
    }
  }

  const btnDelete = () => {

    let longitud: number = numero.length;   // Longitud del número en pantalla

    if (longitud > 1) {
      setNumero(numero.substring(0, longitud - 1));   // Muestra la subcadena del número menos el último caracter
    } else if (longitud == 1) {   // Si el número es de un solo dígito
      setNumero('0');
    }

    if (numero.startsWith('-') && longitud == 2) {    // Si el número es negativo y de un solo dígito numérico
      setNumero('0');
    }

  }

  const cambiarNumPorAnterior = () => {

    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }

    setNumero('0');

  }

  const btnDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  }

  const btnMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  }

  const btnRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;

  }

  const btnSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;

  }

  const calcular = () => {

    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2}`)
        break;

      case Operadores.restar:
        setNumero(`${num2 - num1}`)
        break;

      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`)
        break;

      case Operadores.dividir:
        setNumero(`${num2 / num1}`)
        break;

    }

    setNumeroAnterior('0');

  }

  return {
    numero,
    numeroAnterior,
    limpiar,
    positivoNegativo,
    btnDelete,
    armarNumero,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular
  }
}

