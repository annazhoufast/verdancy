import logo from './logo.svg';
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
import './App.css';
import './index.css';
// s

function App() {
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
        </Switch>

    </Router>

  );
}

export default App;
