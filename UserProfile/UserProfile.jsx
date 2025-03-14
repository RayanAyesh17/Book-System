import { useState } from "react";
import "./UserProfile.css"; // External styling

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "🌟 John Doe",
    username: "📚 john_doe",
    email: "johndoe@example.com",
    bio: "📖 Book lover | Exploring new worlds through books!",
    profileImage: null,
    location: "📍 New York, USA",
    birthday: "🎂 1995-06-15",
    twitter: "",
    instagram: "",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [editing, setEditing] = useState(false);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className={`profile-container ${darkMode ? "dark-mode" : ""}`}>
      <button className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="profile-card">
        {/* Profile Image */}
        <div className="profile-image">
          <label htmlFor="imageUpload">
            <img src={user.profileImage || "/default-avatar.png"} alt="Profile" />
          </label>
          <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          {editing ? (
            <>
              <label>👤 Name:</label>
              <input type="text" name="name" value={user.name} onChange={handleChange} />

              <label>💡 Username:</label>
              <input type="text" name="username" value={user.username} onChange={handleChange} />

              <label>📝 Bio:</label>
              <textarea name="bio" value={user.bio} onChange={handleChange} />
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p className="username">@{user.username}</p>
              <p className="bio">{user.bio}</p>
            </>
          )}

          {/* Editable Fields */}
          <label>📍 Location:</label>
          <input type="text" name="location" value={user.location} onChange={handleChange} />

          <label>🎂 Birthday:</label>
          <input type="date" name="birthday" value={user.birthday} onChange={handleChange} />

          <label>🐦 Twitter:</label>
          <input type="text" name="twitter" placeholder="Twitter profile link" value={user.twitter} onChange={handleChange} />

          <label>📷 Instagram:</label>
          <input type="text" name="instagram" placeholder="Instagram profile link" value={user.instagram} onChange={handleChange} />

          {/* Edit / Save Button */}
          <button className="save-btn" onClick={() => setEditing(!editing)}>
            {editing ? "✅ Save Changes" : "✏️ Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
