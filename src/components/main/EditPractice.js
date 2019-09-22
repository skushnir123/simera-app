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


function EditPractice(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [dateTimePickerVisible, setDateTimePickerVisible] = React.useState(false)
    const [endDateTimePickerVisible, setEndDateTimePickerVisible] = React.useState(false)
    const [chooseHomeAwayVis, setChooseHomeAwayVis] = React.useState(false)
    var chooseDateRef = React.createRef()
    var chooseEndDateRef = React.createRef()
    const [date, setDate] = React.useState(new Date(props.date.seconds*1000).toLocaleString())
    const [endDate, setEndDate] = React.useState(new Date(props.endDate.seconds*1000).toLocaleTimeString())
    const [location, setLocation] = React.useState(props.location)
    const [notes, setNotes] = React.useState(props.notes)
    const [dateFormat, setDateFormat] = React.useState(new Date(props.date.seconds*1000))
    const [endDateFormat, setEndDateFormat] = React.useState(new Date(props.endDate.seconds*1000))
    const [pageLoading, setPageLoading] = React.useState(false)

    {console.log(props.homeAway)}

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
                    value={date}
                    onFocus={() => {
                    setDateTimePickerVisible(true)
                    chooseDateRef.blur()}}
                />
                <DateTimePicker
                    mode={"datetime"}
                    isVisible={dateTimePickerVisible}
                    onConfirm={(date) => {
                        setDate(date.toDateString())
                        setDateTimePickerVisible(false)
                        setDateFormat(date)
                    }}
                    onCancel={() => setDateTimePickerVisible(false)}
                />
                <TextInput
                    ref={(ref) => chooseEndDateRef=ref}
                    style={{backgroundColor: "#FFFFFF"}}
                    label='End Time'
                    value={endDate}
                    onFocus={() => {
                    setEndDateTimePickerVisible(true)
                    chooseEndDateRef.blur()}}
                />
                <DateTimePicker
                    mode={"time"}
                    isVisible={endDateTimePickerVisible}
                    onConfirm={(date) => {
                        setEndDate(date.toLocaleTimeString())
                        setEndDateTimePickerVisible(false)
                        setEndDateFormat(date)
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

                        if ( date !=="") {
                            const eventRef = firestore.collection("events").doc(props.id);
                            return eventRef.update({
                                location: location,
                                date: dateFormat,
                                endDate: endDateFormat,
                                notes: notes
                            }).then(function() {
                                Actions.pop()
                            })
                        } else {
                            setPageLoading(false)
                            
                        } 
                    }}}
                >
                    Edit Practice
                </Button>
            </ScrollView>
        </View>
    )
}

export default withTheme(EditPractice)