import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView} from 'react-native';
import { Button ,Text, TextInput, Chip, Headline, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import anim from '../../../assets/animation-w1920-h1920.json';
import scheduleAnim from '../../../assets/animation-w240-h240.json';
import statsAnim from '../../../assets/3046-me-at-office.json';
import Animation from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';
import { FAB } from 'react-native-paper';
import OverviewCard from './OverviewCard'
import DateTimePicker from "react-native-modal-datetime-picker";
import TimeWithoutSeconds from '../reusable/TimeWIthoutSeconds'


function CreateNewGame(props) {
    const [opponent, setOpponent] = React.useState("")
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [dateTimePickerVisible, setDateTimePickerVisible] = React.useState(false)
    const [chooseHomeAwayVis, setChooseHomeAwayVis] = React.useState(false)
    var chooseDateRef = React.createRef()
    var chooseHomeWayRef = React.createRef()
    const [date, setDate] = React.useState("")
    const [homeAway, setHomeAway] = React.useState("Home")
    const [homeAwayEnum, setHomeAwayEnum] = React.useState(1)
    const [iconHome, setIconHome] = React.useState("check")
    const [iconAway, setIconAway] = React.useState("add")
    const [location, setLocation] = React.useState("")
    const [notes, setNotes] = React.useState("")
    const [dateFormat, setDateFormat] = React.useState(new Date())
    const [pageLoading, setPageLoading] = React.useState(false)



    if (pageLoading) {
        return (
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
                <ActivityIndicator animating={true} color={colors.primary} />
            </View>
        )
    }

    return (
        <View style={{backgroundColor:'#FFFFFF', flex:1}}>
            <ScrollView contentContainerStyle={{ marginTop:0}}>
                <TextInput
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Opponent'
                    value={opponent}
                    onChangeText={text => setOpponent(text)}
                />
                <TextInput
                    ref={(ref) => chooseDateRef=ref}
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Date/Time'
                    value={TimeWithoutSeconds(date)}
                    onFocus={() => {
                    setDateTimePickerVisible(true)
                    chooseDateRef.blur()}}
                />
                <DateTimePicker
                    mode={"datetime"}
                    isVisible={dateTimePickerVisible}
                    onConfirm={(date) => {
                        setDate(date.toLocaleString())
                        setDateTimePickerVisible(false)
                        setDateFormat(date)
                    }}
                    onCancel={() => setDateTimePickerVisible(false)}
                />
                <TextInput
                    ref={(ref) => chooseHomeWayRef=ref}
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Home/Away'
                    value={homeAway}
                    onFocus={() => {
                    setChooseHomeAwayVis(true)
                    chooseHomeWayRef.blur()}}
                />
                <Portal>
                    <Dialog
                    visible={chooseHomeAwayVis}
                    onDismiss={() => setChooseHomeAwayVis(false)}>
                    <Dialog.Title>Home/Away</Dialog.Title>
                    <Dialog.Content>
                        <Chip icon={iconHome} onPress={() => {
                            setIconHome("check")
                            setIconAway("add")
                            setHomeAwayEnum(1)
                            setHomeAway("Home")
                            }}>Home
                        </Chip>
                        <Chip style={{marginTop:8}} icon={iconAway} onPress={() => {
                        setIconHome("add")
                        setIconAway("check")
                        setHomeAwayEnum(2)
                        setHomeAway("Away")
                        }}>Away</Chip>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setChooseHomeAwayVis(false)}>Done</Button>
                    </Dialog.Actions>
                    </Dialog>
                </Portal>
                <TextInput
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Location'
                    value={location}
                    onChangeText={text => setLocation(text)}
                />
                <TextInput
                    multiline={true}
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Notes'
                    value={notes}
                    onChangeText={text => setNotes(text)}
                />  
                <Button  
                    mode="contained" 
                    onPress={() => {{
                        setPageLoading(true)

                        if (opponent!=="" && date !=="") {
                            const userRef = firestore.collection("users").doc(auth.currentUser.uid);
                            userRef.get().then(function(doc) {
                            var members = {}
                            firestore.collection("teams").doc(doc.data().teams[0]).get().then(function(docTeam) {
                                docTeam.data().members.forEach(function(member) {
                                    members[member] = 2
                                })
                                    firestore.collection("events").add({
                                        opponent: opponent,
                                        teamName: docTeam.data().teamName,
                                        location: location,
                                        date: dateFormat,
                                        notes: notes,
                                        homeAway: homeAwayEnum,
                                        eventType: 1,
                                        gameOver:false,
                                        teamId: doc.data().teams[0],
                                        availability: members,
                                        score: [0,0]
                                        }).then(function() {
                                            Actions.new_event_loader()
                                        })
                            })
                            })
                        } else {
                            setPageLoading(false)
                            console.log("sdf")
                        }
                    }}}
                >
                    Add Game
                </Button>
            </ScrollView>
        </View>
    )
}

export default withTheme(CreateNewGame)