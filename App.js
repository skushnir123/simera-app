import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Router from './src/Router'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import check from 'react-native-vector-icons/MaterialIcons';
import add from 'react-native-vector-icons/MaterialIcons';
import create from 'react-native-vector-icons/MaterialIcons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#16a085',
    accent: '#16a085',
    background: '#FFFFFF',
    onBackground: '#FFFFFF',
  },
  fonts: {
    ...DefaultTheme.fonts,
    welcomePage: 'VINCHAND',
    regular: 'Roboto-Regular',
    light: 'Roboto-Light',
    medium: 'Roboto-Medium'
  },
};

export default class App extends React.Component {
  state = {
    fontsAreLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      'VINCHAND': require('./assets/VINCHAND.ttf'),
      'Roboto-Regular': require('./assets/Roboto/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/Roboto/Roboto-Light.ttf'),
      'Roboto-Medium': require('./assets/Roboto/Roboto-Medium.ttf'),
    });

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <PaperProvider settings={{
        icon: props => (<check {...props} /> ) , icon: props => (<add {...props} /> ) , icon: props => (<create {...props} /> )
      }} theme={theme}>
        <Router>

        </Router>
      </PaperProvider>
    );
  }
}


