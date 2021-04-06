import logo from './logo.svg';
import './App.css';
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
import {SignUp} from './Components/Login/SignUp';
import {SignIn} from './Components/Login/SignIn';
// s

function App() {
  return (
    <Router>
        <Navbar className="green-background">
                <Link to="/">
                    <Navbar.Brand>verdancy</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    <Link to="/advice">advice</Link>
                    <Link to="/search">search</Link>
                    <Link to="/emissions">my emissions</Link>
                    <Link to="/garden">my garden</Link>
                    {/* fix these colors later */}
                    <Button className="darkgreen-background">
                        <Link to="/signup" className="darkgreen-background">Get Started</Link>
                    </Button>
                    <Button className="cream-background">
                        <Link to="/signin" className="cream-background">Sign In</Link>
                    </Button>
                </Nav>
        </Navbar>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/advice" component={Advice}></Route>
            <Route exact path="/emissions" component={Emissions}></Route>
            <Route exact path="/garden" component={Garden}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
        </Switch>

    </Router>

  );
}

export default App;
