import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Validate username and password
    if (!username || !password) {
        setError('Username and password are required.');
        return;
    }
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      
      if (response.ok) {
        const data = await response.json();

        if (data.status === 'success') {
          const userData = data.player;

          // Update the user state 
          onLogin(userData);
        } else {
          setError('Invalid username or password');
        }
      } else {
        // authentication error
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="main container">
        <div className="login">
            <div className="ui grid centered">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(e); }}>
                    <div className="fields">
                        <div className="required field">
                            <div className="ui icon input">
                                <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <i className="user icon"></i>
                            </div>
                        </div>
                        <div className="required field">
                            <div className="ui icon input">
                                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <i className="lock icon"></i>
                            </div>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="field">
                            <div className="ui icon input">                            
                                <input type="submit" value="Login" />
                                <i className="right chevron icon"></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
