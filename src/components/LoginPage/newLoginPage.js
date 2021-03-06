import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css'

class LoginPage_RegisterPage extends Component {
    state = {
        username: '',
        password: '',
    };

    login = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) 
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    } // end login

    registerUser = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'REGISTER',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <section className='forms-section'>

                {this.props.errors.loginMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.loginMessage}
                    </h2>
                )}

                <div className='forms'>

                    <div className="form-wrapper is-active">

                        <button
                            type="button"
                            className="switcher switcher-login"
                            
                        >
                            Login
                       <span className="underline"></span>
                        </button>

                        <form onSubmit={this.login} className="form form-login">

                            <div className='input-block'>
                                <label htmlFor="username">
                                    Username:
              <input
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleInputChangeFor('username')}
                                    />
                                </label>
                            </div>

                            <div className='input-block'>
                                <label htmlFor="password">
                                    Password:
              <input
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChangeFor('password')}
                                    />
                                </label>
                            </div>

                            <div>
                                <button
                                    className="btn-login"
                                    type="submit"
                                    value="Log In"
                                    onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                                > Login </button>
                            </div>

                        </form>

                    </div>

                    {/* Register page starts here */}

                    <div className="form-wrapper">

                        <button
                            type="button"
                            className="switcher switcher-signup"
                            
                        >
                            Register
                 <span className="underline"></span>
                        </button>

                        {this.props.errors.registrationMessage && (
                            <h2
                                className="alert"
                                role="alert"
                            >
                                {this.props.errors.registrationMessage}
                            </h2>
                        )}

                        <form onSubmit={this.registerUser} className='form form-signup' >

                            <div className='input-block'>
                                <label htmlFor="username">
                                    Username:
              <input
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleInputChangeFor('username')}
                                    />
                                </label>
                            </div>

                            <div className='input-block'>
                                <label htmlFor="password">
                                    Password:
              <input
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChangeFor('password')}
                                    />
                                </label>
                            </div>

                            <div>
                                <button
                                    className="register"
                                    type="submit"
                                    value="Register"
                                >submit </button>
                            </div>

                        </form>

                    </div>


                    {/* <center>
            <button
              type="button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
            >
              Register
          </button>
          </center> */}

                </div>
            </section >
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage_RegisterPage);