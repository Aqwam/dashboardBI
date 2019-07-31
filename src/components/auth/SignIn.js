import React, { Component } from "react";
import { Form, Icon, message, Input, Button, Card } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";

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

  error(authError) {
    message.error(authError);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  x;
  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
            <Form
              onSubmit={this.handleSubmit.bind(this)}
              className="login-form"
            >
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
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="/register">register now!</a>
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
  return {};
};

const mapStateToProps = state => {
  return {};
};
const SignIn = Form.create()(SignInForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
