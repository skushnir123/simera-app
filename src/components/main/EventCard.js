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
    const {fonts} = props.theme
    const animationSource = props.animationSource
    const action = props.action
    return (
        <View 
          style={{
            width: 400,
            backgroundColor: '#FFFFFF', 
            paddingTop:0,
            alignItems: 'center',
            borderColor: '#2c3e50',
            borderWidth: 5,
            borderTopColor: '#FFFFFF'
          }}>
            <Headline style={{padding: 5}}>{props.headlineText}</Headline>
            {
              props.score ? (
              new Date() < props.gameTime ?
              (<Subheading style={{paddingBottom:15, fontFamily: fonts.winLoss, color: "#27ae60", height: 38, fontSize: 20}}>{props.subheading}</Subheading>) :
              new Date() > props.gameTime && (new Date() < (props.gameTime + (3600*3*1000))) ?
              (<Button contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={action}>Enter Score</Button>) :
              (JSON.stringify(props.score) === JSON.stringify([0,0])) ?
              (<Button contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={action}>Enter Score</Button>) :
              (<Headline style={{paddingBottom: 5, fontFamily: fonts.winLoss, color: "#27ae60"}}>{props.score[0] > props.score[1] ? ("WIN") : props.score[0] === props.score[1] ? "TIE" : "LOSS"}</Headline>) 
              ): 
              (<Subheading style={{paddingBottom:15, fontFamily: fonts.winLoss, color: "#27ae60", height: 38, fontSize: 20}}>{props.subheading}</Subheading>)
            }

            {((new Date() > (new Date(props.gameTime+(3600*3*1000)))) && (JSON.stringify(props.score) === JSON.stringify([0,0]))) || new Date() > props.gameTime && (new Date() < (props.gameTime + (3600*3*1000)))  ?
            (<View></View>):
            <Button contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={action}>
                {props.buttonText}
            </Button>
            }
        <View style={{height:30}}></View>
      </View>
    )
}

const styles = StyleSheet.create({
    view: {
      
    },
  });


export default withTheme(OverviewCard);