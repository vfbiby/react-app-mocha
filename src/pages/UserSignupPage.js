import { useState } from "react";

export const UserSignupPage = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const handleSignup = () => {
    const user = {
      username,
      displayName,
      password,
    };
    if (props.actions) {
      setPendingApiCall(true);
      props.actions
        .postSignup(user)
        .then(() => {
          setPendingApiCall(false);
        })
        .catch(() => {
          setPendingApiCall(false);
        });
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your display name"
        />
      </div>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
        />
      </div>
      <div>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your password"
        />
      </div>
      <div>
        <input
          type="text"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          type="password"
          placeholder="Repeat your password"
        />
      </div>
      <div>
        <button disabled={pendingApiCall} onClick={handleSignup}>
          {pendingApiCall && <span>loading...</span>}
          Sign Up
        </button>
      </div>
    </div>
  );
};
