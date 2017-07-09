var bugs = [
    {
        id: 1,
        priority: 'P1',
        status: 'Open',
        owner: 'Andy',
        title:'App crashes on refresh'
    },
    {
        id: 2,
        priority: 'P1',
        status: 'New',
        owner: 'John',
        title: 'Misaligned border on panel'
    }];



class BugRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.bug.id}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }
}

class BugFilter extends React.Component {
    render() {
        return (
            <div>Filter section</div>
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
                            <BugRow bug={bug} />
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

class BugAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
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
                id: null,
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
        console.log(identifier);
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
                />
                <input
                    placeholder='status'
                    type='text'
                    autoComplete='off'
                    value={this.state.status}
                    onChange={this.handleChange.bind(this)}
                />
                <input
                    placeholder='owner'
                    type='text'
                    autoComplete='off'
                    value={this.state.owner}
                    onChange={this.handleChange.bind(this)}
                />
                <input
                    placeholder='title'
                    type='text'
                    autoComplete='off'
                    value={this.state.title}
                    onChange={this.handleChange.bind(this)}
                />
                <button type="submit">Add Bug</button>
            </form>
        )
    }
}

class BugList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bugs: bugs
        }
    }

    addBug(bugObj) {
        console.log("Adding New Bug")
        var currentBugs = this.state.bugs;

        bugObj.id = currentBugs.length + 1;
        currentBugs.push(bugObj);
        this.setState(function() {
            return {
                bugs: currentBugs
            };
        })
    }

    render() {
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter />
                <BugTable bugs={this.state.bugs}/>
                <BugAdd handleSubmit={this.addBug.bind(this)} />
            </div>
        )
    }
};

ReactDOM.render(
    <BugList />,
    document.getElementById('main')
);