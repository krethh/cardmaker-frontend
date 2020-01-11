import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PotentialSubscription = props => {

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.owner}>{props.creatorId}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    name: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 18
    },
    owner: {
        margin: 10,
        fontSize: 12
    }
});

export default PotentialSubscription