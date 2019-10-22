import React, {Component} from 'react'
import {View} from 'react-native'
import { StyleSheet, Screen, ScrollView} from 'react-native';
import { Button ,Text, Headline, Subheading,ActivityIndicator, TextInput, Portal, Dialog, Title, Paragraph, Divider} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import anim from '../../../assets/animation-w1920-h1920.json';
import scheduleAnim from '../../../assets/animation-w240-h240.json';
import statsAnim from '../../../assets/3046-me-at-office.json';
import Animation from 'lottie-react-native';
import {auth, firestore} from '../../../config/config'
import { useCollection } from 'react-firebase-hooks/firestore';


function Profile(props) {
    const { colors } = props.theme;
    const {fonts} = props.theme
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState(props.email)
    const [phone, setPhone] = React.useState(props.phone)


    if (loading) {
        return (
            <View style={{backgroundColor: "#FFFFFF", justifyContent: "center", flex:1}}>
              <ActivityIndicator animating={true} color={colors.primary} />
            </View>
          )
    }
       

        return(
            <View style={styles.view}>
                <TextInput
                    style={{backgroundColor: "#FFFFFF"}}
                    label='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={{backgroundColor: "#FFFFFF"}}
                    keyboardType="phone-pad"
                    label='Phone Number'
                    value={phone}
                    onChangeText={text => setPhone(text)}
                />
                <Button  
                    mode="contained" 
                    onPress={() => {{
                        setLoading(true)
                        const userRef = firestore.collection("users").doc(auth.currentUser.uid);
                        return userRef.update({
                            email: email,
                            phone: phone
                        })
                        .then(function() {
                            Actions.pop()
                        })
                    }}}
                >
            Edit
          </Button>
            </View>
        )
    
}

const styles = StyleSheet.create({
    view: {
        flex:1,
        backgroundColor: '#FFFFFF',
      },
  });

  export default withTheme(Profile);
