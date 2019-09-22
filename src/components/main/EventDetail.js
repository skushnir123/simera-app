import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView} from 'react-native';
import { Button ,Text, Headline, Chip, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider, TextInput, List, Checkbox} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import {firestore, auth} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';

function EventDetail(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [availability, setAvailability] = React.useState("Loading")
    const [teamAvailabilityVis, setTeamAvailabilityVis] = React.useState(false)
    const [chooseAvailabilityVis, setChooseAvailabilityVis] = React.useState(false)
    var chooseAvailabilityRef = React.createRef()
    const [iconGoing, setIconGoing] = React.useState("add")
    const [iconMaybe, setIconMaybe] = React.useState("add")
    const [iconNotGoing, setIconNotGoing] = React.useState("add")
    const [availabilityEnum, setAvailabilityEnum] = React.useState(2)
    const [eventDetailsExpanded, setEventDetailsExpanded] = React.useState(false)
    const dayOfWeekMap = {
        0: "Sun",
        1: "Mon",
        2: "Tues",
        3: "Wed",
        4: "Thurs",
        5: "Fri",
        6: "Sat"

    }
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

    if (eventsValue && teamsValue) {

        return (
            <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                <ScrollView contentContainerStyle={styles.view}>
                    <Headline style={{padding: 5, alignSelf: 'center'}}>{eventsValue.data().opponent}</Headline>
                    <Paragraph style={{paddingBottom:0, alignSelf: 'center'}}> { eventsValue.data().homeAway===1 ? "Home" + " on " +  new Date(eventsValue.data().date.seconds*1000).toDateString()  : "Away" + " on " +  new Date(eventsValue.data().date.seconds*1000).toDateString()}</Paragraph>
                    <TextInput
                        ref={(ref) => availabilityRef=ref}
                        style={{backgroundColor: "#FFFFFF", height:60}}
                        label='Your Availability'
                        value={ 
                            (eventsValue.data().availability[auth.currentUser.uid]===1)?"Going"
                            : (eventsValue.data().availability[auth.currentUser.uid]===2)?"Maybe"
                            : "Not Going"
                        }
                        onFocus={() => {
                        setChooseAvailabilityVis(true)
                        availabilityRef.blur()}}
                    />
                    <List.Section title="Details">
                        <List.Accordion
                        title="Event Details"
                        left={props => <List.Icon {...props} icon="check" />}
                        expanded={eventDetailsExpanded}
                        onPress={() => setEventDetailsExpanded(!eventDetailsExpanded)}
                        >
                        <List.Item title={"Location: " + eventsValue.data().location} />
                        <List.Item title={"Date/Time: " + new Date(eventsValue.data().date.seconds*1000).toLocaleString() + ""} />
                        <List.Item title={eventsValue.data().notes!=="" ? ("Event Notes: " + eventsValue.data().notes): "Event Notes: No Notes"} />
                        </List.Accordion> 
                    </List.Section>
                    <List.Section title="Team Availability">
                        <List.Accordion
                        title="Team Availability"
                        left={props => <List.Icon {...props} icon="check" />}
                        expanded={teamAvailabilityVis}
                        onPress={() => setTeamAvailabilityVis(!teamAvailabilityVis)}
                        >
                            {
                                console.log(props.memberNames)
                            }
                        {
                            props.memberNames.map(name =>
                                (eventsValue.data().availability[name[0]]===1)? <List.Item title={name[1] + ": " + "Going"}>  </List.Item>
                                : (eventsValue.data().availability[name[0]]===2)? <List.Item title={name[1] + ": " + "Maybe"}>  </List.Item>
                                : <List.Item title={name[1] + ": " + "Not Going"}>  </List.Item>
                            )
                        }
                        </List.Accordion>
                    </List.Section>
                    <Button contentStyle={{fontSize:30}} uppercase={true} mode="outlined" onPress={() => Actions.push(sceneKey="edit_game" , props={opponent:eventsValue.data().opponent, id: eventsValue.id, location: eventsValue.data().location, date: eventsValue.data().date, homeAway: eventsValue.data().homeAway, notes: eventsValue.data().notes})}>
                        Edit
                    </Button>
                    <View style={{height:30}}></View>
                
                </ScrollView>
                <Portal>
                    <Dialog
                        visible={chooseAvailabilityVis}
                        onDismiss={() => setChooseAvailabilityVis(false)}>
                        <Dialog.Title>Availability</Dialog.Title>
                        <Dialog.Content>
                            <Chip icon={iconGoing} onPress={() => {
                                var localAvail = eventsValue.data().availability
                                localAvail[auth.currentUser.uid] = 1
                                firestore.collection("events").doc(props.id).update({
                                    availability: localAvail
                                })
                                    setIconGoing("check")
                                    setIconMaybe("add")
                                    setIconNotGoing("add")
                                 
                            }}
                            >Going
                            </Chip>
                            <Chip style={{marginTop:8}} icon={iconMaybe} onPress={() => {
                                var localAvail = eventsValue.data().availability
                                localAvail[auth.currentUser.uid] = 2
                                firestore.collection("events").doc(props.id).update({
                                    availability: localAvail
                                })
                                    setIconGoing("add")
                                    setIconMaybe("check")
                                    setIconNotGoing("add")
                                
                            }}>Maybe
                            </Chip>
                            <Chip style={{marginTop:8}} icon={iconNotGoing} onPress={() => {
                                var localAvail = eventsValue.data().availability
                                localAvail[auth.currentUser.uid] = 3
                                firestore.collection("events").doc(props.id).update({
                                availability: localAvail
                                })
                                    setIconGoing("add")
                                    setIconMaybe("add")
                                    setIconNotGoing("check")
                                 
                            }}>Not Going
                            </Chip>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setChooseAvailabilityVis(false)}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    view: {
      backgroundColor: "#FFFFFF",
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0
    }
  });

export default withTheme(EventDetail)