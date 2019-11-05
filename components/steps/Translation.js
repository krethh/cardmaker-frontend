import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Translation = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.translation}>
                <Text style={styles.front}>{props.translation.front}</Text>
                <Text style={styles.back}>{props.translation.back}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    translation: {
        margin: 10,
        elevation: 10
    },
    front: {
        fontSize: 18
    },
    back: {
        fontSize: 24,
        fontWeight: "bold"
    }
});

export default Translation