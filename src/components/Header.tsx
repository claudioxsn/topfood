import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Footer from '../components/Footer';


function Head(): React.JSX.Element {

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Top Food</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'red',
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Head;
