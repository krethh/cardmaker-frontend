import { connect } from 'react-redux';
import { setImage } from '../../actions/CurrentCardActions'
import SelectImage from './SelectImage'

const mapStateToProps = state => {
  return {
    config: state.config,
    currentCard: state.currentCard
  }
}

const SelectImageContainer = connect(mapStateToProps, {
  setImage
})(SelectImage)

export default SelectImageContainer;