import React, { Component } from "react";
import { Form, Icon, message, Input, Button, Card } from "antd";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";
import { Redirect } from "react-router-dom";

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: "",
      warning: ""
    };
  }
  // componentDidUpdate(prevProps) {
  //     if (!_.isEqual(prevProps, this.props)) {
  //         if (this.props.auth.uid == null) {
  //             return message.error("Username atau Password salah !");
  //         } else {
  //             console.log("berhasil");
  //         }
  //     }
  // }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  x;
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn(values);
      }
    });
  };
  testCheck = () => {
    message.error("Email atau Password Salah !");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { auth, authError } = this.props;
    const links =
      authError !== null ? (
        <span style={{ color: "red " }}>Email Atau Password Salah !</span>
      ) : (
        ""
      );
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <div
          style={{
            background: "#ECECEC",
            paddingTop: "100px",
            height: "85vh"
          }}
        >
          <Card
            title="Login"
            bordered={false}
            className="mr-auto ml-auto mt-10"
            style={{ width: 300 }}
          >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your email!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="user"
                        style={{
                          color: "rgba(0,0,0,.25)"
                        }}
                      />
                    }
                    placeholder="Email"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Password!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="lock"
                        style={{
                          color: "rgba(0,0,0,.25)"
                        }}
                      />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              {links}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
              <div className="text-center" style={{ color: "red" }} />
            </Form>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signIn: credential => dispatch(signIn(credential))
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};
const SignIn = Form.create()(SignInForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
