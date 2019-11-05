import { connect } from 'react-redux';
import SelectImage from './SelectImage'

const mapStateToProps = state => {
  return {
    config: state.config,
    currentCard: state.currentCard
  }
}

const SelectImageContainer = connect(mapStateToProps, {

})(SelectImage)

export default SelectImageContainer;