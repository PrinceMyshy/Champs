//*! LoginScreen.js v1.0 June 1 2023

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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM account_info WHERE email = ? AND password = ?',
        [email, sha512(password)],
        (_, { rows }) => {
          if (rows.length > 0) {
            auth0.webAuth.authorize({
              scope: 'openid profile email'
            })
            .then(credentials => {
              Alert.alert('AccessToken: ' + credentials.accessToken);
              // Start user session or navigate to the dashboard
            })
            .catch(error => console.log(error));
          } else {
            Alert.alert('Invalid email or password');
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
      <Header>Welcome back Champ-Seeker.</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={login} style={{ marginTop: 10 }}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default LoginScreen;
