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
    const [chooseAgeVis, setChooseAgeVis] = React.useState(false)
    const [chooseGenderVis, setChooseGenderVis] = React.useState(false)
    const [sport, setSport] = React.useState("Basketball")
    const [sportEnum, setSportEnum] = React.useState(1)
    const [ageEnum, setAgeEnum] = React.useState(1)
    const [genderEnum, setGenderEnum] = React.useState(1)
    const [age, setAge] = React.useState("6-10")
    const [gender, setGender] = React.useState("Mixed")
    const [iconMale, setIconMale] = React.useState("add")
    const [iconFemale, setIconFemale] = React.useState("add")
    const [iconMixed, setIconMixed] = React.useState("check")
    const [iconFirstAge, setIconFirstAge] = React.useState("check")
    const [iconSecondAge, setIconSecondAge] = React.useState("add")
    const [iconThirdAge, setIconThirdAge] = React.useState("add")
    const [iconBasketball, setIconBasketball] = React.useState("check")
    const [iconFootball, setIconFootball] = React.useState("add")
    const [iconBaseball, setIconBaseball] = React.useState("add")
    const [iconSoccer, setIconSoccer] = React.useState("add")
    const [iconVolleyball, setIconVolleyball] = React.useState("add")
    const [iconHockey, setIconHockey] = React.useState("add")
    const [helperMessageVisible, setHelperMessageVisible] = React.useState(true)
    const [message, setMessage] = React.useState("The Team Passsword is used by team members to sign in and join the team.")
    const [passwordTaken, setPasswordTaken] = React.useState(false)
    var chooseSportRef = React.createRef()
    var chooseAgeRef = React.createRef()
    var chooseGenderRef = React.createRef()
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
            <TextInput
                ref={(ref) => chooseAgeRef=ref}
                style={{backgroundColor: "#FFFFFF"}}
                label='Age Group'
                value={age}
                onFocus={() => {
                  setChooseAgeVis(true)
                  chooseAgeRef.blur()}}
            />
            <TextInput
                ref={(ref) => chooseGenderRef=ref}
                style={{backgroundColor: "#FFFFFF"}}
                label='Gender'
                value={gender}
                onFocus={() => {
                  setChooseGenderVis(true)
                  chooseGenderRef.blur()}}
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
                  setIconHockey("add")
                  setIconVolleyball("add")
                  setSportEnum(1)
                  setSport("Basketball")
                  }}>Basketball
                </Chip>
              <Chip style={{marginTop:8}} icon={iconFootball} onPress={() => {
                  setIconBasketball("add")
                  setIconFootball("check")
                  setIconBaseball("add")
                  setIconSoccer("add")
                  setIconHockey("add")
                  setIconVolleyball("add")
                  setSportEnum(2)
                  setSport("Football")
              }}>Football</Chip>
              <Chip style={{marginTop:8}} icon={iconBaseball} onPress={() => {
                  setIconBasketball("add")
                  setIconFootball("add")
                  setIconBaseball("check")
                  setIconSoccer("add")
                  setIconHockey("add")
                  setIconVolleyball("add")
                  setSportEnum(3)
                  setSport("Baseball")
              }}>Baseball
              </Chip>
              <Chip style={{marginTop:8}} icon={iconSoccer} onPress={() => {
                  setIconBasketball("add")
                  setIconFootball("add")
                  setIconBaseball("add")
                  setIconHockey("add")
                  setIconVolleyball("add")
                  setIconSoccer("check")
                  setSportEnum(4)
                  setSport("Soccer")
              }}>Soccer
              </Chip>
              <Chip style={{marginTop:8}} icon={iconVolleyball} onPress={() => {
                  setIconBasketball("add")
                  setIconFootball("add")
                  setIconBaseball("add")
                  setIconHockey("add")
                  setIconVolleyball("check")
                  setIconSoccer("add")
                  setSportEnum(5)
                  setSport("Volleyball")
              }}>Volleyball
              </Chip>
              <Chip style={{marginTop:8}} icon={iconHockey} onPress={() => {
                  setIconBasketball("add")
                  setIconFootball("add")
                  setIconBaseball("add")
                  setIconHockey("check")
                  setIconVolleyball("add")
                  setIconSoccer("add")
                  setSportEnum(6)
                  setSport("Hockey")
              }}>Hockey
              </Chip>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setChooseSportVis(false)}>Done</Button>
              </Dialog.Actions>
            </Dialog>
            <Dialog
              visible={chooseAgeVis}
              onDismiss={() => setChooseAgeVis(false)}>
              <Dialog.Title>Choose Age Group</Dialog.Title>
              <Dialog.Content>
                <Chip icon={iconFirstAge} onPress={() => {
                  setIconFirstAge("check")
                  setIconSecondAge("add")
                  setIconThirdAge("add")
                  setAgeEnum(1)
                  setAge("6-10")
                  }}>6-10
                </Chip>
                <Chip style={{marginTop:8}} icon={iconSecondAge} onPress={() => {
                  setIconFirstAge("add")
                  setIconSecondAge("check")
                  setIconThirdAge("add")
                  setAgeEnum(2)
                  setAge("10-14")
                  }}>10-14
                </Chip>
                <Chip style={{marginTop:8}} icon={iconThirdAge} onPress={() => {
                  setIconFirstAge("add")
                  setIconSecondAge("add")
                  setIconThirdAge("check")
                  setAgeEnum(1)
                  setAge("14-18")
                  }}>14-18
                </Chip>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setChooseAgeVis(false)}>Done</Button>
              </Dialog.Actions>
            </Dialog>
            <Dialog
              visible={chooseGenderVis}
              onDismiss={() => setChooseGenderVis(false)}>
              <Dialog.Title>Gender</Dialog.Title>
              <Dialog.Content>
                <Chip icon={iconMale} onPress={() => {
                  setIconMale("check")
                  setIconFemale("add")
                  setIconMixed("add")
                  setGenderEnum(1)
                  setGender("Male")
                  }}>Male
                </Chip>
                <Chip style={{marginTop:8}}  icon={iconFemale} onPress={() => {
                  setIconMale("add")
                  setIconFemale("check")
                  setIconMixed("add")
                  setGenderEnum(2)
                  setGender("Female")
                  }}>Female
                </Chip>
                <Chip style={{marginTop:8}}  icon={iconMixed} onPress={() => {
                  setIconMale("add")
                  setIconFemale("add")
                  setIconMixed("check")
                  setGenderEnum(3)
                  setGender("Mixed")
                  }}>Mixed
                </Chip>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setChooseGenderVis(false)}>Done</Button>
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
                        record: "0-0-0",
                        ageGroup: ageEnum,
                        gender:genderEnum
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