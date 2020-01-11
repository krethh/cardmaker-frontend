import { SET_LOGIN_MODAL_OPEN } from "../actions/LayoutActions"

const layoutReducer = (state = {
    loginModalOpen: false
}, action) => { 
    console.log(action)

    switch (action.type) {
        case SET_LOGIN_MODAL_OPEN: {
            return {
                ...state,
                loginModalOpen: action.value
            }
        }

        default: {
            return state
        }
    }
}

export default layoutReducer;