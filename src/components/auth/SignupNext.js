import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import { StyleSheet, Screen} from 'react-native';
import { Button ,Text, Headline, Title, Card, IconButton, Avatar, TextInput, Banner, Image, RadioButton, Chip} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import {Actions} from 'react-native-router-flux'

function SignupNext(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorVisibile, setErrorVisibile] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [iconPlayer, setIconPlayer] = React.useState("check")
    const [iconCoach, setIconCoach] = React.useState("add")
    const [iconManager, setIconManager] = React.useState("add")
    const [iconFan, setIconFan] = React.useState("add")
    const [role, setRole] = React.useState(1)


    auth.onAuthStateChanged(function(user) {
        if (user) {
            firestore.collection("users").doc(auth.currentUser.uid).set({
                firstName: props.firstName,
                lastName: props.lastName,
                email: props.email,
                phone: props.phone,
                role: role
            }).then(function() {
                Actions.signupLoader()
            })
        } else {
          // No user is signed in.
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
                    setIconManager("add")
                    setRole(2)
                }}>Coach</Chip>
                <Chip style={{backgroundColor: "#FFFFFF"}} icon={iconManager} onPress={() => {
                    setIconPlayer("add")
                    setIconFan("add")
                    setIconCoach("add")
                    setIconManager("check")
                    setRole(3)
                }}>Manager</Chip>
                <Chip style={{backgroundColor: "#FFFFFF"}} icon={iconFan} onPress={() => {
                    setIconPlayer("add")
                    setIconFan("check")
                    setIconCoach("add")
                    setIconManager("add")
                    setRole(4)
                }}>Fan</Chip>
              
              <Button
                mode="contained" 
                onPress={() => {{
                    console.log(props.email)
                    console.log(props.password)
                    auth.createUserWithEmailAndPassword(props.email, props.password).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        setErrorVisibile(true)
                        setErrorMessage(errorMessage)
                      }).then(function() {
    
                        
                        
                    })
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
  
  
  
    export default withTheme(SignupNext);