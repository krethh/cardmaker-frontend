import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors'

const MenuTile = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.tile}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tile: {
        backgroundColor: Colors.Green,
        flex: 2,
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        margin: 10,
        minHeight: 150,
        maxHeight: 180,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        borderRadius: 5
    },
    text: {
        fontSize: 30
    }
})

export default MenuTile;