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
            width: 440,
            backgroundColor: '#FFFFFF',
            paddingTop:6,
            alignItems: 'center',
            borderColor: '#2c3e50',
            borderWidth: 13,
            borderTopColor: '#FFFFFF'
          }}>
            <Title allowFontScaling={false} style={{padding: 5, marginRight: 10, marginLeft:10, fontSize: 16}}>{props.headlineText}</Title>
            <Animation
            ref={animation => {
            this.animation = animation;
            if (this.animation) {
            this.animation.play();
            }
            }}
            style={{
            width: 200,
            height: 200,
            marginTop: -1,
            }}
            loop={true}
            source={animationSource}
        />
        <Subheading allowFontScaling={false} style={{paddingLeft: 10, marginTop: -10, paddingBottom:15, fontSize: 14}}>{props.subheading}</Subheading>
        <Button allowFontScaling={false} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={action}>
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