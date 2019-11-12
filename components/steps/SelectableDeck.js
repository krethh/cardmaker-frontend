import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../utils/Colors'

const SelectableDeck = props => {

    return (
        <View>
            <Text style={styles.text}>{props.label}</Text>
            <TouchableOpacity style={styles.circle} onPress={props.onPress} >
                {props.checked && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.Blue,
    },
});

export default SelectableDeck
