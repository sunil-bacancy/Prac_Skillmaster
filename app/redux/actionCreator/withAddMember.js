import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    addmember: state.addmember ? state.addmember : null
})

export default connect(mapStateToProps);