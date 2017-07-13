var React = require('react');

class BugAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priority: '',
            status: '',
            owner: '',
            title: ''
        }
    }

    onSubmit() {
        event.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState(function() {
            return {
                priority: '',
                status: '',
                owner: '',
                title: ''
            }
        })
    }

    handleChange(event) {
        var value = event.target.value;
        var identifier = event.target.placeholder;
        var newState = {};
        newState[identifier] = value;
        this.setState(function() {
            return newState;
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <input
                    placeholder='priority'
                    type='text'
                    autoComplete='off'
                    value={this.state.priority}
                    onChange={this.handleChange.bind(this)}
                    required
                />
                <input
                    placeholder='status'
                    type='text'
                    autoComplete='off'
                    value={this.state.status}
                    onChange={this.handleChange.bind(this)}
                    required
                />
                <input
                    placeholder='owner'
                    type='text'
                    autoComplete='off'
                    value={this.state.owner}
                    onChange={this.handleChange.bind(this)}
                    required
                />
                <input
                    placeholder='title'
                    type='text'
                    autoComplete='off'
                    value={this.state.title}
                    onChange={this.handleChange.bind(this)}
                    required
                />
                <button type="submit">Add Bug</button>
            </form>
        )
    }
}

module.exports = BugAdd;
