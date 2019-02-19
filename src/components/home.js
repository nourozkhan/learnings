import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';

class Home extends Component {
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
        var email = this.state.userName;
        var password = this.state.password
        console.log(email, password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
                console.log({ user } + "your account is created")
                this.props.history.push('/signin');
            })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
        event.preventDefault();

    }

    render() {

        return (
            <div>
                <h1>Todo Application</h1>
                <NavLink to='/signin'><button>Sign In</button></NavLink>
                <h2>Sign Up Form</h2>
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

export default Home;
