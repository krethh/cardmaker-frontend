import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const PotentialSentence = props => {

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "bold"
    },
    container: {
        margin: 10,
        elevation: 10
    }
});

export default PotentialSentence    