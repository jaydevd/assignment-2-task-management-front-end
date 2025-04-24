import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import io from 'socket.io-client';

import AdminDashboard from './pages/admin/Dashboard';
import AdminLogIn from './pages/admin/LogIn';

import UserDashboard from './pages/user/Dashboard';
import UserLogIn from './pages/user/LogIn';
import UserSignUp from './pages/user/SignUp';

const socket = io.connect('http://localhost:5000');

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <UserLogIn
                username={username}
                setUsername={setUsername}
                socket={socket}
              />
            }
          />
          <Route path="/user">
            <Route
              path='/user/dashboard'
              element={<UserDashboard socket={socket} username={username} setUsername={setUsername} />}
            />
            <Route
              path='/user/signup'
              element={
                <UserSignUp
                  username={username}
                  setUsername={setUsername}
                  socket={socket}
                />
              }
            />
          </Route>
          <Route path="/admin">
            <Route
              path='/admin/dashboard'
              element={<AdminDashboard socket={socket} username={username} setUsername={setUsername} />}
            />
            <Route
              path='/admin/login'
              element={
                <AdminLogIn
                  username={username}
                  setUsername={setUsername}
                  socket={socket}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;