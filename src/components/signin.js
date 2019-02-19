import React, { Component } from 'react';
import firebase from 'firebase';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { userName: '', password: '' };
    }

    handleUserName = (event) => {
        this.setState({ userName: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {
        firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.password)
            .then((user) => {
                console.log({ user } + "sign in successful")
                this.props.history.push('/todo');
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode, errorMessage)
            });
        event.preventDefault();
    }

    render() {

        return (
            <div>
                <h1>Todo Application</h1>
                <h2>Sign In Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        User Name:
                        <input type="text" value={this.state.userName} onChange={this.handleUserName} />
                    </label>
                    <label>
                        password:
                        <input type="text" value={this.state.password} onChange={this.handlePassword} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>


            </div>
        );
    }

}

export default SignIn;
