import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput, Picker, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Languages from '../config/Languages'
import { Header } from 'react-navigation-stack';
import {
    persistDefaultTargetLanguage,
    persistDictionarySecret,
    persistPixabaySecret,
    persistBackendUrl
} from '../actions/ConfigActions'

const KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + StatusBar.currentHeight;

const Settings = props => {

    useEffect(() => {
        return () => {
            persistDictionarySecret(props.config.dictionarySecret)
            persistPixabaySecret(props.config.pixabaySecret)
            persistDefaultTargetLanguage(props.config.defaultTargetLanguage)
            persistBackendUrl(props.config.backendUrl)
        }
    }, [])

    handleLogoutPress = () => {
        props.setSessionToken(null)
    }

    return (
            <KeyboardAwareScrollView enableAutomaticScroll extraHeight={KEYBOARD_VERTICAL_OFFSET} extraScrollHeight={50} enableOnAndroid >
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
                        numberOfLines={2}
                    />
                </View>
                <Text style={styles.label}>
                    Pixabay API Secret
                </Text>
                <View style={styles.inputLimiter}>
                    <TextInput
                        style={styles.inputStyle}
                        value={props.config.pixabaySecret}
                        onChangeText={text => props.setPixabaySecret(text)}
                        multiline={true}
                        placeholder="Pixabay API Secret"
                        numberOfLines={1}
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
                        <Picker.Item label={Languages[key].label} value={Languages[key]} key={Languages[key].label} />
                    ))}
                </Picker>
                <Text style={styles.label}>
                    Backend URL
                </Text>
                <View style={styles.inputLimiter}>
                    <TextInput
                        style={styles.inputStyle}
                        value={props.config.backendUrl}
                        onChangeText={text => props.setBackendUrl(text)}
                        multiline={false}
                        placeholder="Backend URL"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="LOGOUT"
                        disabled={!props.config.sessionToken}
                        onPress={handleLogoutPress}
                    />
                </View>
            </KeyboardAwareScrollView>
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
    },
    buttonContainer: {
        margin: 15,
        width: "90%"
    }
})

export default Settings;