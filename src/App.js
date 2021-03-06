import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( ()=>{
    const itemStored = localStorage.getItem('isLoggedIn');
    if(itemStored === '1'){
      setIsLoggedIn(true);
    }
  },[]);//useEffect need two things one is a function which can
  //be arrow function and other dependency array so that this useEffect runs when
  // ever those get changed.

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn','1');

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,
    onLogOut:logoutHandler
    }}>
      <MainHeader   />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
