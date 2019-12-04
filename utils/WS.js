import axios from 'axios';
import store from '../utils/Store'

class WS {

    constructor() {
        
    }

    getDecks() {
        return axios.get(`${store.getState().config.backendUrl}/decks`, {
            headers: {'Authorization': store.getState().config.sessionToken}
        })
    }
}

export default new WS();