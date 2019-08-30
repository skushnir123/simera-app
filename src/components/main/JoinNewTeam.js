import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen} from 'react-native';
import { Button ,Text, Headline, Title, Card, IconButton, Avatar, Banner, TextInput, Portal, Dialog, Paragraph, Chip} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {Actions} from 'react-native-router-flux'
import {auth, firestore} from '../../../config/config'

function JoinNewTeam(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [teamPassword, setTeamPassword] = React.useState("")
    const [helperMessageVisible, setHelperMessageVisible] = React.useState(false)
    const [message, setMessage] = React.useState("Please input a password")
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
                secureTextEntry
                style={{backgroundColor: "#FFFFFF"}}
                label='Team Password'
                value={teamPassword}
                onChangeText={text => setTeamPassword(text)}
            />
          <Button  
            mode="contained" 
            onPress={() => {{
              const userRef = firestore.collection('users').doc(auth.currentUser.uid)
              firestore.collection("teams").where("teamPassword", "==", teamPassword)
              .get()
              .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      
                      if (!doc.data().members.includes(auth.currentUser.uid)) {
                      var localMembers = doc.data().members
                      localMembers.push(auth.currentUser.uid)
                      
                      return firestore.collection("teams").doc(doc.id).update({
                        members: localMembers
                    }).then(function() {
                        userRef.get().then(function(doc) {
                            if (doc.exists) {
                              if (doc.data().teams) {
                                var localTeams = doc.data().teams
                                localTeams.unshift(doc.id)
                                return userRef.update({
                                  teams: localTeams
                                }).then(function() {
                                  Actions.create_new_team_loader()
                                })
                              } else {
                                return userRef.update({
                                  teams: [doc.id]
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
                       setMessage("Already joined this team.")
                   }
                  });

                  if (querySnapshot.empty) {
                    setHelperMessageVisible(true)
                    setMessage("No teams found with this password.")
                  }
              })
              .catch(function(error) {
                  console.log("Error getting documents: ", error);
              });
            }}}
          >
            Join Team
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
  
  
  
    export default withTheme(JoinNewTeam);