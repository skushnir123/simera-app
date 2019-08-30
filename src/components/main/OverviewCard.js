import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView} from 'react-native';
import { Button ,Text, Headline, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import anim from '../../../assets/animation-w1920-h1920.json';
import scheduleAnim from '../../../assets/animation-w240-h240.json';
import statsAnim from '../../../assets/3046-me-at-office.json';
import Animation from 'lottie-react-native';



function OverviewCard(props) {
    const animationSource = props.animationSource
    const action = props.action
    return (
        <View 
          style={{
            backgroundColor: '#FFFFFF',
            paddingTop:40,
            alignItems: 'center',
            borderColor: '#2c3e50',
            borderWidth: 13,
            borderTopColor: '#FFFFFF'
          }}>
            <Headline style={{padding: 5}}>{props.headlineText}</Headline>
            <Animation
            ref={animation => {
            this.animation = animation;
            if (this.animation) {
            this.animation.play();
            }
            }}
            style={{
            width: 400,
            height: 400,
            marginTop: -1
            }}
            loop={true}
            source={animationSource}
        />
        <Subheading style={{paddingLeft: 10, marginTop: -40, paddingBottom:15}}>{props.subheading}</Subheading>
        <Button contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={action}>
            {props.buttonText}
        </Button>
        <View style={{height:30}}></View>
      </View>
    )
}

const styles = StyleSheet.create({
    view: {
      
    },
  });


export default withTheme(OverviewCard);