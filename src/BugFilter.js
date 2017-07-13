var React = require('react');

class BugFilter extends React.Component {
    onSubmit(event) {
        event.preventDefault();
        var filter = {
            priority: "P2",
            status: "New"
        };
        this.props.handleSubmit(filter);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <button type="submit">Filter</button>
                </form>
            </div>
        )
    }
}

module.exports = BugFilter;