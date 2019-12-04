import { connect } from 'react-redux';
import { 
    setDictionarySecret, 
    setDefaultTargetLanguage,
    setPixabaySecret,
    setBackendUrl,
    setSessionToken
 } from './actions/ConfigActions'
import {
    setUserDecks
} from './actions/UserInfoActions'
import Home from './Home'

const mapStateToProps = state => {
    return {
        config: state.config
    }
}

const HomeContainer = connect(mapStateToProps, {
    setDictionarySecret,
    setDefaultTargetLanguage,
    setPixabaySecret,
    setBackendUrl,
    setSessionToken,
    setUserDecks
})(Home);

export default HomeContainer;