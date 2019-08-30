import React from 'react'
import {View} from 'react-native'
import { StyleSheet} from 'react-native';
import { Headline} from 'react-native-paper';
import {Actions} from 'react-native-router-flux'
import Animation from 'lottie-react-native';
import anim from '../../../assets/8572-liquid-blobby-loader';
import { withTheme } from 'react-native-paper';


function Loader(props) {
    
    return (
        <View  style={styles.container}>
        <Headline style={{textAlign: 'center', paddingTop: 40, fontFamily: "VINCHAND", fontSize: 50 }}>{props.headerText}</Headline>
        <View>
          <Animation
            ref={animation => {
              this.animation = animation;
              this.animation.play();
            }}
            style={{
              width: 300,
              height: 300
            }}
            loop={true}
            source={anim}
          />
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center'
    },
  
  });

export default withTheme(Loader);