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
import {auth, firestore} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';
import GameStatCard from './GameStatCard'

function GameStats(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme

    var eventsRef = firestore.collection("events").orderBy("date");
    eventsRef.where("teamId", "==", props.id)

    const [eventsValue, eventsLoading, eventsError] = useCollection(
        eventsRef,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }) 

    if (eventsLoading || eventsError) {
        return (  
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
            <ActivityIndicator animating={true} color={colors.primary} />
            </View>
        )
        }

    return (
        <View style={{backgroundColor:'#FFFFFF', flex:1}}>
            <ScrollView contentContainerStyle={styles.view}>
                
                {
                    eventsValue.docs.map(event => {
                        {
                            const milliSecondsOfDate = event.data().date.seconds * 1000
                            if (new Date() > (new Date(milliSecondsOfDate + 3600*3*1000))) {
                                return (
                                    <GameStatCard subheading={"VS. " + event.data().opponent + " on " + new Date(milliSecondsOfDate).toDateString()} action={() => {
                                        Actions.push(sceneKey="individual_stats" , props={eventId: event.id, teamId: props.id})
                                    }} ></GameStatCard>
                                )
                            }
                        }
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
      backgroundColor: "#ecf0f1",
      alignItems: 'center',
      marginTop: 0
    }
  });


export default withTheme(GameStats);