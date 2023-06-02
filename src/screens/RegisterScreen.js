//*! RegisterScreen.js v1.0 June 1 2023

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Alert } from 'react-native';
import Auth0 from 'react-native-auth0';
import SQLite from 'react-native-sqlite-storage';
var sha512 = require('js-sha512');

const auth0Config = {
  domain: "dev-2lijd8z8mrczim5h.us.auth0.com",
  clientId: "DxY9zznu6ZY1jdPPACxzbXgBoFyMgRCq",
};

const auth0 = new Auth0(auth0Config);
const db = SQLite.openDatabase({ name: 'accounts.db', createFromLocation: 1 });

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPressed = () => {
    const hashedPassword = sha512(password);

    db.transaction(tx => {
      // check if the email already exists
      tx.executeSql(
        'SELECT * FROM account_info WHERE email = ?',
        [email],
        (_, { rows }) => {
          if (rows.length > 0) {
            Alert.alert('Email already exists');
          } else {
            // generate 9d random id
            const id = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;

            // Insert the user into the database
            tx.executeSql(
              'INSERT INTO account_info (name, hashed_password, id, date_of_creation, email_verified) VALUES (?, ?, ?, ?, ?)',
              [name, hashedPassword, id, new Date().toISOString(), false],
              (_, { insertId }) => {
                // Send verification email 
                auth0.auth
                  .sendEmailVerification({ email })
                  .then(() => {
                    Alert.alert('Verification email sent');
                    
                  })
                  .catch(error => console.log(error));
              },
              error => console.log(error)
            );
          }
        },
        error => console.log(error)
      );
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
        Sign Up
      </Button>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default RegisterScreen;
