import { connect } from 'react-redux';
import AddToDeck from './AddToDeck'

const mapStateToProps = state => {
  return {
    config: state.config,
    currentCard: state.currentCard,
    userInfo: state.userInfo
  }
}

const AddToDeckContainer = connect(mapStateToProps, {

})(AddToDeck)

export default AddToDeckContainer;