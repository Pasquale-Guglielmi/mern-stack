var React = require('react');

function QueryStringToJSON(queryString) {
    var pairs = queryString.slice(1).split('&');

    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

class BugFilter extends React.Component {
    constructor(props) {
        super(props);
        var initState = {};
        var filterJSON = QueryStringToJSON(this.props.initFilter);
        if (filterJSON.hasOwnProperty('priority')) {
            initState.priority = filterJSON.priority;
        }
        if (filterJSON.hasOwnProperty('status')) {
            initState.status = filterJSON.status;
        }
        this.state = initState;
    }

    handleChange(event) {
        var value = event.target.value;
        var identifier = event.target.name;
        var newState = {};
        newState[identifier] = value;
        this.setState(function() {
            return newState;
        })
    }

    onSubmit(event) {
        event.preventDefault();
        var newState = {};
        if (this.state.priority) {
            newState.priority = this.state.priority;
        }
        if (this.state.status) {
            newState.status = this.state.status;
        }
        this.props.handleSubmit(newState);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label htmlFor="priority">Priority</label>
                    <select
                        name="priority"
                        id="priority"
                        value={this.state.priority}
                        onChange={this.handleChange.bind(this)}>
                            <option value="">All</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                    </select>
                    <br/>
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={this.state.status}
                        onChange={this.handleChange.bind(this)}>
                            <option value="">All</option>
                            <option value="New">New</option>
                            <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <br/>
                    <button type="submit">Filter</button>
                </form>
            </div>
        )
    }
}

module.exports = BugFilter;