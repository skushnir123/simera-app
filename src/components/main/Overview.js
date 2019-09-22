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
import { FAB } from 'react-native-paper';
import OverviewCard from './OverviewCard'
import Constants from 'expo-constants';

function Overview(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);
    const [open, setOpen] = React.useState(false)
    const [openOne, setOpenOne] = React.useState(true)
    const [value, loading, error] = useCollection(
      firestore.collection('users').doc(auth.currentUser.uid),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      })


      if (loading) {
        return (
          <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
            <ActivityIndicator animating={true} color={colors.primary} />
          </View>
        )
      }

      if (value) {
        if (value.data().teams) {
          return (
            <View style={{backgroundColor:'#FFFFFF', flex:1}}>
            <ScrollView contentContainerStyle={styles.view}>
              <Portal>
                <Dialog
                  visible={open}
                  onDismiss={() => setOpen(false)}>
                  <Dialog.Title>Add new team</Dialog.Title>
                  <Dialog.Content>
                    <Button contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpen(false) 
                      Actions.join_new_team()
                      }}>
                      Join a new team
                    </Button>
                    <Button style={{marginTop:13}} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpen(false)
                       Actions.create_new_team()}}>
                      Create a new team
                    </Button>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={() => setOpen(false)}>Done</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal> 
              <OverviewCard borderColor='#FFFFFF' headlineText="Need help keeping track of games?" animationSource={scheduleAnim} subheading="Use our schedule to stay on track!" action={() => Actions.create_new_team()} buttonText="Go to Schedule"></OverviewCard>
              <OverviewCard borderColor='#2c3e50' headlineText="Going for the chip?" animationSource={anim} subheading="Update your fans live with realtime score updates!" action={() => Actions.create_new_team()} buttonText="Go to Realtime"></OverviewCard>
              <OverviewCard borderColor='#2c3e50' headlineText="Stat Geek?" animationSource={statsAnim} subheading="Use our advanced stats to get an edge!" action={() => Actions.create_new_team()} buttonText="Go to Schedule"></OverviewCard>
              <View style={{height: 50}}></View>
            </ScrollView>
            <FAB
              style={styles.fab}
              small
              icon="create"
              onPress={() => setOpen(true)}
            />
            </View>
          )
        } else {
          return (
            <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
            <ScrollView contentContainerStyle={styles.view}>
            <Portal>
                <Dialog
                  visible={openOne}
                  >
                  <Dialog.Title>Add new team</Dialog.Title>
                  <Dialog.Content>
                    <Button contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpenOne(false) 
                      Actions.join_new_team()
                      }}>
                      Join a new team
                    </Button>
                    <Button style={{marginTop:13}} contentStyle={{fontSize:30}} uppercase={false} mode="outlined" onPress={() => {setOpenOne(false)
                       Actions.create_new_team()}}>
                      Create a new team 
                    </Button>
                  </Dialog.Content>
                </Dialog>
              </Portal>
              {

              }
              <OverviewCard first={true} borderColor='#FFFFFF' headlineText="Need help keeping track of games?" animationSource={scheduleAnim} subheading="Use our schedule to stay on track!" action={() => Actions.create_new_team()} buttonText="Go to Schedule"></OverviewCard>
              <OverviewCard first={false} borderColor='#2c3e50' headlineText="Going for the chip?" animationSource={anim} subheading="Update your fans live with realtime score updates!" action={() => Actions.create_new_team()} buttonText="Go to Realtime"></OverviewCard>
              <OverviewCard first={false} borderColor='#2c3e50' headlineText="Stat Geek?" animationSource={statsAnim} subheading="Use our advanced stats to get an edge!" action={() => Actions.create_new_team()} buttonText="Go to Schedule"></OverviewCard>
              <View style={{height: 50}}></View>
            </ScrollView>
            <FAB
              style={styles.fab}
              small
              icon="create"
              onPress={() => setOpenOne(true)}
            />
            </View>
          );
        }
       
     }
    }
  
    const styles = StyleSheet.create({
      view: {
        backgroundColor: "#ecf0f1",
        alignItems: 'center',
        marginTop: 10
      },
      fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
      }
    });
  
    export default withTheme(Overview);