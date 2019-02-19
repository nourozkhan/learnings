import Action from '../action.js';
import * as firebase from 'firebase';
//import { browserHistory } from 'react-router'

export default class Middleware {
    static signUp(obj) {
        console.log(obj);
        return (dispatch) => {
            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(obj.email, obj.pass);
            promise.then((user) => {
                console.log({ user } + "your account is created");
                browserHistory.replace('/');
            })
            promise.catch(e => obj.error.innerHTML = e.message);
            // firebase.auth().onAuthStateChanged(firebaseUser => {
            //     if (firebaseUser) {
            //         console.log(firebaseUser);
            //     }
            //     else {
            //         console.log('not logged in');
            //     }
            // });
            dispatch(Action.signUpData(obj))
        }
    }

    static signIn(obj) {
        console.log(obj);
        return (dispatch) => {
            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(obj.userEmail, obj.userPass);
            promise.then((user) => {
                console.log("signIn successfully");
                browserHistory.push('/Home');
            })
            promise.catch(e => console.log("ERROR:", e.message));
            dispatch(Action.signIn(obj))
        }
    }

    static signOut() {
        return (dispatch) => {
            firebase.auth().signOut().then(function () {
                browserHistory.replace('/');
            })
            dispatch(Action.signOut())
        }
    }

    static crimeReportData(obj) {
        return (dispatch) => {
            firebase.database().ref('/reportData/crimeReportData').push(obj).then(function () {
                browserHistory.replace('/Home');
            })
            dispatch(Action.reportData(obj))
        }
    }

     static missingReportData(obj) {
        return (dispatch) => {
            firebase.database().ref('/reportData/missingReportData').push(obj).then(function () {
                browserHistory.replace('/Home');
            })
            dispatch(Action.reportData(obj))
        }
    }

     static complaintReportData(obj) {
        return (dispatch) => {
            firebase.database().ref('/reportData/complaintReportData').push(obj).then(function () {
                browserHistory.replace('/Home');
            })
            dispatch(Action.reportData(obj))
        }
    }

    static showCrimeReport() {
        return (dispatch) => {
            var dataList = [];
            let refRoot = firebase.database().ref('/reportData/crimeReportData')
            refRoot.on("child_added", (snap) => {
                var obj = snap.val();
                obj.id = snap.key;
                dataList.push(obj);
                dispatch(Action.showCrimeReport(dataList))
            })
            
        }
    }

     static showComplaintsReport() {
        return (dispatch) => {
            var dataList = [];
            let refRoot = firebase.database().ref('/reportData/missingReportData')
            refRoot.on("child_added", (snap) => {
                var obj = snap.val();
                obj.id = snap.key;
                dataList.push(obj);
                dispatch(Action.showComplaintsReport(dataList))
            })
            
        }
    }

     static showMissingReport() {
        return (dispatch) => {
            var dataList = [];
            let refRoot = firebase.database().ref('/reportData/complaintReportData')
            refRoot.on("child_added", (snap) => {
                var obj = snap.val();
                obj.id = snap.key;
                dataList.push(obj);
                dispatch(Action.showMissingReport(dataList))
            })
            
        }
    }
}