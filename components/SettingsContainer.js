import { connect } from 'react-redux';
import { 
    setDictionarySecret, 
    setDefaultTargetLanguage,
    setPixabaySecret,
    setBackendUrl,
    setSessionToken
 } from '../actions/ConfigActions'
import Settings from './Settings'

const mapStateToProps = state => {
    return {
        config: state.config
    }
}

const SettingsContainer = connect(mapStateToProps, {
    setDictionarySecret,
    setDefaultTargetLanguage,
    setPixabaySecret,
    setBackendUrl,
    setSessionToken
})(Settings);

export default SettingsContainer;