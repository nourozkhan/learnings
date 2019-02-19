import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TodoApp from './components/todo.js'
import Home from './components/home.js'
import Error from './components/error.js'
import SignIn from './components/signin.js'

export default (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/todo' component={TodoApp} />
                <Route path='/signin' component={SignIn} />
                <Route component={Error} />
            </Switch>
        </BrowserRouter>
    </div>
);
