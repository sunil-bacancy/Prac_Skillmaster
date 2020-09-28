import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    user: state.user ? state.user : null,
});

export default connect(mapStateToProps);