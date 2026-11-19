import { useState } from "react";
import "./App.css";

function App() {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const checkUser = async () => {

    setError("");
    setUser(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`,{
          headers:{
            "Authorization" : `Bearer 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`
          }
        }
      );

      if (!response.ok) {
        throw new Error("User not found!");
      }

      const data = await response.json();

      setUser(data);

    } catch (err) {
      setError(err.message);
    }

  };

  return (
    <div className="container">

      <h1>My GitHub Checker</h1>

      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={checkUser}>
        Check User
      </button>


      {error && <h3>{error}</h3>}

      {user && (
        <div className="profile">

          <img src={user.avatar_url} width="120" />

          <h2>{user.name || user.login}</h2>

          <p>Username: {user.login}</p>

          <p>Public Repositories: {user.public_repos}</p>

          <p>Followers: {user.followers}</p>

          <p>Following: {user.following}</p>

          <a href={user.html_url} target="_blank" rel="noreferrer">
            Visit GitHub Profile
          </a>

        </div>
      )}

    </div>
  );
}

export default App;