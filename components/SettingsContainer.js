import { connect } from 'react-redux';
import { 
    setDictionarySecret, 
    setDefaultTargetLanguage
 } from '../actions/ConfigActions'
import Settings from './Settings'

const mapStateToProps = state => {
    return {
        config: state.config
    }
}

const SettingsContainer = connect(mapStateToProps, {
    setDictionarySecret,
    setDefaultTargetLanguage
})(Settings);

export default SettingsContainer;