import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet} from 'react-native';
import { Headline} from 'react-native-paper';
import { withTheme, TextInput } from 'react-native-paper';
import {Actions} from 'react-native-router-flux'
import Animation from 'lottie-react-native';
import Loader from '../reusable/Loader'

function SignupLoader(props) {
  const { colors } = props.theme;
  const {fonts} = props.theme
  setTimeout(function(){Actions.main() } , 3700);

    return (
        <View  style={styles.container}>
        <Loader headerText={"Creating User..."}></Loader>
      </View>
    );
  }  

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center'
    },
  
  });



  export default withTheme(SignupLoader);