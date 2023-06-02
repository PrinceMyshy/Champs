import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme'


export default function StartScreen({ navigation }) {
  return (
    <Background style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
        <Text style={styles.logoText}>Find a{'\n'}Champ!</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
      <Text style={styles.finePrint}>
        By using our application, I agree to Find a Champ's <Text style={styles.link}>Terms of Service</Text> 
      </Text>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6D6B6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    color: '#493003',
    fontSize: 48,
    fontFamily: 'Catamaran',
    marginLeft: 10,
    textAlign: 'center',
  },
  header: {
    fontSize: 36,
    fontFamily: 'Catamaran',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 24,
    fontFamily: 'Catamaran',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    height: 80,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finePrint: {
    fontSize: 16,
    fontFamily: 'Catamaran',
    marginTop: 30,
    textAlign: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    },
});
