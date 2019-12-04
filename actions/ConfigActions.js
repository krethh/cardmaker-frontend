import { AsyncStorage } from 'react-native'
import ConfigKeys from '../config/ConfigKeys'

export const SET_DICTIONARY_SECRET = "SET_DICTIONARY_SECRET";
export const SET_PIXABAY_SECRET = "SET_PIXABAY_SECRET";
export const SET_DEFAULT_TARGET_LANGUAGE = "SET_DEFAULT_TARGET_LANGUAGE";
export const SET_BACKEND_URL = "SET_BACKEND_URL";
export const SET_SESSION_TOKEN = "SET_SESSION_TOKEN";

export function setDictionarySecret(value) {
    return {
        type: SET_DICTIONARY_SECRET,
        value
    }
}

export function setPixabaySecret(value) {
    return {
        type: SET_PIXABAY_SECRET,
        value
    }
}

export function setDefaultTargetLanguage(value) {
    return {
        type: SET_DEFAULT_TARGET_LANGUAGE,
        value
    }
}

export function setBackendUrl(value) {
    return {
        type: SET_BACKEND_URL,
        value
    }
}

export function setSessionToken(value) {
    return {
        type: SET_SESSION_TOKEN,
        value
    }
}

export function getDictionarySecretFromStorage() {
    return AsyncStorage.getItem(ConfigKeys.DICTIONARY_SECRET)
}

export function getPixabaySecretFromStorage() {
    return AsyncStorage.getItem(ConfigKeys.PIXABAY_SECRET)
}

export function getDefaultTargetLanguageFromStorage() {
    return AsyncStorage.getItem(ConfigKeys.DEFAULT_TARGET_LANGUAGE)
}

export function getBackendUrlFromStorage() {
    return AsyncStorage.getItem(ConfigKeys.BACKEND_URL);
}

export function getSessionTokenFromStorage() {
    return AsyncStorage.getItem(ConfigKeys.SESSION_TOKEN);
}

export function persistDictionarySecret(value) {
    AsyncStorage.setItem(ConfigKeys.DICTIONARY_SECRET, value)
}

export function persistPixabaySecret(value) {
    AsyncStorage.setItem(ConfigKeys.PIXABAY_SECRET, value)
}

export function persistDefaultTargetLanguage(value) {
    AsyncStorage.setItem(ConfigKeys.DEFAULT_TARGET_LANGUAGE, value)
}

export function persistBackendUrl(value) {
    AsyncStorage.setItem(ConfigKeys.BACKEND_URL, value)
}

export function persistSessionToken(value) {
    AsyncStorage.setItem(ConfigKeys.SESSION_TOKEN, value)
}