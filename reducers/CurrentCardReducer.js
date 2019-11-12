import { SET_TRANSLATED_WORD, SET_API_RESPONSE, SET_CHOSEN_CARD, SET_IMAGE, SET_EXAMPLE_SENTENCE } from '../actions/CurrentCardActions'

const currentCardReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_TRANSLATED_WORD: {
            return {
                ...state,
                translatedWord: action.value
            }
        }
        case SET_API_RESPONSE: {
            return {
                ...state,
                apiResponse: action.value
            }
        }
        case SET_CHOSEN_CARD: {
            return {
                ...state,
                chosenCard: action.value
            }
        }
        case SET_IMAGE: {
            return {
                ...state,
                image: action.value
            }
        }
        case SET_EXAMPLE_SENTENCE: {
            return {
                ...state,
                exampleSentence: action.value
            }
        }
        default: {
            return state
        }
    }
}

export default currentCardReducer;