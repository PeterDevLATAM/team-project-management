import "./signup.styles.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null); //img
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    const file = e.target.files[0];
    /* console.log(file)
    File {name: 'Screen Shot 2022-03-21 at 3.22.46 PM.png', lastModified: 1647894171865, lastModifiedDate: Mon Mar 21 2022 15:22:51 GMT-0500 (Ecuador Time), webkitRelativePath: '', size: 91329, …}
    lastModifiedDate: Mon Mar 21 2022 15:22:51 GMT-0500 (Ecuador Time) {}
    name: "Screen Shot 2022-03-21 at 3.22.46 PM.png"
    lastModified: 1647894171865
    size: 91329
    type: "image/png"
    webkitRelativePath: ""
    [[Prototype]]: File */
    if (!file) {
      setThumbnailError("Please Select a file");
      return;
    }
    if (!file.type.includes("image")) {
      setThumbnailError("Please Select an image File ");
      return;
    }
    if (file.size > 10000) {
      setThumbnailError("Please Select an image file smaller than 100kB");
      return;
    }

    setThumbnailError(null);
    setThumbnail(file);
    console.log("thumbnail updated");
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input type="file" onChange={handleFileChange} required />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign Up</button>}
      {isPending && <button className="btn" disabled>Loading..</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
