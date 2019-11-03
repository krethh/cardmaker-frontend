import { connect } from 'react-redux';
import EnterTranslatedWordScreen from './EnterTranslatedWordScreen'
import { setTranslatedWord } from '../../actions/CurrentCardActions'

const mapStateToProps = state => {
  return {
    config: state.config,
    currentCard: state.currentCard
  }
}

const EnterTranslatedWordScreenContainer = connect(mapStateToProps, {
  setTranslatedWord
})(EnterTranslatedWordScreen)

export default EnterTranslatedWordScreenContainer;