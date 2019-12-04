import { 
    SET_DICTIONARY_SECRET,
    SET_PIXABAY_SECRET, 
    SET_DEFAULT_TARGET_LANGUAGE, 
    SET_BACKEND_URL,
    SET_SESSION_TOKEN
} from '../actions/ConfigActions'

const configReducer = (state = {}, action) => {
    console.log(action);    

    switch (action.type) {
        case SET_DICTIONARY_SECRET:
            return {
                ...state,
                dictionarySecret: action.value
            }
        case SET_DEFAULT_TARGET_LANGUAGE: {
            return {
                ...state,
                defaultTargetLanguage: action.value
            }
        }
        case SET_PIXABAY_SECRET: {
            return {
                ...state,
                pixabaySecret: action.value
            }
        }
        case SET_BACKEND_URL: {
            return {
                ...state,
                backendUrl: action.value
            }
        }
        case SET_SESSION_TOKEN: {
            return {
                ...state,
                sessionToken: action.value
            }
        }
        default: {
            return state
        }
    }
}

export default configReducer;