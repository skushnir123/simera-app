import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView} from 'react-native';
import { Button ,Text, Banner, Headline, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import anim from '../../../assets/animation-w1920-h1920.json';
import scheduleAnim from '../../../assets/animation-w240-h240.json';
import statsAnim from '../../../assets/3046-me-at-office.json';
import Animation from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';
import { FAB } from 'react-native-paper';



function SimeraLive(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [eventsValue, eventsLoading, eventsError] = useCollection(
        firestore.collection('events').doc(props.id),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })

    const [teamsValue, teamsLoading, teamsError] = useCollection(
        firestore.collection('teams').doc(props.teamId),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })   


    if (eventsLoading || teamsLoading) {
        return (  
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
            <ActivityIndicator animating={true} color={colors.primary} />
            </View>
        )
    }   


    if (props.id==='FROM_OVERVIEW') {
        return (  
            <View style={{backgroundColor:'#FFFFFF', flex:1}}>
            <ScrollView contentContainerStyle={{alignItems: 'center', marginTop:10}}>
                <Headline>No Current Live Event!</Headline>
            </ScrollView>
            </View>
        )
    }
    

    return (
        <View style={{backgroundColor: "#FFFFFF", flex:1, alignItems:'center'}}>
            <Subheading>{teamsValue.data().teamName}</Subheading>
            <View style={{flexDirection:'row', borderWidth:0, borderColor:'black'}}>
                <Text accessibilityRole='button' style={{color: '#16a085', fontSize:40, borderWidth:0, borderColor:'black'}} onPress={() => {
                    const eventRef = firestore.collection("events").doc(props.id);
                    return eventRef.update({
                        score: [(eventsValue.data().score[0]+1), eventsValue.data().score[1]]
                    })
                }} >+</Text>
                <Text style={{fontSize:40, paddingRight:25, paddingLeft:12, borderWidth:0, borderColor:'black'}}>{eventsValue.data().score[0].toString()}</Text>
                <Text accessibilityRole='button' style={{color: '#16a085', fontSize:40, paddingLeft:0, borderWidth:0, borderColor:'black'}} onPress={() => {
                    const eventRef = firestore.collection("events").doc(props.id);
                    if (eventsValue.data().score[0]!==0) {
                    return eventRef.update({
                        score: [(eventsValue.data().score[0]-1), eventsValue.data().score[1]]
                    })
                    }
                }}>-</Text>
            </View>
            <Subheading style={{marginTop:20}}>{eventsValue.data().opponent}</Subheading>
            <View style={{flexDirection:'row', borderWidth:0, borderColor:'black'}}>
                <Text accessibilityRole='button' style={{color: '#16a085', fontSize:40, borderWidth:0, borderColor:'black'}} onPress={() => {
                    const eventRef = firestore.collection("events").doc(props.id);
                    return eventRef.update({
                        score: [(eventsValue.data().score[0]), eventsValue.data().score[1]+1]
                    })
                }}>+</Text> 
                <Text style={{fontSize:40, paddingRight:25, paddingLeft:12, borderWidth:0, borderColor:'black'}}>{eventsValue.data().score[1].toString()}</Text>
                <Text accessibilityRole='button' style={{color: '#16a085', fontSize:40, paddingLeft:0, borderWidth:0, borderColor:'black'}} onPress={() => {
                    const eventRef = firestore.collection("events").doc(props.id);
                    if (eventsValue.data().score[1]!==0) {
                    return eventRef.update({
                        score: [(eventsValue.data().score[0]), eventsValue.data().score[1]-1]
                    })
                    }
                }} >-</Text>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
  });

  export default withTheme(SimeraLive);