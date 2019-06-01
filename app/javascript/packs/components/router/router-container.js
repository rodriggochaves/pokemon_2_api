import { connect } from "react-redux";

import Router from "packs/components/router/router";

const mapStateToProps = state => {
  return {
    component: state.router
  };
};

export default connect(mapStateToProps)(Router);
