import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { Layout } from "antd";
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
    const links = (
      <Sidebar
        isCollapsed={this.handleCollapse}
        collapsed={this.state.collapsed}
      />
    );
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
                />
                <Content
                  style={{
                    margin: "24px 16px",
                    marginTop: 70,
                    minHeight: 280
                  }}
                >
                  <Routes />
                </Content>
              </Layout>
            </Layout>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([])
)(App);
