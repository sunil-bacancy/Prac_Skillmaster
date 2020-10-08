import { canInstrument } from 'babel-jest';
import { connect } from 'react-redux';
import { internerConnSet } from '../actions';

const mapDispatchToProps = dispatch => ({
    checkInternet: state => {
        dispatch(internerConnSet(state));
    }
})

const mapStateToProps = state => ({
    checkInternetState: state.internerConn ? state.internerConn : false
})

export default connect(mapStateToProps, mapDispatchToProps);