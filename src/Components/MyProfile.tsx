
import React from 'react';
import { Link } from 'react-router-dom';
  
function MyProfile() {
  return (
    <div className="App">
      <header className="App-header">
        <p>My Profile</p>
  
        <Link to="/">go back</Link>
      </header>
    </div>
  );
}
  
export default MyProfile;