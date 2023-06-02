import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'


import Auth0 from 'react-native-auth0';
const auth0Config = {
  domain: "dev-2lijd8z8mrczim5h.us.auth0.com",
  clientId: "DxY9zznu6ZY1jdPPACxzbXgBoFyMgRCq",
};

const {authorize, clearSession, user, error,} = useAuth0();


const auth0 = new Auth0(auth0Config);

export default function Dashboard({ navigation }) {
  const logout = () => {
    auth0.webAuth
        .clearSession({})
        .then(success => {
            Alert.alert('Logged out!');
            setAccessToken(null);
            navigation.navigate('StartScreen');
        })
        .catch(error => {
            console.log('Log out cancelled');
        });
};
  return (
    <Background>
      <Logo />
      <Header>Be a CHAMP</Header>
      <Paragraph>
        What's up mfs, welcome to find a champ: helping junkies find shrooms since circa '23!
      </Paragraph>
      <Button
        mode="outlined" onPress={logout} style={{marginTop: 10 }}> Log Out </Button>
    </Background>
  );
};
