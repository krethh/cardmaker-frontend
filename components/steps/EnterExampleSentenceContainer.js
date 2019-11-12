import { connect } from 'react-redux';
import { setExampleSentence } from '../../actions/CurrentCardActions'
import EnterExampleSentence from './EnterExampleSentence'

const mapStateToProps = state => {
  return {
    config: state.config,
    currentCard: state.currentCard
  }
}

const EnterExampleSentenceContainer = connect(mapStateToProps, {
    setExampleSentence
})(EnterExampleSentence)

export default EnterExampleSentenceContainer;