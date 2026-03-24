import { useState } from "react";
import { useEffect } from "react";
import "../style/dashboard.css";
import "../style/settings.css";

interface Profile {
  fullName: string;
  email: string;
  role: string;
}
function Settings() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetch("http://207.180.246.69:7200/api/Settings/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.data;
        setProfile(user);
        setEditName(user.fullName);
        setEditEmail(user.email);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://207.180.246.69:7200/api/Settings/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        StaffName: editName,
        email: editEmail,
      }),
    });

    alert("Profile updated");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await fetch("http://207.180.246.69:7200/api/Settings/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
    alert("Password updated");
  };

  if (loading) return <p> Loading profile...</p>;
  if (!profile) return;

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-grid">
        <div className="settings-card profile">
          <h3>Profile Details</h3>
          <p>
            <strong>Name:</strong> {profile.fullName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Role:</strong> {profile.role}
          </p>
        </div>

        <div className="settings-card edit">
          <h3>Edit Profie</h3>
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label> Full Name</label>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>

            <button className="save-btn">Save Changes</button>
          </form>
        </div>

        <div className="settings-card password">
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="save-btn">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
