import { connect } from 'react-redux';
import { 
    setDictionarySecret, 
    setDefaultTargetLanguage,
    setPixabaySecret
 } from './actions/ConfigActions'
import Home from './Home'

const mapStateToProps = state => {
    return {
        config: state.config
    }
}

const HomeContainer = connect(mapStateToProps, {
    setDictionarySecret,
    setDefaultTargetLanguage,
    setPixabaySecret
})(Home);

export default HomeContainer;