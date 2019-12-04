import { SET_USER_DECKS } from '../actions/UserInfoActions'

const userInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_DECKS: {
            return {
                ...state,
                userDecks: action.value
            }
        }
        default:
            return state;
    }
}

export default userInfoReducer