var React = require('react');
var $ = require('jquery');
var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

class BugRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.bug._id}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }
}

class BugTable extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.bugs.map((bug) => {
                        return (
                            <BugRow bug={bug} key={bug._id}/>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}


class BugList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: []
        }
    }

    componentDidMount() {
        this.loadData({});
    }

    handleFilter(obj) {
        this.loadData(obj);
    }

    loadData(filter) {
        var url = 'http://localhost:3000/api/bugs';
        $.ajax(url, {data: filter}).done(function(data) {
            this.setState(function() {
                return {
                    bugs: data
                }
            })
        }.bind(this));
    }

    addBug(bugObj) {
        console.log("Adding New Bug");

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/bugs",
            data: JSON.stringify(bugObj),
            contentType: "application/json"
        }).done(function(data) {
                this.setState(() => {
                    var currentState =  this.state.bugs;
                    currentState.push(data);
                    return currentState;
                })
            }.bind(this)).fail(function( jqXHR, textStatus, error ) {
              alert( "Request failed because: " + textStatus + error );
            }.bind(this));
    }

    render() {
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter handleSubmit={this.handleFilter.bind(this)}/>
                <BugTable bugs={this.state.bugs}/>
                <BugAdd handleSubmit={this.addBug.bind(this)}/>
            </div>
        )
    }
}

module.exports = BugList;