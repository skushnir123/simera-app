import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen} from 'react-native';
import { Button ,Text, Headline, Title, Card, IconButton, Avatar, Banner, TextInput, Portal, Dialog, Paragraph, Chip} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {Actions} from 'react-native-router-flux'
import {auth, firestore} from '../../../config/config'

function CreateNewTeam(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [teamName, setTeamName] = React.useState("")
    const [teamPassword, setTeamPassword] = React.useState("")
    const [chooseSportVis, setChooseSportVis] = React.useState(false)
    const [sport, setSport] = React.useState("Basketball")
    const [sportEnum, setSportEnum] = React.useState(1)
    const [iconBasketball, setIconBasketball] = React.useState("check")
    const [iconFootball, setIconFootball] = React.useState("add")
    const [iconBaseball, setIconBaseball] = React.useState("add")
    const [iconSoccer, setIconSoccer] = React.useState("add")
    const [helperMessageVisible, setHelperMessageVisible] = React.useState(true)
    const [message, setMessage] = React.useState("The Team Passsword is used by team members to sign in and join the team.")
    const [passwordTaken, setPasswordTaken] = React.useState(false)
    var chooseSportRef = React.createRef()
      return (
        <View style={styles.view}>
            <Banner
                style={{backgroundColor: '#ecf0f1'}}
                visible={helperMessageVisible}
                actions={[
                {
                    label: 'Got It',
                    onPress: () => setHelperMessageVisible(false),
                },
                ]}
            >
                {message} 
            </Banner>
            <TextInput
                style={{backgroundColor: "#FFFFFF"}}
                label='Team Name'
                value={teamName}
                onChangeText={text => setTeamName(text)}
            />
            <TextInput
                secureTextEntry
                style={{backgroundColor: "#FFFFFF"}}
                label='Team Password'
                value={teamPassword}
                onChangeText={text => setTeamPassword(text)}
            />
            <TextInput
                ref={(ref) => chooseSportRef=ref}
                style={{backgroundColor: "#FFFFFF"}}
                label='Sport'
                value={sport}
                onFocus={() => {
                  setChooseSportVis(true)
                  chooseSportRef.blur()}}
            />
            <Portal>
            <Dialog
              visible={chooseSportVis}
              onDismiss={() => setChooseSportVis(false)}>
              <Dialog.Title>Choose Sport</Dialog.Title>
              <Dialog.Content>
                <Chip icon={iconBasketball} onPress={() => {
                  setIconBasketball("check")
                  setIconFootball("add")
                  setIconBaseball("add")
                  setIconSoccer("add")
                  setSportEnum(1)
                  setSport("Basketball")
                  }}>Basketball
                </Chip>
              <Chip style={{marginTop:8}} icon={iconFootball} onPress={() => {
                  setIconBasketball("add")
                  setIconFootball("check")
                  setIconBaseball("add")
                  setIconSoccer("add")
                  setSportEnum(2)
                  setSport("Football")
              }}>Football</Chip>
              <Chip style={{marginTop:8}} icon={iconBaseball} onPress={() => {
                  setIconBasketball("add")
                  setIconFootball("add")
                  setIconBaseball("check")
                  setIconSoccer("add")
                  setSportEnum(3)
                  setSport("Baseball")
              }}>Baseball
              </Chip>
              <Chip style={{marginTop:8}} icon={iconSoccer} onPress={() => {
                  setIconBasketball("add")
                  setIconFootball("add")
                  setIconBaseball("add")
                  setIconSoccer("check")
                  setSportEnum(4)
                  setSport("Soccer")
              }}>Soccer
              </Chip>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setChooseSportVis(false)}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Button  
            mode="contained" 
            onPress={() => {{
              if (teamName!=="" && teamPassword!=="") {
                firestore.collection("teams").where("teamPassword", "==", teamPassword)
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty) {
                      const userRef = firestore.collection('users').doc(auth.currentUser.uid)
                      firestore.collection("teams").add({
                        teamName: teamName,
                        teamPassword: teamPassword,
                        sport: sportEnum,
                        teamMembers: [auth.currentUser.uid],
                        record: "0-0-0"
                      }).then(function(docRef) {
                        userRef.get().then(function(doc) {
                          if (doc.exists) {
                            
                            if (doc.data().teams) {
                              var localTeams = doc.data().teams
                              localTeams.unshift(docRef.id)
                              return userRef.update({
                                teams: localTeams
                              }).then(function() {
                                Actions.create_new_team_loader()
                              })
                            } else {
                              return userRef.update({
                                teams: [docRef.id]
                              }).then(function() {
                                Actions.create_new_team_loader()
                              })
                            }
                          } else {
                              // doc.data() will be undefined in this case
                              console.log("No such document!");
                          }
                      }).catch(function(error) {
                          console.log("Error getting document:", error);
                      });
                      })
                    } else {
                      setHelperMessageVisible(true)
                      setMessage("The Password you chose is not available. Please choose a new team password.")
                    }
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
              } else {
                setHelperMessageVisible(true)
                setMessage("You must enter a team name and password.")
              }
            }}}
          >
            Create Team
          </Button>
        </View>
      );
    }
   
    const styles = StyleSheet.create({
      view: {
        backgroundColor: "#FFFFFF",
        flex:1,
        alignItems: 'stretch',
      },
    
    });
  
  
  
    export default withTheme(CreateNewTeam);