import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet} from 'react-native';
import { Button ,Text, Headline, Title, Card, IconButton, Avatar} from 'react-native-paper';
import { withTheme, TextInput } from 'react-native-paper';
import {Actions} from 'react-native-router-flux'
import Animation from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import anim from '../../../assets/animation-w800-h600.json';
import {auth} from '../../../config/config'

function Welcome(props) {
  const { colors } = props.theme;
  const {fonts} = props.theme

  
  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log("sdf")
      Actions.main()
    } else {
      // No user is signed in.
      console.log("sdssf")
    } 
  });
    
    return (
        <View  style={styles.container}>
        <Headline style={{textAlign: 'center', color: '#ffffff', paddingTop: 40, fontFamily: fonts.welcomePage, fontSize: 50 }}>SIMERA</Headline>
        <Headline style={{textAlign: 'center', color: '#ffffff', paddingTop: 40, fontFamily: fonts.welcomePage, fontSize: 40 }}>Built for your team.</Headline>
        <View>
          <Animation
            ref={animation => {
              this.animation = animation;
              this.animation.play();
            }}
            style={{
              width: 1000,
              height: 250
            }}
            loop={true}
            source={anim}
          />
          <Button style={{ color: colors.text, borderColor: colors.background, borderWidth:2}} mode="contained" onPress={() => Actions.login()}>
            Log in
        </Button>
        <Button style={{marginTop: 30, color: colors.text, borderColor: colors.background, borderWidth:2}} mode="contained" onPress={() => Actions.signup()}>
            Sign up
        </Button>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#16a085',
      alignItems: 'center',
      justifyContent: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff'
      }
  
  });



  export default withTheme(Welcome);