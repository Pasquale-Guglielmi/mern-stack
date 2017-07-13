var React = require('react');

class BugFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priority: '',
            status: ''
        }
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
        this.props.handleSubmit(this.state);
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