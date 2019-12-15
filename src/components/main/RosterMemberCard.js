import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView} from 'react-native';
import { Button ,Text, Headline, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';


function RosterMemberCard(props) {
    const animationSource = props.animationSource
    const action = props.action
    return (
        <View 
          style={{
            width: 400,
            backgroundColor: '#FFFFFF',
            paddingTop:10,
            alignItems: 'flex-start',
            borderColor: '#2c3e50',
            borderWidth: 5,
            borderTopColor: '#FFFFFF'
          }}>
        <Title style={{paddingBottom:15, paddingLeft:20, fontSize:15}}>{props.subheading}</Title>
        <Button style={{fontSize:8, marginLeft:20}} uppercase={false} mode="outlined" onPress={action}>
            Contact
        </Button>
        <View style={{height:10}}></View>
      </View>
    )
}

const styles = StyleSheet.create({
    view: {
      
    },
  });


export default withTheme(RosterMemberCard);