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
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  setFollowers(followers) {
    this.state.followers = followers;
    this.render();
    this.forceUpdate();
  }

  updateInputValue(event) {
    this.setState({value: event.target.value});
  }

  handleUserClick(name){
    this.updateUserList(name);
  }

  updateUserList(name){
    var upperClass = this;
    axios.get('/getFollowers/' + name)
      .then(function (response) {
        upperClass.setFollowers(response.data.data);
        var newFollower = {name: name, followers: response.data.data.length};
        axios.post('/followers/'+name, newFollower)
          .then(function (resp) {
            console.log('Recorded');
          })
      })
      .catch(function (error) {
        alert(error);
      });
  }

  handleSubmit(event) {
    var name = this.state.value;
    var upperClass = this;
    this.updateUserList(name);
    event.preventDefault();
  }

  render() {
    // console.log(this.state.users)
    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <input type="text" className="form-control" value={this.state.value} onChange={this.updateInputValue}/>
            </div>
            <div className="col-md-1">
              <input type="submit" className="btn btn-primary" value="Search followers"/>
            </div>
          </div>
        </form>

        <div>
          {this.state.users.map((user, i) =>
            <h5 style={{marginLeft : 8+'px'}}> {user.name} </h5>
          )}
        </div>

        <div className="row text-center">
          {this.state.followers.map((user, i) =>
            <AddFollower key={i} name={user.login} url={user.avatar_url} action={this.handleUserClick} />
          )}
        </div>
      </div>
    );
  }
  }
;


export default SearchPlayer;