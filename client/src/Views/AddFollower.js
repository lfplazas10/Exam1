import React from 'react'
import {Link} from 'react-router'
import '../App.css';

class AddFollower extends React.Component {
  render() {
    return <div className="col-lg-3 col-md-6 mb-4">
      <div className="card">
        <img className="card-img-top" src={this.props.url} alt="Profile pic"></img>
        <div className="card-body">
          <h4 className="card-title">{this.props.name}</h4>
        </div>
        <div className="card-footer">
          <Link className="btn btn-primary" to={{pathname: '/' + this.props.name + '/stats', query: this.props}}>See this user followers</Link>
          {/*<button >Find Out More!</button>*/}
        </div>
      </div>
    </div>;
  }
}



export default AddFollower;