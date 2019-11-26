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




function Stats(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const statEnumToName = {
        1: {
            0: "Points",
            1: "Assists",
            2: "Rebounds",
            3: "Blocks",
            4: "Steals",
            5: "FGM",
            6: "FGA",
            7: "3pt FGM",
            8: "3pt FGA",
        },
        2: {
            0: "Touchdowns",
            1: "Total Yds",
            2: "Sacks",
            3: "Rushing Yds",
            4: "Receiving Yds",
            5: "Interceptions",
            6: "Interceptions Thrown"
        },
        3: {
            0: "Touchdowns",
            1: "Total Yds",
            2: "Sacks",
            3: "Rushing Yds",
            4: "Receiving Yds",
            5: "Interceptions",
        },
        4: {
            0: "Goals",
            1: "Assists",
            2: "Saves"
        },
        5: {
            0: "Goals",
            1: "Assists",
            2: "Saves"
        },
        6: {
            0: "Goals",
            1: "Assists",
            2: "Hits",
            3: "Saves",
            4: "Goals Allowed",
        }
    }


    const [value, loading, error] = useCollection(
        firestore.collection('users').doc(auth.currentUser.uid),
        {  
          snapshotListenOptions: { includeMetadataChanges: true },
        })

    
    const [teamsValue, teamsLoading, teamsError] = useCollection( 
        firestore.collection('teams'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })



    if (loading  || teamsLoading) {
        return (  
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
              <ActivityIndicator animating={true} color={colors.primary} />
            </View>
          )
    }
    
    if (value.data().teams) {
        return (
            <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                {
                        teamsValue.docs.map(team => {
                            {
                                if (team.id === value.data().teams[0]) {
                                    
                                    if (team.data().tops) { 
                                        return (
                                            <ScrollView contentContainerStyle={{marginTop:0}}>
                                                <Button style={{marginTop:0}} uppercase={false} mode="contained" onPress={() => {
                                                  Actions.push(sceneKey="stats_games" , props={id:value.data().teams[0]})
                                                  }}>
                                                  View game by game stats
                                                </Button>
                                                <Headline style={{marginLeft: 14, marginTop:40}}>Stat Leaders Per Game</Headline>
                                                {
                                                    Object.keys(team.data().tops).map((key, index) => {
                                                        console.log(index)
                                                        if (team.data().tops[index][0] == "A") {
                                                            return (
                                                                <View>
                                                                <Title style={{marginLeft: 24, marginTop:10}}>{statEnumToName[team.data().sport][index]}</Title>
                                                                <Subheading style={{marginLeft: 33, marginTop:8}}>{"No Data Input"}</Subheading>
                                                                </View>
                                                            )
                                                        }
                                                        return (
                                                            <View>
                                                                <Title style={{marginLeft: 24, marginTop:10}}>{statEnumToName[team.data().sport][index]}</Title>
                                                                <Subheading style={{marginLeft: 33, marginTop:8}}>{team.data().tops[index][0] + " - " + team.data().tops[index][1]}</Subheading>
                                                            </View>
                                                        )
                                                    })
                                                }
                                                
                                            </ScrollView>
                                            
                                        )
                                    } else {
                                        return (
                                            <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                                            <ScrollView contentContainerStyle={{marginTop:0}}>
                                            <ScrollView contentContainerStyle={{alignItems: 'center', marginTop:10}}>
                                                <Headline>No Stats Added</Headline>
                                    
                                                    <Button style={{marginTop:13}} uppercase={false} mode="outlined" onPress={() => { 
                                                        Actions.push(sceneKey="stats_games" , props={id:value.data().teams[0]})
                                                        }}>
                                                        Add Stats
                                                    </Button>
                                                            </ScrollView>
                                            </ScrollView>
                                            </View>
                                        )
                                    }
                                }
                            }
                        })
                }
            </View>
        )



    } else {
        return (
            <View style={{backgroundColor:'#FFFFFF', flex:1}}>
            <ScrollView contentContainerStyle={{alignItems: 'center', marginTop:48}}>
                <Headline>Haven't joined a team yet...</Headline>
                <Button style={{marginTop:13}} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {
                   Actions.push(sceneKey="create_new_team" , props={role: value.data().role})}}>
                  Create a new team 
                </Button>
            </ScrollView>
            </View>
        )
    }








}



export default withTheme(Stats);