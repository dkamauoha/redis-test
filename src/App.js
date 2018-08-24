import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Cell from './components/Cell';

class App extends Component {
  state = {
    key: '',
    val: '',
    newVal: '',
    createdCell: '',
    allKeys: [],
  }

  componentDidMount() {
    axios.get('/api/keys').then(res => this.setState({allKeys: res.data}))
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getOneCell() {
    axios.post('/api/key', {key: this.state.key})
      .then(res => {
        this.setState({newVal: res.data})
      })
  }

  addCell () {
    axios.post('/api/createcell', {key: this.state.key, val: this.state.val})
      .then((res) => {
        this.setState({createdCell: res.data});
        this.componentDidMount();
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <h3> Test Stuff </h3>        
        <div>
          <p>Key</p>
          <input name='key' onChange={(e) => this.handleChange(e)}/> 
        </div>
        <div>
          <p>Val</p>
          <input name='val' onChange={(e) => this.handleChange(e)}/>
        </div>
        <button onClick={() => this.addCell()}>Send</button>
        <div>
          <button onClick={() => this.getOneCell()}>Get One Key</button>
        </div>
        
        <hr />
        <div>
          <p>{this.state.newVal}</p>
          <p>{this.state.createdCell}</p>       
        </div>
        <div>
          {this.state.allKeys === [] 
              ? <div></div>
              : this.state.allKeys.map((e, i) => (
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                <Cell key={i}
                  value={e}/>
                  </div>
              ))}
        </div>
          
        
      </div>
    );
  }
}

export default App;
