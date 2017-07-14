var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./BugList');

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;
var Switch = ReactRouter.Switch;

class NoMatch extends React.Component {
    render() {
        return (
            <h2>No Match</h2>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/bugs' component={BugList}/>
                        <Redirect from='/' to='/bugs' />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('main')
);