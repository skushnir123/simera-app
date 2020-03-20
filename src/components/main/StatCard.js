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
import TimeWithoutSeconds from '../reusable/TimeWIthoutSeconds'


function StatCard(props) {
    const {fonts} = props.theme
    const animationSource = props.animationSource
    const action = props.action

    const dayOfWeekNumberToWord = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thurs",
      5: "Fri",
      6: "Sat"
    }


    {
      console.log("sdfs")
    }

    return (
        <View 
          style={{
            width: 407,
            backgroundColor: '#FFFFFF', 
            paddingTop:5,
            alignItems: 'flex-start',
            borderColor: '#2c3e50',
            borderWidth: 5,
            borderTopColor: '#FFFFFF',
            borderLeftColor: '#FFFFFF',
            borderRightColor: '#FFFFFF'

          }}>
            <View style={{flexDirection:'row'}}>
            <View style={{height:68, width:70, backgroundColor:  "#ecf0f1", marginLeft:20, borderRadius:10}}>
            <Title style={{fontSize:20,  color: "#2c3e50", marginLeft:-0, alignSelf:'center', fontWeight: 'bold'}}>{props.dayOfMonth}</Title>
            <Headline allowFontScaling={false} style={{fontSize:17,  color: "#2c3e50", marginLeft:-0, marginTop:-3, alignSelf:'center'}}>{dayOfWeekNumberToWord[props.dayOfWeek]}</Headline>
            </View>
            <View>
        <Title allowFontScaling={false} style={{fontSize:17,  color: "#2c3e50", marginLeft:10, marginTop:-3, alignSelf:'flex-start'}}>{
          props.score[0] > props.score[1] ? (props.score[0]+ " - " + props.score[1] + " W") : (props.score[0]+ " - " + props.score[1] + " L")
        }</Title>
            <Button allowFontScaling={false} contentStyle={{fontSize:17, marginLeft:-5,alignSelf:'flex-start', marginTop:-3}} uppercase={false} mode="text" onPress={action}>
              View/Edit Stats
            </Button>
            </View>
            </View>
            
            <View style={{height:10}} ></View> 
      </View>
    )
}

const styles = StyleSheet.create({
    view: {
      
    },
  });


export default withTheme(StatCard);