import { connect } from 'react-redux';
import { 
    setDictionarySecret, 
    setDefaultTargetLanguage,
    setPixabaySecret,
    setBackendUrl
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
    setBackendUrl
})(Settings);

export default SettingsContainer;