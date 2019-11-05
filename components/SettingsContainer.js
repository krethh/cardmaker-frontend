import { connect } from 'react-redux';
import { 
    setDictionarySecret, 
    setDefaultTargetLanguage,
    setPixabaySecret
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
    setPixabaySecret
})(Settings);

export default SettingsContainer;