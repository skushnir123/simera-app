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
import { FAB } from 'react-native-paper';
import EventCard from './EventCard'



function Schedule(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);
    const [open, setOpen] = React.useState(false)
    const [openOne, setOpenOne] = React.useState(true)
    const [teamsLoaded, setTeamsLoaded] = React.useState(false)
    const [events, setEvents] = React.useState([])
    const [teamId, setTeamId] = React.useState("TEAM_ID")
    const [pageLoading, setPageLoading] = React.useState(false)
    const [value, loading, error] = useCollection(
      firestore.collection('users').doc(auth.currentUser.uid),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      })
    const [eventsValue, eventsLoading, eventsError] = useCollection(
        firestore.collection('events'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })
    

    


      if (loading) {
        return (
          <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
            <ActivityIndicator animating={true} color={colors.primary} />
          </View>
        )
      }

      if (pageLoading) {
        return (
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
                <ActivityIndicator animating={true} color={colors.primary} />
            </View>
        )
    }

      if (value) {
          
        if (value.data().teams) {
            if (eventsLoading) {
                return (
                <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
                    <ActivityIndicator animating={true} color={colors.primary} />
                </View> 
                )
            }

            if (eventsValue) {
                const containsEvents = eventsValue.docs.map(event => event.data().teamId===value.data().teams[0]);
                if (containsEvents.includes(true)) {
                    return (
                      <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                          <ScrollView contentContainerStyle={styles.view}>
                          <Portal>
                            <Dialog
                              visible={open}
                              onDismiss={() => setOpen(false)}>
                              <Dialog.Title>Add new Event</Dialog.Title>
                              <Dialog.Content>
                                <Button contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpen(false) 
                                  Actions.add_game()
                                  }}>
                                  Add new game
                                </Button>
                                <Button style={{marginTop:13}} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpen(false)
                                  Actions.add_practice()}}>
                                  Add new practice
                                </Button>
                                <Button style={{marginTop:13}} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpen(false)
                                  Actions.add_event()}}>
                                  Add new general event
                                </Button>
                              </Dialog.Content>
                              <Dialog.Actions>
                                <Button onPress={() => setOpen(false)}>Done</Button>
                              </Dialog.Actions>
                            </Dialog>
                          </Portal> 
                          {
                            eventsValue.docs.map(event =>  
                              {
                                if (event.data().teamId===value.data().teams[0]) {
                                  if (event.data().eventType===1) {
                                    const dateString = new Date(event.data().date.seconds*1000).toLocaleDateString()
                                  return (
                                    <EventCard key={event.id} headlineText={event.data().opponent} subheading={event.data().homeAway===1? ("Home, " + dateString) : "Away, " + dateString} action={() => {
                                      setPageLoading(true)
                                      var teamRef = firestore.collection("teams").doc(value.data().teams[0]);
                                      var memberNames = []
                                      teamRef.get().then(function(doc) {
                                      for (let i = 0; i<doc.data().members.length; i++) {
                                          var memberRef = firestore.collection("users").doc(doc.data().members[i]);
                                           memberRef.get().then(function(memberDoc) {
                                              memberNames.push([memberDoc.id, memberDoc.data().firstName + " " + memberDoc.data().lastName])
                                          }).then(function() {
                                            if (i===doc.data().members.length-1) {
                                              setPageLoading(false)
                                              Actions.push(sceneKey="event_detail" , props={id:event.id, teamId: value.data().teams[0], memberNames: memberNames})
                                            }
                                        })   
                                      }
                                      })
                                    }} buttonText="View"></EventCard>
                                  )
                                  } else if (event.data().eventType===2) {
                                    return (
                                      <EventCard key={event.id} headlineText={"Practice"} subheading={new Date(event.data().date.seconds*1000).toLocaleDateString()} action={() => {
                                        setPageLoading(true) 
                                        var teamRef = firestore.collection("teams").doc(value.data().teams[0]);
                                        var memberNames = []
                                        teamRef.get().then(function(doc) {
                                        for (let i = 0; i<doc.data().members.length; i++) {
                                            var memberRef = firestore.collection("users").doc(doc.data().members[i]);
                                             memberRef.get().then(function(memberDoc) {
                                                memberNames.push([memberDoc.id, memberDoc.data().firstName + " " + memberDoc.data().lastName])
                                            }).then(function() {
                                              if (i===doc.data().members.length-1) {
                                                setPageLoading(false)
                                                Actions.push(sceneKey="practice_detail" , props={id:event.id, teamId: value.data().teams[0], memberNames: memberNames})
                                              }
                                          })   
                                        }
                                        })
                                      }} buttonText="View"></EventCard>
                                    )
                                  } else {

                                  }
                                }
                              }
                              )
                          }
                          </ScrollView>
                          <FAB
                            style={styles.fab}
                            small
                            icon="create"
                            onPress={() => setOpen(true)}
                          />
                      </View>
                    )
                } else {
                    return (
                        <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                        <ScrollView contentContainerStyle={{alignItems: 'center', marginTop:48}}>
                            <Headline>No Events!</Headline>
                            <Button style={{marginTop:13}} uppercase={false} mode="outlined" onPress={() => {setOpenOne(false) 
                            Actions.add_game()
                            }}>
                            Add new game
                            </Button>
                            <Button style={{marginTop:13}} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpenOne(false)
                            Actions.create_practice()}}>
                            Add new practice
                            </Button>
                            <Button style={{marginTop:13}} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpenOne(false)
                            Actions.create_event()}}>
                            Add new general event
                            </Button>
                        </ScrollView>
                        </View>
                    )
                }
            }
            

            
        } else {
            return (
                <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                <ScrollView contentContainerStyle={{alignItems: 'center', marginTop:48}}>
                    <Headline>Haven't joined a team yet...</Headline>
                    <Button style={{marginTop:13}} uppercase={false} mode="outlined" onPress={() => {setOpenOne(false) 
                      Actions.join_new_team()
                      }}>
                      Join a new team
                    </Button>
                    <Button style={{marginTop:13}} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpenOne(false)
                       Actions.create_new_team()}}>
                      Create a new team 
                    </Button>
                </ScrollView>
                </View>
            )
        } 
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
  
    export default withTheme(Schedule);