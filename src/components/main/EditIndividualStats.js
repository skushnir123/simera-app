import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView} from 'react-native';
import { Button ,Text,Chip, TextInput, Banner, DataTable, Headline, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import anim from '../../../assets/animation-w1920-h1920.json';
import scheduleAnim from '../../../assets/animation-w240-h240.json';
import statsAnim from '../../../assets/3046-me-at-office.json';
import Animation from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';
import { EventType } from 'expo/build/Updates/Updates';



function EditIndividualStats(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [text, setText] = React.useState("")
    const trackingStatsTable = props.trackingAverages
    const topLeaders = props.tops
    const [helperMessageVisible, setHelperMessageVisible] = React.useState(true)
    const [teamsValue, teamsLoading, teamsError] = useCollection( 
        firestore.collection('teams').doc(props.teamId),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })
    const [eventsValue, eventsLoading, eventsError] = useCollection( 
        firestore.collection('events').where("teamId", "==", props.teamId),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })

    if (teamsLoading || eventsLoading) {
        return (  
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
            <ActivityIndicator animating={true} color={colors.primary} />
            </View>
        )
    }

    

    return (
        <ScrollView style={{backgroundColor: "#FFFFFF"}}>
            <Banner
                style={{backgroundColor: '#ecf0f1'}}
                visible={helperMessageVisible}
                actions={[
                {
                    label: 'Got It',
                    onPress: () => setHelperMessageVisible(false),
                },
                ]}
            >
            {"All stats are saved on input"} 
        </Banner>
            {
                props.stats.map((statName, index) => {
                    return (
                        <TextInput
                            keyboardType={"number-pad"}
                            style={{backgroundColor: "#FFFFFF"}}
                            label={statName}
                            
                            onChangeText={text => 
                            {
                                
                                if (teamsValue.data().tops) { 
                                    const teamRef = firestore.collection("teams").doc(props.teamId);
                                    const eventRef = firestore.collection("events").doc(props.eventId);
                                    eventRef.get().then(function(doc) {
                                    var localGameStats = doc.data().gameStats
                                    localGameStats[props.userId][index] = parseInt(text, 10)
                                    eventRef.update({
                                        gameStats: localGameStats
                                    }).then(function() {
                                        
                                        Object.keys(trackingStatsTable).forEach(player => {
                                            Object.values(trackingStatsTable[player]).forEach((stat, indexOfStat) => {
                                                trackingStatsTable[player][indexOfStat] = 0
                                            })
                                        })
                                        
                                        Object.keys(topLeaders).forEach(leader => {
                                                topLeaders[leader] = 0
                                        })
                                        var counter = 0
                                        var updatedGameStats = localGameStats
                                        eventsValue.docs.map(event => {
                                            if (event.data().eventType==1) {
                                                counter = counter + 1
                                                Object.keys(event.data().gameStats).map(player => {
                                                    Object.values(trackingStatsTable[player]).forEach((stat, index) => {
                                                        trackingStatsTable[player][index] = stat + updatedGameStats[player][index]
                                                    })
                                                })
                                            }
                                        })
                                        Object.keys(trackingStatsTable).forEach((player, index) => {
                                            Object.values(trackingStatsTable[player]).forEach((stat, indexs) => {
                                                trackingStatsTable[player][indexs] = trackingStatsTable[player][indexs]/counter
                                                
                                            })

                                        })
                                        var topPlayers = {

                                        }
                                        Object.keys(trackingStatsTable).forEach((player, index) => {
                                            Object.values(trackingStatsTable[player]).forEach((stat, indexs) => {
                                                if (topLeaders[indexs] < stat) {
                                                    topLeaders[indexs] = stat
                                                    topPlayers[indexs] = [player,parseInt(stat, 10) ]
                                                } else  {
                                                    console.log("showw")
                                                    console.log(stat)
                                                    if (stat < 0 && topLeaders[indexs]===0) {
                                                        
                                                        topPlayers[indexs] = ["A",1 ]
                                                    }
                                                }
                                            })
                                        })
                                        Object.values(topPlayers).forEach((statInfo, index) => {
                                            var userRef = firestore.collection("users").doc(statInfo[0]);
                               
                                            userRef.get().then(function(doc) {
                                                var newInfo = statInfo
                                                
                                                if (statInfo.toString() !== ["A",1].toString()) {
                       
                                                    newInfo[0] = doc.data().firstName + " " + doc.data().lastName
                                                    topPlayers[index] = newInfo
                                                }
                                  
                                                teamRef.update({
                                                    tops: topPlayers
                                                })
                                                // if (index === Object.values(topPlayers).length-1) {
                                       
                                                    
                                                // }
                                                
                                            })
                                            
                                        })
                                        
                                        
                                    })
                                    })

                                } else {
                                    const teamRef = firestore.collection("teams").doc(props.teamId);
                                    const eventRef = firestore.collection("events").doc(props.eventId);
                                    eventRef.get().then(function(doc) {
                                    var localGameStats = doc.data().gameStats
                                    localGameStats[props.userId][index] = parseInt(text, 10)
                                    eventRef.update({
                                        gameStats: localGameStats
                                    }).then(function() {
                                        return teamRef.update({
                                            tops: {
                                                [index]: [props.playerName, parseInt(text, 10) ]
                                            }
                                        })
                                    })

                                    })
                                }
                            
                                
                            }
                            }
                        />
                    )
                })
            }
            <View style={{height: 400}}></View>
        </ScrollView>
    )
}


export default withTheme(EditIndividualStats);