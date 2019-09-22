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


function EditGameScreen(props) {
    const [opponent, setOpponent] = React.useState(props.opponent)
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [dateTimePickerVisible, setDateTimePickerVisible] = React.useState(false)
    const [chooseHomeAwayVis, setChooseHomeAwayVis] = React.useState(false)
    var chooseDateRef = React.createRef()
    var chooseHomeWayRef = React.createRef()
    const [date, setDate] = React.useState(new Date(props.date.seconds*1000).toLocaleString())
    const [homeAway, setHomeAway] = React.useState(props.homeAway===1 ? "Home" : "Away")
    const [homeAwayEnum, setHomeAwayEnum] = React.useState(props.homeAway)
    const [iconHome, setIconHome] = React.useState(props.homeAway===1 ? "check" : "add")
    const [iconAway, setIconAway] = React.useState(props.homeAway===1 ? "add" : "check")
    const [location, setLocation] = React.useState(props.location)
    const [notes, setNotes] = React.useState(props.notes)
    const [dateFormat, setDateFormat] = React.useState(new Date(props.date.seconds*1000))
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
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Opponent'
                    value={opponent}
                    onChangeText={text => setOpponent(text)}
                />
                <TextInput
                    ref={(ref) => chooseDateRef=ref}
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Date/Time'
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
                            const eventRef = firestore.collection("events").doc(props.id);
                            return eventRef.update({
                                opponent: opponent,
                                location: location,
                                date: dateFormat,
                                notes: notes,
                                homeAway: homeAwayEnum,
                            }).then(function() {
                                Actions.pop()
                            })
                        } else {
                            setPageLoading(false)
                            
                        }
                    }}}
                >
                    Edit Game
                </Button>
            </ScrollView>
        </View>
    )
}

export default withTheme(EditGameScreen)