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
import SignUp from './Components/Auth/Components/SignUp/SignUp';
import SignIn from './Components/Auth/Components/SignIn/SignIn';
import Auth from './Components/Auth/Auth';
import {SinglePlant} from './Components/SinglePlant/SinglePlant';
import './App.css';
import './index.css';
import PageTypes from './Constants/PageTypes/PageTypes';
import api from './Constants/APIEndpoints/APIEndpoints';
import {PleaseSignIn} from './Components/Auth/Components/PleaseSIgnIn';
import SignOutButton from './Components/Main/Components/SignOutButton/SignOutButton';
// s

class App extends Component {
// function App() {
    constructor() {
        super();
        this.state = {
            page: localStorage.getItem("Authorization") ? PageTypes.signedInMain : PageTypes.signIn,
            authToken: localStorage.getItem("Authorization") || null,
            user: null,
            singlePlants: [],
            plants: [],
            userPlants: []
        }

        this.getCurrentUser()
    }


    /**
     * @description Gets the users
     */
    getCurrentUser = async () => {
        if (!this.state.authToken) {
            return;
        }
        const response = await fetch(api.base + api.handlers.myuser, {
            headers: new Headers({
                "Authorization": this.state.authToken
            })
        });
        if (response.status >= 300) {
            alert("Unable to verify login. Logging out...");
            localStorage.setItem("Authorization", "");
            this.setAuthToken("");
            this.setUser(null)
            return;
        }
        const user = await response.json()
        this.setUser(user);

    }

    /**
     * @description sets the page type to sign in
     */
    setPageToSignIn = (e) => {
        e.preventDefault();
        this.setState({ page: PageTypes.signIn });
    }

    /**
     * @description sets the page type to sign up
     */
    setPageToSignUp = (e) => {
        e.preventDefault();
        this.setState({ page: PageTypes.signUp });
    }

    setPage = (e, page) => {
        e.preventDefault();
        this.setState({ page });
    }

    /**
     * @description sets auth token
     */
    setAuthToken = (authToken) => {
        this.setState({ authToken, page: authToken === "" ? PageTypes.signIn : PageTypes.signedInMain });
    }

    /**
     * @description sets the user
     */
    setUser = (user) => {
        this.setState({ user });
    }

    componentDidMount() {
        // getUserPlants = async () => {
        // this.getUserPlants();
        // setInterval(this.getData, 5000);
        const response = fetch("https://verdancy.capstone.ischool.uw.edu/v1/plants")
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                this.setState({plants: result});
                result.map(cur => (
                    this.state.singlePlants.push(
                        <Route exact path={`/plant/${cur.PlantID}`}>
                            <SinglePlant id={cur.PlantID}/>
                        </Route>
                    )
                ));
            });
        // console.log(this.state.authToken)
        // if (this.state.authToken) {
        //     fetch("https://verdancy.capstone.ischool.uw.edu/v1/UserPlants/", {
        //         method: 'GET',
        //         headers: new Headers({
        //             'Authorization': this.state.authToken
        //         })
        //     }).then(res => res.json())
        //         .then((result) => {
        //             // console.log(result);
        //             // this.setState({userPlants: result});
        //             this.state.userPlants = result;
        //             // console.log(this.state.userPlants);
        //         });
        // }
        // console.log(this.state.userPlants);
    
    }

    

  render() {
    console.log(this.state.id);
    const { page, user } = this.state;
      return (
        <Router>
            <Navbar className="green-background">
                <div className="container" id="nav-bar">
                    <Link className="link" to="/">verdancy</Link>
                    <div id="nav-links">
                        <Link className="link" to="/advice">advice</Link>
                        <Link className="link" to="/search">search</Link>
                        <Link className="link" to="/emissions">my emissions</Link>
                        <Link className="link" to="/garden">my garden</Link>
                        <Button className="darkgreen-button">
                            <Link to="/signup" className="nav-button">Get Started</Link>
                        </Button>
                        <Button className="cream-button">
                            <Link to="/signin" className="nav-button">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/advice" component={Advice}></Route>
                <Route exact path="/emissions">
                {user ? <Emissions />: 
                        <PleaseSignIn />
                    }
                </Route>
                <Route exact path="/garden">
                    {user ? <Garden plants={this.state.userPlants} /> : 
                        <PleaseSignIn />
                    }
                </Route>
                <Route exact path="/search">
                    <Search stuff={this.state.plants} />
                </Route>
                <Route exact path="/signin">
                    {user ? <SignOutButton setUser={this.setUser} setAuthToken={this.setAuthToken} />
                        :
                        <SignIn setPage={this.setPage} setAuthToken={this.setAuthToken} setUser={this.setUser} />
                    
                    }
                </Route>
                <Route exact path="/signup">
                    {user ? <SignOutButton setUser={this.setUser} setAuthToken={this.setAuthToken} />
                        :
                        <SignUp setPage={this.setPage} setAuthToken={this.setAuthToken} setUser={this.setUser} />
                    }
                </Route>
                {/* this is terrible code im sorry but i cant think of anything else */}
                {this.state.singlePlants}
    
            </Switch>

        </Router>

    );
    }
}

export default App;
