import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView} from 'react-native';
import { Button ,Text,Chip, Banner, DataTable, Headline, Subheading,ActivityIndicator, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import anim from '../../../assets/animation-w1920-h1920.json';
import scheduleAnim from '../../../assets/animation-w240-h240.json';
import statsAnim from '../../../assets/3046-me-at-office.json';
import Animation from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';




function IndividualGameStats(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [page, setPage] = React.useState(1)
    const [helperMessageVisible, setHelperMessageVisible] = React.useState(true)
    const [editPlayerVisible, setEditPlayerVisible] = React.useState(false)
    const [fullPlayerStatsVisible, setFullPlayerStatsVisible] = React.useState(false)
    const [icon, setIcon] = React.useState("add")
    const [currPlayerName, setCurrPlayerName] = React.useState("")
    const [currPlayerStats, setCurrPlayerStats] = React.useState([])
    const [usersValue, usersLoading, usersError] = useCollection( 
        firestore.collection('users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })
    const [teamsValue, teamsLoading, teamsError] = useCollection( 
        firestore.collection('teams').doc(props.teamId),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })
    const [eventsValue, eventsLoading, eventsError] = useCollection( 
        firestore.collection('events').doc(props.eventId),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })

    var zerosSportStats = {
        1: ({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0 , 8:0}),
        2: ({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}),
        3: ({0:0, 1:0, 2:0, 3:0, 4:0, 5:0}),
        4: ({0:0, 1:0, 2:0}),
        5: ({0:0, 1:0, 2:0}),
        6: ({0:0, 1:0, 2:0, 3:0, 4:0}),
    }

    var zerosSportStatsSecond = {
        1: ({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0 , 8:0}),
        2: ({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}),
        3: ({0:0, 1:0, 2:0, 3:0, 4:0, 5:0}),
        4: ({0:0, 1:0, 2:0}),
        5: ({0:0, 1:0, 2:0}),
        6: ({0:0, 1:0, 2:0, 3:0, 4:0}),
    }

    const numberSportStats = {
        1: (["Points", "Assists", "Rebounds", "Blocks", "Steals", "FGM", "FGA", "3pt FGm" , "3pt FGA"]),
        2: (["Touchdowns", "Total Yds", "Sacks","Rushing Yds", "Receiving Yds" , "Interceptions", "Interceptions Thrown"]),
        3: ([ "Homeruns", "RBIs","Runs","Hits", "At Bats", "Strikeouts Pitched"]),
        4: (["Goals", "Assists", "Saves"]),
        5: (["Kills", "Aces", "Service Errors"]),
        6: (["Goals, Assists", "Hits", "Saves", "Goals Allowed"])
    }

    const sportsStats = {
        1:
            (
                <DataTable.Header>
                    <DataTable.Title>Player</DataTable.Title>
                    <DataTable.Title numeric>Points</DataTable.Title>
                    <DataTable.Title numeric>Assists</DataTable.Title>
                    <DataTable.Title numeric>Rebounds</DataTable.Title>


                </DataTable.Header>
            ),
        2:
            (
                <DataTable.Header>
                    <DataTable.Title>Player</DataTable.Title>
                    <DataTable.Title numeric>Touchdowns</DataTable.Title>
                    <DataTable.Title numeric>Total Yds</DataTable.Title>
                    <DataTable.Title numeric>Sacks</DataTable.Title>


                </DataTable.Header>
            )
            ,
        3:
            (
                <DataTable.Header>
                    <DataTable.Title>Player</DataTable.Title>
                    <DataTable.Title numeric>Hits</DataTable.Title>
                    <DataTable.Title numeric>Homeruns</DataTable.Title>
                    <DataTable.Title numeric>RBIs</DataTable.Title>


                </DataTable.Header>
            )
            ,
        4:
            (
                <DataTable.Header>
                    <DataTable.Title>Player</DataTable.Title>
                    <DataTable.Title numeric>Goals</DataTable.Title>
                    <DataTable.Title numeric>Assists</DataTable.Title>
                    <DataTable.Title numeric>Saves</DataTable.Title>


                </DataTable.Header>
            )
        ,
        5:
            (
                <DataTable.Header>
                    <DataTable.Title>Player</DataTable.Title>
                    <DataTable.Title numeric>Kills</DataTable.Title>
                    <DataTable.Title numeric>Aces</DataTable.Title>
                    <DataTable.Title numeric>Service Errors</DataTable.Title>


                </DataTable.Header>
            )
        ,
        6:
            (
                <DataTable.Header>
                    <DataTable.Title>Player</DataTable.Title>
                    <DataTable.Title numeric>Goals</DataTable.Title>
                    <DataTable.Title numeric>Assists</DataTable.Title>
                    <DataTable.Title numeric>Hits</DataTable.Title>


                </DataTable.Header>
            )
        
        
    }


    


    if (teamsLoading || eventsLoading || usersLoading) {
        return (  
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
            <ActivityIndicator animating={true} color={colors.primary} />
            </View>
        )
    }



    return (
       <View style={{backgroundColor:'#FFFFFF', flex:1}}>
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
            {"Tap on player to view their full stats"} 
        </Banner>
        <Portal>
            <Dialog
            visible={editPlayerVisible}
            onDismiss={() => setEditPlayerVisible(false)}>
            <Dialog.Title>Choose player to edit</Dialog.Title>
            <Dialog.Content>
                {
                    teamsValue.data().members.map(player =>
                        <View>
                        {
                            usersValue.docs.map(user => {
                                if (user.id === player) {
                                    return (
                                        <Chip style={{marginTop:8}} icon={icon} onPress={() => {
                                            setEditPlayerVisible(false)
                                            var playerStatsTable = {}
                                            teamsValue.data().members.forEach((member, index) => {
                                                playerStatsTable[member] = zerosSportStats[teamsValue.data().sport]
                                                if (index == teamsValue.data().members.length-1) {
                                                    Actions.push(sceneKey="edit_individual_stats" , props={stats:numberSportStats[teamsValue.data().sport], trackingAverages: playerStatsTable , tops: zerosSportStatsSecond[teamsValue.data().sport], eventId: props.eventId, userId: user.id, teamId: props.teamId, playerName:(user.data().firstName + " " + user.data().lastName)})
                                                } 
                                            })
                                            
                                            }}>{user.data().firstName + " " + user.data().lastName}
                                        </Chip>
                                    )
                                }
                            })
                        }
                        </View>
                    )
                }
                
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => setEditPlayerVisible(false)}>Done</Button>
            </Dialog.Actions>
            </Dialog> 
            <Dialog
            visible={fullPlayerStatsVisible}
            onDismiss={() => setFullPlayerStatsVisible(false)}>
            <Dialog.Title>{currPlayerName}</Dialog.Title>
            <Dialog.Content>
                {
                    currPlayerStats.map((stat, index) => {
                        if (stat === -1) {
                            return (
                                <Paragraph>{numberSportStats[teamsValue.data().sport][index] + ": N/A"}</Paragraph>
                            )
                        }
                        return (
                            <Paragraph>{numberSportStats[teamsValue.data().sport][index] + ": " + stat}</Paragraph>
                        )
                    })
                }
                
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => setFullPlayerStatsVisible(false)}>Done</Button>
            </Dialog.Actions>
            </Dialog> 
        </Portal>


       <Button style={{marginTop:0}} uppercase={false} mode="contained" onPress={() => {
           setEditPlayerVisible(true)
        }}>
            Edit Player Stats
       </Button>
       <DataTable style={{backgroundColor:'#FFFFFF', flex:1}} >
        {sportsStats[teamsValue.data().sport]}

        
        {
            teamsValue.data().members.map(player =>
                <DataTable.Row onPress={() =>
                    {
                        usersValue.docs.map(user => {
                            if (user.id === player) {
                                setCurrPlayerName(user.data().firstName)
                                setCurrPlayerStats(Object.values(eventsValue.data().gameStats[player]))
                                setFullPlayerStatsVisible(true)
                            }
                        })
                    }
                }>
                    {
                        usersValue.docs.map(user => {
                            if (user.id === player) {
                                return (
                                    <DataTable.Cell>{user.data().firstName}</DataTable.Cell>
                                )
                            }
                        })
                    }
                    
                    {
                        
                        Object.values(eventsValue.data().gameStats[player]).map((stat, index) => {
                            if (index <3) {
                                if (stat===-1) {
                                    return(<DataTable.Cell numeric>N/A</DataTable.Cell>)
                                }
                                return (
                                    <DataTable.Cell numeric>{stat}</DataTable.Cell>
                                )
                            }
                            
                        })  
                    }
                    
                </DataTable.Row>
                )
        }
        


        <DataTable.Pagination
          page={page}
          numberOfPages={1}
          onPageChange={(page) => { setPage(page) }}
          label=""
        />
      </DataTable>
      </View>
        
    )
}

export default withTheme(IndividualGameStats);