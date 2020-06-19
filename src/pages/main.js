import React, { Component } from 'react';
import api from "../services/api";

import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList, Linking
} from 'react-native';
import NativeAlertManager from "react-native/Libraries/Alert/NativeAlertManager";

export default class Main extends Component {
    static navigationOptions = {
        title: 'JSHunt',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#ffffff',
        alignContent: 'center',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        productInfo: {},
        docs: [],
        page: 1
    };

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({
            docs: [...this.state.docs, ...docs],
            productInfo,
            page,
        });
    };

    loadMore = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.page) {
            return
        }

        const pageNumber = page + 1;

        this.loadProjects(pageNumber);
    };

    async openUrl(url) {
        if (await Linking.canOpenURL(url)) {
            await Linking.openURL(url);
        } else {
            NativeAlertManager.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    renderItem = ({ item }) => (
        <View
            style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <TouchableOpacity
                style={styles.productButton}
                onPress={() => this.openUrl(item.url)}>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content"/>
                <View style={styles.container}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={this.state.docs}
                        keyExtractor={item => item._id}
                        renderItem={this.renderItem}
                        onEndReached={this.loadMore}
                        onEndReachecThreshold={0.1}
                    />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    list: {
        padding: 20,
    },
    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DDD',
        padding: 20,
        marginBottom: 20
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    productDescription: {
        fontSize: 16,
        color: '#999',
        marginTop: 4,
        lineHeight: 24
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    productButtonText: {
        fontSize: 16,
        color: "#da552f",
        fontWeight: 'bold'
    }
});

