import React, { useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  //Register the user via endpoint
  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/authenticate/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({ username, password, email }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.detail === "User successfully registered") { // Can change in the API later on and match here
        alert('Registration successful. You can now log in.');
        // navigate("/login");
        window.location.href = `${location.protocol}//${location.host}/authenticate/login`;
      } else { //Better way to handle this error if unable to register?
        setError(data.detail || "Registration failed. Please check your information.");
      }
    })
    .catch(err => {
      console.error('Error:', err);
      setError("Registration failed. Please check your information and try again.");
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
      {/* <Link to="/login">Already have an account? Log in here.</Link> */}
      Already have an account?<a href='/authenticate/login'>Login Here</a>
    </div>
  );
};

export default Register;
