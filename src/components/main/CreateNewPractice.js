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

function CreateNewPractice(props) {
    const [opponent, setOpponent] = React.useState("")
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [dateTimePickerVisible, setDateTimePickerVisible] = React.useState(false)
    const [endDateTimePickerVisible, setEndDateTimePickerVisible] = React.useState(false)
    const [chooseHomeAwayVis, setChooseHomeAwayVis] = React.useState(false)
    var chooseDateRef = React.createRef()
    var chooseEndDateRef = React.createRef()
    const [date, setDate] = React.useState("")
    const [endTime, setEndTime] = React.useState("")
    const [location, setLocation] = React.useState("")
    const [notes, setNotes] = React.useState("")
    const [dateFormat, setDateFormat] = React.useState(new Date())
    const [endTimeFormat, setEndTimeFormat] = React.useState(new Date())
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
                    ref={(ref) => chooseDateRef=ref}
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Beginning Date/Time'
                    value={TimeWithoutSeconds(date)}
                    onFocus={() => {
                    setDateTimePickerVisible(true)
                    chooseDateRef.blur()}}
                />
                <DateTimePicker
                    mode={"datetime"}
                    isVisible={dateTimePickerVisible}
                    onConfirm={(date) => {
                        date.setSeconds(0)
                        setDate(date.toLocaleString())
                        setDateTimePickerVisible(false)
                        setDateFormat(date)
                    }}
                    onCancel={() => setDateTimePickerVisible(false)}
                />
                <TextInput
                    ref={(ref) => chooseEndDateRef=ref}
                    style={{backgroundColor: "#FFFFFF"}}
                    label='End Time'
                    value={TimeWithoutSeconds(endTime)}
                    onFocus={() => {
                    setEndDateTimePickerVisible(true)
                    chooseEndDateRef.blur()}}
                />
                <DateTimePicker
                    mode={"time"}
                    isVisible={endDateTimePickerVisible}
                    onConfirm={(date) => {
                        console.log(date.toLocaleTimeString())
                        setEndTime(date.toLocaleTimeString())
                        setEndDateTimePickerVisible(false)
                        setEndTimeFormat(date)
                    }}
                    onCancel={() => setEndDateTimePickerVisible(false)}
                />
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

                        if (opponent!=="a" && date !=="") {
                            const userRef = firestore.collection("users").doc(auth.currentUser.uid);
                            userRef.get().then(function(doc) {
                            var members = {}
                            var endTime = new Date(dateFormat.getFullYear(), dateFormat.getMonth(), dateFormat.getDay, endTimeFormat.getHours(), endTimeFormat.getMinutes(), endTimeFormat.getSeconds(), endTimeFormat.getMilliseconds())
                            firestore.collection("teams").doc(doc.data().teams[0]).get().then(function(docTeam) {
                                docTeam.data().members.forEach(function(member) {
                                    members[member] = 2
                                })
                                    firestore.collection("events").add({
                                        opponent: opponent,
                                        location: location,
                                        date: dateFormat,
                                        endDate: endTimeFormat,
                                        notes: notes,
                                        eventType: 2,
                                        teamId: doc.data().teams[0],
                                        availability: members  
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
                    Add Practice
                </Button>
            </ScrollView>
        </View>
    )
}

export default withTheme(CreateNewPractice)