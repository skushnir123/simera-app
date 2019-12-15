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
import StatCard from './StatCard'



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

    
    const [eventsValue, eventsLoading, eventsError] = useCollection( 
        firestore.collection('events').orderBy("date"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })

    



    if (loading  || eventsLoading) {
        return (  
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
              <ActivityIndicator animating={true} color={colors.primary} />
            </View>  
          )
    }
    
    if (value.data().teams) {
        return (
            <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                 <ScrollView contentContainerStyle={styles.view}>
                    {
                        eventsValue.docs.map(event =>
                            {
                                console.log(event.teamId)
                                if (event.data().teamId===value.data().teams[0]) {
                                    
                                    if (event.data().eventType===1) {
                                        const dateString = new Date(event.data().date.seconds*1000).toLocaleDateString()
                                        const dayOfWeek = new Date(event.data().date.seconds*1000).getDay()
                                        const dayOfMonth = new Date(event.data().date.seconds*1000).getDate()
                                        const time = new Date(event.data().date.seconds*1000).toLocaleTimeString()
                                        return (
                                            <StatCard key={event.id} gameTime={event.data().date.seconds*1000} time={time} headlineText={"at " + event.data().opponent} dayOfMonth={dayOfMonth} dayOfWeek={dayOfWeek}  score={event.data().score} scoreEntered={event.data().score===[0,0] ? true : false} subheading={event.data().homeAway===1? ("" + dateString) : "" + dateString} action={() => {
                                                console.log(event.id)
                                                console.log(event.teamId)
                                                Actions.push(sceneKey="individual_stats" , props={eventId: event.id, teamId: event.data().teamId})
                                            }} buttonText="Details/Availability"></StatCard>
                                          )

                                    }
                                }
                            }
                        )
                    }


                 </ScrollView>
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


const styles = StyleSheet.create({
    view: {
      backgroundColor: "#ecf0f1",
      alignItems: 'center',
      marginTop: 10
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0
    }
  });



export default withTheme(Stats);