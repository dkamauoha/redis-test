import React, { Component } from 'react'
import axios from 'axios';

export default class Cell extends Component {
    constructor () {
        super()
        this.state = {
            key: '',
            newVal: '',
        }
    }
    
    componentDidMount() {
        this.setState({key: this.props.value});
        axios.post('/api/key', {key: this.props.value})
            .then(res => {
                this.setState({newVal: res.data});
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({key: this.props.value})
        }
    }

    render() {
        return (
        <div style={{width: '60%', display: 'flex', justifyContent: 'space-between'}}>
            <h4 style={{border: '2px solid blueviolet', padding: '5px', width: '50%'}}>{this.state.key}: </h4>
            <h4 style={{border: '2px solid blueviolet', padding: '5px', width: '50%'}}>{this.state.newVal}</h4>
        </div>
        )
    }
}
