import React, { Component } from 'react';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

export default (props) => {
            
    return(
        <View style={styles.container}>
            <Text>add</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    input:{
        marginTop: 15,
        padding:3,
        height: 30,
        borderWidth:1,
        borderRadius:5,
        width: 200,
        color: "#000",
    },
    button:{
        marginTop: 30,
        padding: 5,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "#ddd",

    }
})