import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import { StyleSheet, Screen} from 'react-native';
import { Button ,Text, Headline, Title, Card, IconButton, Avatar, TextInput, Banner, Image, RadioButton, Chip} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import {Actions} from 'react-native-router-flux'

function Signup(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorVisibile, setErrorVisibile] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("") 



    auth.onAuthStateChanged(function(user) {
      
        if (user) {
          // User is signed in.
          () => Actions.signupLoader()
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });


      return (
        <View style={{backgroundColor:'#FFFFFF', flex:1}}>
        <ScrollView contentContainerStyle={styles.view}>
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
                label='First Name'
                value={firstName}
                onChangeText={text => setFirstName(text)}
            />
            <TextInput
                style={{backgroundColor: "#FFFFFF"}}
                label='Last Name'
                value={lastName}
                onChangeText={text => setLastName(text)}
            />
            <TextInput
                style={{backgroundColor: "#FFFFFF"}}
                label='Email'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={{backgroundColor: "#FFFFFF"}}
                keyboardType={"number-pad"}
                label='Phone Number (optional)'
                value={phone}
                onChangeText={text => setPhone(text)}
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
              if (firstName !== "" && lastName!=="" && email!=="" && password!=="")
              Actions.push(sceneKey="signup_next" , props={firstName: firstName, lastName: lastName, email:email, phone: phone, password: password})
            }}}
          >
            Next
          </Button>
          <View style={{height: 20}}></View>
        </ScrollView>
        </View>
      );
    }
  
    const styles = StyleSheet.create({
      view: {
        
        backgroundColor: '#FFFFFF',
      },
    
    });
  
  
  
    export default withTheme(Signup);