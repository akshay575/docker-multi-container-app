import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            seenIndexes: [],
            values: {},
            index: ''
        }
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        // data from redis has index, value pairs
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        // data from table has only indexes
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: '' });
    } 

    renderRows() {
        const entries = [];
        let count = 1;
        for (let key in this.state.values) {
            entries.push(
                <tr key={key}>
                    <th scope="row">{ count }</th>
                    <td>{ key }</td>
                    <td>{ this.state.values[key] }</td>
                </tr>
            );
            count++;
        }
        return entries;
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <div className="form-group mb-2">
                            <input type="text" readOnly className="form-control-plaintext" value="Enter your index: " />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" className="form-control" value={ this.state.index }
                                onChange={event => this.setState({ index: event.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    </form>
                    <br />

                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Indexes Searched</th>
                            <th scope="col">Values Calculated</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderRows() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Fib;