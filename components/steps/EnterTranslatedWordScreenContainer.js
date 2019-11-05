import { connect } from 'react-redux';
import EnterTranslatedWordScreen from './EnterTranslatedWordScreen'
import { setTranslatedWord, setApiResponse, setChosenCard } from '../../actions/CurrentCardActions'

const mapStateToProps = state => {
  return {
    config: state.config,
    currentCard: state.currentCard
  }
}

const EnterTranslatedWordScreenContainer = connect(mapStateToProps, {
  setTranslatedWord,
  setApiResponse,
  setChosenCard
})(EnterTranslatedWordScreen)

export default EnterTranslatedWordScreenContainer;