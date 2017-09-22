import React from 'react'
import AddFollower from './AddFollower'
import axios from 'axios';
import '../CSS/Table.css';

class PopularFollowers extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        popularFollowers : [],
        data: []
      }
    ;
    this.setPopularFollowers = this.setPopularFollowers.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  setPopularFollowers(followers) {
    this.state.popularFollowers = followers;
    this.state.data = followers
    this.render();
    this.forceUpdate();
  }

  componentDidMount(){
    var upperClass = this;
    axios.get('/followers/best')
      .then(function (response) {
        upperClass.setPopularFollowers(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  handleButtonClick(name){
    this.props.action(name);
  }

  render() {
    return (
      <div>
        <table className="table-fill">
          <thead>
          <tr>
            <th className="text-left">Username</th>
            <th className="text-left">Amount of followers</th>
            <th className="text-left">Followers</th>
            <th className="text-left">Link</th>
          </tr>
          </thead>
          <tbody className="table-hover">
          {this.state.popularFollowers.map((user, i) =>
            <tr key={i}>
              <td className="text-center">{user.name}</td>
              <td className="text-center">{user.followers}</td>
              <td className="text-right">
                <button className="btn btn-info" onClick={() => this.handleButtonClick(user.name)}>Check his followers</button>
              </td>
              <td className="text-right">
                <a className="btn btn-info" href={'https://github.com/'+user.name} target="_blank">Github profile</a>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PopularFollowers;