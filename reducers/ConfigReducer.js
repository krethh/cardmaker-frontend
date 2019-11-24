import { 
    SET_DICTIONARY_SECRET,
    SET_PIXABAY_SECRET, 
    SET_DEFAULT_TARGET_LANGUAGE 
} from '../actions/ConfigActions'

const configReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_DICTIONARY_SECRET:
            return {
                ...state,
                dictionarySecret: action.value
            }
        case SET_DEFAULT_TARGET_LANGUAGE: {

            console.log(action);
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
        default: {
            return state
        }
    }
}

export default configReducer;