import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';

const RootStack = createStackNavigator({
    Main: {
        screen: Main,
    },
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#ffffff',
        alignContent: 'center',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },

});

export default createAppContainer(RootStack);

