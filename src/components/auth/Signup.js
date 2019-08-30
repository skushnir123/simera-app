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
    const [password, setPassword] = React.useState("")
    const [errorVisibile, setErrorVisibile] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [iconPlayer, setIconPlayer] = React.useState("check")
    const [iconCoach, setIconCoach] = React.useState("add")
    const [iconFan, setIconFan] = React.useState("add")
    const [role, setRole] = React.useState(1)



      return (
        <ScrollView  style={styles.view}>
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
                label='Password'
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Headline style={{margin:10}}>What is your role?</Headline>
            <Chip style={{backgroundColor: "#FFFFFF"}} icon={iconPlayer} onPress={() => {
                setIconPlayer("check")
                setIconFan("add")
                setIconCoach("add")
                setRole(1)
            }}>Player</Chip>
            <Chip style={{backgroundColor: "#FFFFFF"}} icon={iconCoach} onPress={() => {
                setIconPlayer("add")
                setIconFan("add")
                setIconCoach("check")
                setRole(2)
            }}>Coach</Chip>
            <Chip style={{backgroundColor: "#FFFFFF"}} icon={iconFan} onPress={() => {
                setIconPlayer("add")
                setIconFan("check")
                setIconCoach("add")
                setRole(3)
            }}>Fan</Chip>

          <Button  
            mode="contained" 
            onPress={() => {{
                auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    setErrorVisibile(true)
                    setErrorMessage(errorMessage)
                  }).then(function() {
                    firestore.collection("users").doc(auth.currentUser.uid).set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        role: role
                    }).then(function() {
                        Actions.signupLoader()
                    })
                })
            }}}
          >
            Signup
          </Button>
        </ScrollView>
      );
    }
  
    const styles = StyleSheet.create({
      view: {
        flex:1,
        backgroundColor: '#FFFFFF',
      },
    
    });
  
  
  
    export default withTheme(Signup);