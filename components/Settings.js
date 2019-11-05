import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Picker } from 'react-native';
import Languages from '../config/Languages'
import { 
    persistDefaultTargetLanguage, 
    persistDictionarySecret, 
    persistPixabaySecret  
} from '../actions/ConfigActions'

const Settings = props => {

    useEffect(() => {
        return () => {
            persistDictionarySecret(props.config.dictionarySecret)
            persistPixabaySecret(props.config.pixabaySecret)
            persistDefaultTargetLanguage(props.config.defaultTargetLanguage)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                Dictionary API Secret
            </Text>
            <View style={styles.inputLimiter}>
                <TextInput
                    style={styles.inputStyle}
                    value={props.config.dictionarySecret}
                    onChangeText={text => props.setDictionarySecret(text)}
                    multiline={true}
                    placeholder="Dictionary API Secret"
                    numberOfLines={5}
                />
            </View>
            <View style={styles.inputLimiter}>
                <TextInput
                    style={styles.inputStyle}
                    value={props.config.pixabaySecret}
                    onChangeText={text => props.setPixabaySecret(text)}
                    multiline={true}
                    placeholder="Pixabay API Secret"
                    numberOfLines={5}
                />
            </View>
            <Text style={styles.label}>
                Translation direction
            </Text>
            <Picker
                selectedValue={props.config.defaultTargetLanguage}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                    props.setDefaultTargetLanguage(itemValue)
                }}
            >
                {Object.keys(Languages).map(key => (
                    <Picker.Item label={Languages[key].label} value={Languages[key].code} key={Languages[key].label} />
                ))}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    },
    picker: {
        marginLeft: 15
    },
    inputLimiter: {
        marginRight: 30
    },
    label: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 15
    },
    inputStyle: {
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        elevation: 1,
        margin: 15
    }
})

export default Settings;