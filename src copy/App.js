import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { UserTable } from './UserTable';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import { isValidPhoneNumber } from './helperMethods';
import { sortByAge, sortAlphabetically } from './sortFilters';

// Class that fetches sample data of users from AppSheet's webservice
// and displays the Top 5 Youngest Users with valid phone numbers, by name
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      hasResults: false,
    };
  }

  render() {
    return (
      <BodyBackgroundColor backgroundColor="#ccffcc">
        <div>
          <h2 className="title">Akash Arora - App Sheet Project</h2>
          {this.state.hasResults ? (
            <UserTable
              data={this.state.users}
              title="The Top Five Youngest Users with Valid Phone Numbers, by Name"
            />
          ) : (
            <div className="button__container" onClick={this.handleClick}>
              <button className="button">Get Results</button>
            </div>
          )}
        </div>
      </BodyBackgroundColor>
    );
  }

  // post: calls <fetchUserIds>
  handleClick = event => {
    this.fetchUserIds();
  };

  // pre: Takes in an optional token that can be used to retrieve another list of User ID's
  // post:  Makes a request to AppSheet's web service using an optional token to retrieve
  //        (1) a list of User ID's and (2 -- optional) a token.
  //        Passes the list of User ID's and token to <handleIdList()>
  //        If token retrieved, function invokes self with token
  fetchUserIds = token => {
    const params = token ? { token: token } : {};
    axios
      .get('https://appsheettest1.azurewebsites.net/sample/list', {
        params,
      })
      .then(response => {
        const token = response.data.token ? response.data.token : '';
        if (token) {
          this.fetchUserIds(token);
        }
        if (response.data && response.data.result) {
          this.handleIdList(response.data.result, token);
        }
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };

  // pre: Takes in a List of User ID's and a token
  // post: Makes a request to AppSheet's webservice to fetch details on each User.
  //       Sends each User to <validateUser()>.
  //       Upon retrieving all users' details in the LAST List of User ID's,
  //          Sorts and filters Users and stores the Top Five Youngest Users by Name
  handleIdList = (list, token) => {
    let promiseArr = list.map(id => {
      return axios
        .get('https://appsheettest1.azurewebsites.net/sample/detail/' + id)
        .then(response => {
          this.validateUser(response);
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
    });
    Promise.all(promiseArr).then(() => {
      if (!token) {
        console.log(this.state.users);
        this.setState({
          users: sortAlphabetically(sortByAge(this.state.users).slice(0, 5)),
          hasResults: true,
        });
      }
    });
  };

  // pre: Takes in a User object
  // post: Stores User object if User has data and a valid phone number
  validateUser = userDetail => {
    if (userDetail.data && isValidPhoneNumber(userDetail.data.number)) {
      this.setState({
        users: this.state.users.concat(userDetail.data),
      });
    }
  };
}

export default App;
