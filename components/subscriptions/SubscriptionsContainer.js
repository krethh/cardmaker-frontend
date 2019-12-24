import { connect } from 'react-redux';
import Subscriptions from './Subscriptions'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const SubscriptionsContainer = connect(mapStateToProps, {

})(Subscriptions)

export default SubscriptionsContainer;