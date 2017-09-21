import React from 'react'
import '../App.css';
import '../PlayerStats.css';
import ReactDOM from 'react-dom'
import axios from 'axios';
import AddFollower from './AddFollower'

class SearchPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state =
    {
      value : '',
      users: [],
      followers : [],

    }
    ;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setFollowers(followers) {
    this.state.followers = followers;
    this.render();
    this.forceUpdate();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('here I AM')
    console.log(this.state.value);
    this.setState({value: event.target.value});
    var upperClass = this;
    axios.get('/getFollowers/' + this.state.value)
      .then(function (response) {
        console.log(response.data.data)
        upperClass.setFollowers(response.data.data);
        upperClass.state.users.push({name:upperClass.state.value});
      })
      .catch(function (error) {
        alert(error);
      });
    event.preventDefault();
  }

  render() {
    console.log(this.state.users)
    return (
      <div>
        <div>
          {this.state.users.map((user, i) =>
            <h4>{user.name}</h4>
          )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}/>
            </div>
            <div className="col-md-1">
              <input type="submit" className="btn btn-primary" value="Search followers"/>
            </div>
          </div>
        </form>
        <div className="row text-center">
          {this.state.followers.map((user, i) =>
            <AddFollower key={i} name={user.login} url={user.avatar_url} />
          )}
        </div>
      </div>
    );
  }
  }
;


export default SearchPlayer;