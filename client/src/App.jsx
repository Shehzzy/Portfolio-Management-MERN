// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import AdminPage from './Pages/AdminPage';

function App() {
  return (
    <Router>
      <div>
        <h1>React Authentication</h1>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/admin" component={AdminPage} />
          <Route exact path="/" render={() => <h2>Welcome! Please log in.</h2>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
