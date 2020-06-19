import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Text style={styles.welcome}>Hello World</Text>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lighter,
    },
    welcome: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10
    },
    body: {
        backgroundColor: Colors.light,
    },
});

export default App;
