import logo from './logo.svg';
import React, {Component, useState} from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {Home} from './Components/HomePage/Home';
import {Advice} from './Components/Advice/Advice';
import {Emissions} from './Components/Emissions/Emissions';
import {Garden} from './Components/Garden/Garden';
import {Search} from './Components/Search/Search';
// import {SignUp} from './Components/Login/SignUp';
import SignUp from './Components/Auth/Components/SignUp/SignUp';
// import {SignIn} from './Components/Login/SignIn';
import SignIn from './Components/Auth/Components/SignIn/SignIn';
import Auth from './Components/Auth/Auth';
import {SinglePlant} from './Components/SinglePlant/SinglePlant';
import './App.css';
import './index.css';
import PageTypes from './Constants/PageTypes/PageTypes';
import api from './Constants/APIEndpoints/APIEndpoints';
// s

export class App extends React.Component {
// function App() {
    // constructor() {
    //     super();
    //     this.state = {
    //         page: localStorage.getItem("Authorization") ? PageTypes.signedInMain : PageTypes.signIn,
    //         authToken: localStorage.getItem("Authorization") || null,
    //         user: null
    //     }

    //     this.getCurrentUser()
    // }


    // /**
    //  * @description Gets the users
    //  */
    // getCurrentUser = async () => {
    //     if (!this.state.authToken) {
    //         return;
    //     }
    //     const response = await fetch(api.base + api.handlers.myuser, {
    //         headers: new Headers({
    //             "Authorization": this.state.authToken
    //         })
    //     });
    //     if (response.status >= 300) {
    //         alert("Unable to verify login. Logging out...");
    //         localStorage.setItem("Authorization", "");
    //         this.setAuthToken("");
    //         this.setUser(null)
    //         return;
    //     }
    //     const user = await response.json()
    //     this.setUser(user);

    // }

    // /**
    //  * @description sets the page type to sign in
    //  */
    // setPageToSignIn = (e) => {
    //     e.preventDefault();
    //     this.setState({ page: PageTypes.signIn });
    // }

    // /**
    //  * @description sets the page type to sign up
    //  */
    // setPageToSignUp = (e) => {
    //     e.preventDefault();
    //     this.setState({ page: PageTypes.signUp });
    // }

    // setPage = (e, page) => {
    //     e.preventDefault();
    //     this.setState({ page });
    // }

    // /**
    //  * @description sets auth token
    //  */
    // setAuthToken = (authToken) => {
    //     this.setState({ authToken, page: authToken === "" ? PageTypes.signIn : PageTypes.signedInMain });
    // }

    // /**
    //  * @description sets the user
    //  */
    // setUser = (user) => {
    //     this.setState({ user });
    // }
    constructor(props) {
        super(props);
        this.state = {
            // plantLink: ,
        };
    }

  render() {
    // const { page, user } = this.state;

    
      return (
        <Router>
            <Navbar className="green-background">
                <div className="container nav-bar">
                    <Link className="link" to="/">
                        <Navbar.Brand>verdancy</Navbar.Brand>
                    </Link>
                    <div className="nav-links">
                        <Link className="link" to="/advice">advice</Link>
                        <Link className="link" to="/search">search</Link>
                        <Link className="link" to="/emissions">my emissions</Link>
                        <Link className="link" to="/garden">my garden</Link>
                        {/* fix these colors later */}
                        <Button className="darkgreen-background">
                        <Link to="/signup" className="link darkgreen-background">Get Started</Link>
                        </Button>
                        <Button className="cream-background">
                        <Link to="/signin" className="link cream-background">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/advice" component={Advice}></Route>
                <Route exact path="/emissions" component={Emissions}></Route>
                <Route exact path="/garden" component={Garden}></Route>
                <Route exact path="/search" component={Search}></Route>
                <Route exact path="/signin" component={SignIn}></Route>
                <Route exact path="/signup" component={SignUp}></Route>
                <Route exact path="/plant/" component={SinglePlant}></Route>
            </Switch>

        </Router>

    );
    }
}

// export default App;
