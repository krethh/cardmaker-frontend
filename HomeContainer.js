import { connect } from 'react-redux';
import { 
    setDictionarySecret, 
    setDefaultTargetLanguage
 } from './actions/ConfigActions'
import Home from './Home'

const mapStateToProps = state => {
    return {
        config: state.config
    }
}

const HomeContainer = connect(mapStateToProps, {
    setDictionarySecret,
    setDefaultTargetLanguage
})(Home);

export default HomeContainer;