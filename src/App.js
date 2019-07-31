import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { Layout, Icon } from "antd";
import Routes from "./Route";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";

// import loadingIco from "./assets/img/load.png";
const { Content } = Layout;

class App extends Component {
  state = {
    collapsed: true
  };
  handleCollapse = collapsed => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps, this.props)) {
    }
  }

  render() {
    const { auth, notifications, profile, products, employees } = this.props;
    const links = auth.uid ? (
      <Sidebar
        isCollapsed={this.handleCollapse}
        collapsed={this.state.collapsed}
        auth={auth}
      />
    ) : (
      ""
    );
    if (notifications) {
      return (
        <React.Fragment>
          <BrowserRouter>
            <div>
              {" "}
              <Layout style={{ minHeight: "100vh" }}>
                {links}
                <Layout>
                  <Navbar
                    isCollapsed={this.handleCollapse}
                    collapsed={this.state.collapsed}
                    notifications={notifications}
                    auth={auth}
                    profile={profile}
                  />
                  <Content
                    style={{
                      margin: "24px 16px",
                      marginTop: 70,
                      minHeight: 280
                    }}
                  >
                    <Routes
                      profile={profile}
                      products={products}
                      employees={employees}
                      auth={auth}
                    />
                  </Content>
                </Layout>
              </Layout>
            </div>
          </BrowserRouter>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <Icon type="loading" className="splash-loading" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(App);
