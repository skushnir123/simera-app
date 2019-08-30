import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen} from 'react-native';
import { Button ,Text, Headline, Title, Card, IconButton, Avatar, TextInput, Banner, Image} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {auth} from '../../../config/config'
import {Actions} from 'react-native-router-flux'

function Login(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorVisibile, setErrorVisibile] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    auth.signOut()
    auth.onAuthStateChanged(function(user) {
      
      if (user) {
        // User is signed in.
        () => Actions.Main()
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });

      return (
        <View style={styles.view}>
          <Banner
            visible={errorVisibile}
            actions={[
              {
                label: 'Got It',
                onPress: () => setErrorVisibile(false),
              },
              
            ]}
          >
            {errorMessage}
          </Banner>
          <TextInput
            style={{backgroundColor: "#FFFFFF"}}
            autoFocus
            label='Email'
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={{backgroundColor: "#FFFFFF"}}
            label='Password'
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Button  
            mode="contained" 
            onPress={() => {{
              auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.

                var errorCode = error.code;
                var errorMessage = error.message;
                setErrorVisibile(true)
                setErrorMessage(errorMessage)
              })
            }}}
          >
            Login
          </Button>
        </View>
      );
    }
  
    const styles = StyleSheet.create({
      view: {
        backgroundColor: '#FFFFFF',
        flex:1
      },
    });
  
  
  
    export default withTheme(Login);