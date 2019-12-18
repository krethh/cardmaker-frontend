import { connect } from 'react-redux';
import Discovery from './Discovery'

const mapStateToProps = state => {
  return {
    config: state.config,
    userInfo: state.userInfo
  }
}

const DiscoveryContainer = connect(mapStateToProps, {
    
})(Discovery)

export default DiscoveryContainer;