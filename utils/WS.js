import axios from 'axios';
import store from '../utils/Store'

class WS {

    constructor() {

    }

    getDecks() {
        return axios.get(`${store.getState().config.backendUrl}/decks`, {
            headers: { 'Authorization': store.getState().config.sessionToken }
        })
    }

    postCard(card) {
        return axios.post(`${store.getState().config.backendUrl}/cards`, card,
            { headers: { 'Authorization': store.getState().config.sessionToken } })
    }

    getDiscoveryCards() {
        return axios.get(`${store.getState().config.backendUrl}/discovery-cards`, {
            headers: { 'Authorization': store.getState().config.sessionToken }
        })
    }

    postDiscoveryCards(cards) {
        return axios.post(`${store.getState().config.backendUrl}/discovery-cards`, cards,
            { headers: { 'Authorization': store.getState().config.sessionToken } })
    }

    getSubscribableDecks() {
        return axios.get(`${store.getState().config.backendUrl}/subscribable-decks`, {
            headers: { 'Authorization': store.getState().config.sessionToken }
        })
    }
}

export default new WS();