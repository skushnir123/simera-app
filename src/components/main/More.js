import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView, Picker} from 'react-native';
import { Button , Banner,Text, Headline, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import anim from '../../../assets/animation-w1920-h1920.json';
import scheduleAnim from '../../../assets/animation-w240-h240.json';
import statsAnim from '../../../assets/3046-me-at-office.json';
import Animation from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';
import OptionPicker from '../reusable/OptionPicker'

function More(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [showTeamPassword, setShowTeamPassword] = React.useState(false)
    const [helperMessageVisible, setHelperMessageVisible] = React.useState(false)
    const [teamToSwitch, setTeamToSwitch] = React.useState("")
    const [teamSwitchEnum, setTeamSwitchEnum] = React.useState(0)
    const [pageLoading, setPageLoading] = React.useState(false)
    const [switchTeamsVisible, setSwitchTeamsVisible] = React.useState(false)
    const [teams, setTeams] = React.useState([])
    const [teamsIds, setTeamsIds] = React.useState([])
    
    const [value, loading, error] = useCollection(
        firestore.collection('users').doc(auth.currentUser.uid),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        })
    const [teamValue, teamLoading, eventsError] = useCollection(
      firestore.collection('teams'),
      {
          snapshotListenOptions: { includeMetadataChanges: true },
      })    
  
        if (loading || teamLoading || pageLoading) {
          return (
              <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
                <ActivityIndicator animating={true} color={colors.primary} />
              </View>
            )
      }


      function moveElementToFront(arr, elem) {
        var result = arr.filter(word => word !== elem );
        result.unshift(arr)
        return (result)
      }



    return(
        <View style={{backgroundColor:'#FFFFFF', flex:1}}>
        <Banner
                style={{backgroundColor: '#ecf0f1'}}
                visible={helperMessageVisible}
                actions={[
                {
                    label: 'Leave',
                    onPress: () => {
                      setPageLoading(true)
                      const teamId = value.data().teams[0]
                      const userTeams = value.data().teams
                      
                      userTeams.shift()

                      const userRef = firestore.collection("users").doc(auth.currentUser.uid);
                      return userRef.update({  
                        teams: userTeams
                    })
                    .then(function() {
                        if (value.data().teams.length === 1) {
                          const userRef = firestore.collection("users").doc(auth.currentUser.uid);
                            return userRef.set({
                              email: value.data().email, 
                              firstName: value.data().firstName,
                              lastName: value.data().lastName,
                              phone: value.data().phone,
                              role: value.data().role,
                          }).then(function() {
                            const teamRef = firestore.collection("teams").doc(teamId);
                            teamRef.get().then(function(doc) {
                              const teamWithoutCurrentUser = doc.data().members.filter(member => member !== auth.currentUser.uid);
                              return teamRef.update({ 
                                members: teamWithoutCurrentUser
                            }).then(function() {
                              setPageLoading(false)
                              setHelperMessageVisible(false)
                            })
                            }) 
                        })
                        } else {
                          const teamRef = firestore.collection("teams").doc(teamId);
                          teamRef.get().then(function(doc) {
                            const teamWithoutCurrentUser = doc.data().members.filter(member => member !== auth.currentUser.uid);
                            return teamRef.update({
                              members: teamWithoutCurrentUser
                          }).then(function() {
                            setPageLoading(false)
                            setHelperMessageVisible(false)
                          })
                          }) 
                        }
                    })

                    },
                },
                {
                  label: 'Close',
                  onPress: () => setHelperMessageVisible(false),
              },
                ]}
            >
                {"Are you sure you want to leave your current team"} 
          </Banner>
        <ScrollView contentContainerStyle={{ marginTop:0}}>
            <Text accessibilityRole='button' style={{margin:10, color: '#16a085', fontSize:15, fontWeight: "bold"}} onPress={() => {
            setShowTeamPassword(true)
            }}>Show team password</Text>
            <Text accessibilityRole='button' style={{margin:10, color: '#16a085', fontSize:15, fontWeight: "bold"}} onPress={() => {
            Actions.push(sceneKey="profile" , props={email:value.data().email, phone: value.data().phone})
            }}>Edit profile</Text>
            <Text accessibilityRole='button' style={{margin:10,marginTop:29, color: '#16a085', fontSize:15, fontWeight: "bold"}} onPress={() => {
            Actions.create_new_team()}}>Create New Team</Text>
            <Text accessibilityRole='button' style={{margin:10, color: '#16a085', fontSize:15, fontWeight: "bold"}} onPress={() => {
            Actions.join_new_team()}}>Join a New Team</Text>
            <Text accessibilityRole='button' style={{margin:10, color: '#16a085', fontSize:15, fontWeight: "bold"}} onPress={() => {
            setHelperMessageVisible(true)}}>Leave current Team</Text>
            <Text accessibilityRole='button' style={{margin:10, color: '#16a085', fontSize:15, fontWeight: "bold"}} onPress={() => {
            setSwitchTeamsVisible(true)}}>Switch Current Team</Text>
            <Text accessibilityRole='button' style={{margin:10,marginTop:29, color: '#16a085', fontSize:15, fontWeight: "bold"}} onPress={() => {
                auth.signOut().then(function() {
                    Actions.reset("auth")
                  }).catch(function(error) {
                    // An error happened.
                  });
            }}>Log Out</Text>
        </ScrollView>

            {
              teamValue.docs.map((team, index) => {
                if (value.data().teams) {
                  if (value.data().teams.includes(team.id) && !teams.includes(team.data().teamName)) {
                    var localTeams = teams 
                    localTeams.push(team.data().teamName)
                    teamsIds.push(team.id)
                 }
                 if (index===teamValue.docs.length-1) {
                   return (
                    <OptionPicker visible={switchTeamsVisible} setVisiblity={setSwitchTeamsVisible} title={"Switch Current Team"} options={teams} setVariable={setTeamToSwitch} setVariableEnum={setTeamSwitchEnum} switchingTeams={true} ids={teamsIds}></OptionPicker>
                   )
                 }
                }
              })
            }
            

               {teamValue.docs.map((team, index) => {
                 if (value.data().teams) {
                   
                   if (value.data().teams.includes(team.id) && !teams.includes(team.data().teamName)) {
                      var localTeams = teams 
                      localTeams.push(team.data().teamName)
                      teamsIds.push(team.id)
                   }


                 if (team.id===value.data().teams[0]) {
                   
                   return (
                    <Portal>
                            <Dialog
                              visible={showTeamPassword}
                              onDismiss={() => setShowTeamPassword(false)}>
                              <Dialog.Title>Team Password</Dialog.Title>
                              <Dialog.Content>
                                <Paragraph>{team.data().teamPassword}</Paragraph>
                              </Dialog.Content>
                              <Dialog.Actions>
                                <Button onPress={() => setShowTeamPassword(false)}>Done</Button>
                              </Dialog.Actions>
                            </Dialog>
                     </Portal> 
                   )
                 }
                } else {
                  return (
                    <Portal>
                      <Dialog
                        visible={showTeamPassword} 
                        onDismiss={() => setShowTeamPassword(false)}>
                        <Dialog.Title>Team Password</Dialog.Title>
                        <Dialog.Content>
                          <Paragraph>{"No Current Team"}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                          <Button onPress={() => setShowTeamPassword(false)}>Done</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal> 
                  )
                }
               })}

        </View>
    )
}

const styles = StyleSheet.create({
    view: {
      backgroundColor: "#ecf0f1",
      marginTop: 10
    }
  });

  export default withTheme(More);
