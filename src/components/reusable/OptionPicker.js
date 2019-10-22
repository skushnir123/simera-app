import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView, Picker} from 'react-native';
import { Button , Banner,Text, Chip, Headline, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import anim from '../../../assets/animation-w1920-h1920.json';
import scheduleAnim from '../../../assets/animation-w240-h240.json';
import statsAnim from '../../../assets/3046-me-at-office.json';
import Animation from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';



function OptionPicker(props) {

    return (
        <Portal>
            <Dialog
            visible={props.visible} 
            onDismiss={() => props.setVisiblity(false)}>
            <Dialog.Title>{props.title}</Dialog.Title>
            <Dialog.Content>
                {
                    props.options.map((item, counter) => {
                        return (
                            <Chip style={{marginTop:8}} icon={"add"} onPress={() => {
                                props.setVariable(item)
                                props.setVariableEnum(counter)
                                props.setVisiblity(false)
                                if (props.switchingTeams) {
                                    const item = props.ids[counter]
                                    var result = props.ids.filter(word => word !== props.ids[counter]);
                                    result.unshift(item)
                                    firestore.collection("users").doc(auth.currentUser.uid).update({
                                    teams: result
                                    })
                                }

                                }}>{item}
                            </Chip>
                        )
                    })
                }
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => props.setVisiblity(false)}>Done</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal> 
    )
}


export default withTheme(OptionPicker);