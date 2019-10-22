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
import RosterMemberCard from './RosterMemberCard'


function Roster(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const roleEnum = {
        1: "Player",
        2: "Coach",
        3: "Manager",
        4: "Fan"
    }
    const [open, setOpen] = React.useState(false)
    const [currEmail, setCurrEmail] = React.useState("")
    const [currPhone, setCurrPhone] = React.useState("")
    const [value, loading, error] = useCollection(
        firestore.collection('users').doc(auth.currentUser.uid),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        })
    const [usersValue, usersLoading, usersError] = useCollection(
        firestore.collection('users').where("role", "<", 3),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })    

    if (loading || usersLoading) {
        
        return (
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
              <ActivityIndicator animating={true} color={colors.primary} />
            </View>
          )
    }

    if (value && usersValue) {
        if (value.data().teams) {
            return (  
                <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                        <Portal>
                            <Dialog
                              visible={open}
                              onDismiss={() => setOpen(false)}>
                              <Dialog.Title>Contact</Dialog.Title>
                              <Dialog.Content>
                                <Paragraph>{"Email: " + currEmail}</Paragraph>
                                <Paragraph>{"Phone: " + currPhone}</Paragraph>
                              </Dialog.Content>
                              <Dialog.Actions>
                                <Button onPress={() => setOpen(false)}>Done</Button>
                              </Dialog.Actions>
                            </Dialog>
                          </Portal> 
                    <ScrollView contentContainerStyle={styles.view}>
                        
                        {
                            usersValue.docs.map(member => {
                                console.log(member.data())
                                if (member.data().teams) {
                                    if (member.data().teams.includes(value.data().teams[0])) {
                                        return (
                                        <RosterMemberCard subheading={member.data().firstName + " " + member.data().lastName + " — " + roleEnum[member.data().role]} action={() => {
                                            setCurrEmail(member.data().email)
                                            setCurrPhone(member.data().phone)
                                            setOpen(true)
                                        }} ></RosterMemberCard>
                                        )
                                    }
                                }
                            })
                        }
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={{backgroundColor:'#FFFFFF', flex:1}}>
                <ScrollView contentContainerStyle={{alignItems: 'center', marginTop:0}}>
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
      marginTop: 0
    }
  });

  export default withTheme(Roster);