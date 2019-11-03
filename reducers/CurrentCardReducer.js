import { SET_TRANSLATED_WORD } from '../actions/CurrentCardActions'

const currentCardReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_TRANSLATED_WORD: {
            return {
                ...state,
                translatedWord: action.value
            }
        }
        default: {
            return state
        }
    }
}

export default currentCardReducer;