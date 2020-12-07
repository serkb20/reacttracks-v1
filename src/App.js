
import React, { Suspense } from 'react';
import './App.css';
const Navigation = React.lazy(() => import('./components/Navigation'));
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const MusicItemClass = React.lazy(() => import('./components/MusicItemClass'));
const Liked = React.lazy(() => import('./components/Liked'));

class App extends React.Component{

  constructor(){
    super();
    this.state={
      route: 'login',
      login: false,
      user: []
    }
  }

  onRouteChange=(log)=>{
      this.setState({route: log});
  }

  onLoginChange=(nav)=>{
    this.setState({login: nav});
  }

  loadUser=(user)=>{
    this.setState({user: user});
  }

  componentDidMount() {

    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3001/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3001/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => response.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(user)
                this.onRouteChange('itemclass');
                this.onLoginChange(true);
              }
            })
          }
        })
        .catch(console.log)
    }
  }

  render(){
    const { route, login, user, tracklist } = this.state;
    if(route === 'login'){
      return(
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <Navigation 
                onRouteChange={this.onRouteChange} 
                onLoginChange={this.onLoginChange} 
                login={login} 
                route={route}
                user={user}
              />
              <Login 
                onRouteChange={this.onRouteChange} 
                onLoginChange={this.onLoginChange} 
                loadUser={this.loadUser}
              />
            </Suspense>
          </div>
      );
    }
    if(route === 'register'){
      return(
        <div>
            <Suspense fallback={<div>Loading...</div>}>
              <Navigation 
                onRouteChange={this.onRouteChange} 
                onLoginChange={this.onLoginChange} 
                login={login} 
                route={route}
                user={user}
              />
              <Register 
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
                onLoginChange={this.onLoginChange}
              />
            </Suspense>
        </div>
      );
    }
    if(route === 'like'){
      return(
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation 
              onRouteChange={this.onRouteChange} 
              onLoginChange={this.onLoginChange} 
              login={login} 
              route={route}
              user={user}
            />
            <Liked user={user}/>
          </Suspense>
        </div>
      );
    }
    if(route === 'itemclass'){
      return(
        <div>
           <Suspense fallback={<div>Loading...</div>}>
              <Navigation 
                onRouteChange={this.onRouteChange} 
                onLoginChange={this.onLoginChange} 
                login={login} 
                route={route}
                user={user}
              />
              <MusicItemClass 
                user={user}
                tracklist={tracklist}
                fetchData={this.fetchData}
              />
           </Suspense>
        </div>
      );
    }
  
  }
}

export default App;
