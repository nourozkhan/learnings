import React, { Component } from 'react';
import firebase from 'firebase';
import Popup from "reactjs-popup";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = { inputValue: '', items: [], updateValue: '' };
    }

    componentWillMount() {
        console.log("component will mount")
        let arr = []
        console.log("will mount");
        var ref = firebase.database().ref('/newtodo/');
        ref.on('child_added', (data) => {
            arr.push(data)
            this.setState({ items: arr })
        });
    }

    componentWillUnmount() {
        console.log("will unmount");
    }

    componentDidMount() {
        console.log("component will mount")

    }

    handleChange = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    submitt = (e) => {
        let obj = { todo: this.state.inputValue }
        firebase.database().ref('/newtodo').push(obj)
            .then(function () {
                console.log("success")
            })
            .catch(function (error) {
                console.log(error)
            })

        e.preventDefault();
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('Sign-out successful.')
                this.props.history.push('/')
            })
            .catch(function (error) {
                console.log(error)
            });

    }

    update(item, index) {
        console.log(item.key, item.val().todo)
        let refRoot = firebase.database().ref('/newtodo/' + item.key)
        refRoot.set({
            todo: this.state.updateValue
        }, function (error) {
            if (error) {
                console.log(error)
            } else {
                console.log("update successful")
            }
        });
        let arr = []
        console.log("will mount");
        var ref = firebase.database().ref('/newtodo/');
        ref.on('child_added', (data) => {
            arr.push(data)
            this.setState({ items: arr })
        });

    }

    handleUpdateChange = (e) => {
        this.setState({ updateValue: e.target.value })
        console.log(this.state.updateValue)
    }

    delete(item, index) {
        console.log(item.key, item.val().todo)
        let refRoot = firebase.database().ref('/newtodo/' + item.key)
        refRoot.remove();
        let arr = []
        console.log("will mount");
        var ref = firebase.database().ref('/newtodo/');
        ref.on('child_added', (data) => {
            arr.push(data)
            this.setState({ items: arr })
        });
    }

    render() {
        return (
            <div>
                <h1>Todo Application</h1>
                <button onClick={this.signOut}>Sign Out</button>
                <form onSubmit={this.submitt}>
                    <input type="text" onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
                <ul>{this.state.items.map((item, index) => (
                    <li key={index}>{item.val().todo}
                        <Popup trigger={<button> Update</button>} position="right center">
                            <div>
                                <input type="text" onChange={this.handleUpdateChange} />
                                <button onClick={this.update.bind(this, item)}>Done</button>
                            </div>
                        </Popup>
                        <button onClick={this.delete.bind(this, item)}>Delete</button>
                    </li>

                ))}

                </ul>
            </div>
        );
    }

}

export default TodoApp;
