import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { User, Edit, Trash2, UploadCloud } from 'lucide-react';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const Profile = () => {
  const { user: currentUser, userData, loading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(userData?.photoURL || '');
  const fileInputRef = useRef();

  if (loading) return <div className="text-center mt-20 text-white">Loading...</div>;
  if (!currentUser) return <div className="text-center mt-20 text-red-500">You are not logged in.</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_preset_name");

  const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image to Cloudinary");

  const data = await res.json();
  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};


  const handleSave = async () => {
  if (!currentUser) {
    alert("User not logged in. Please refresh and try again.");
    return;
  }

  try {
    let photoURL = userData?.photoURL;

    if (imageFile) {
      photoURL = await uploadToCloudinary(imageFile);
      await updateProfile(currentUser, { photoURL });
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    await setDoc(userDocRef, {
      ...formData,
      photoURL,
    }, { merge: true });

    alert("Profile updated!");
    setEditMode(false);
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
};

  const handleDelete = async () => {
  if (!currentUser) {
    alert("User not logged in. Please refresh and try again.");
    return;
  }

  const confirmed = window.confirm("Are you sure you want to delete your profile? This action cannot be undone!");
  if (!confirmed) return;

  try {
    const password = prompt("Please re-enter your password to confirm:");

    if (!password) {
      alert("Password required for account deletion.");
      return;
    }

    const credential = EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, credential);

    await deleteDoc(doc(db, "users", currentUser.uid));
    await deleteUser(currentUser);

    alert("Profile deleted successfully.");
  } catch (err) {
    console.error("Delete error:", err.message);
    alert("Failed to delete profile: " + err.message);
  }
};

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-2xl p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">Profile Settings</h1>
            <div className="flex space-x-2">
              <button onClick={() => setEditMode(!editMode)} className="btn-primary flex items-center space-x-2">
                <Edit className="w-5 h-5" />
                <span>{editMode ? 'Cancel' : 'Edit Profile'}</span>
              </button>
              <button onClick={handleDelete} className="btn-danger flex items-center space-x-2">
                <Trash2 className="w-5 h-5" />
                <span>Delete Profile</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 text-center card-glass p-4">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>

              {editMode && (
                <>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
                  <button onClick={() => fileInputRef.current.click()} className="btn-primary flex items-center mx-auto space-x-2">
                    <UploadCloud className="w-5 h-5" />
                    <span>Upload Image</span>
                  </button>
                </>
              )}

              <h2 className="text-xl font-semibold text-white mt-4 mb-2">
                {formData?.name || 'User Name'}
              </h2>
              <p className="text-purple-300 capitalize">{formData?.userType || 'User'}</p>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-glass p-4 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-2">Personal Info</h3>
                <label className="block text-white/70">Email: {formData?.email || 'example@gmail.com'}</label>
                <input disabled value={formData?.email} className="w-full bg-white/10 rounded px-4 py-2 text-white" />

                <label className="block text-white/70 mt-2">Name</label>
                <input name="name" value={formData?.name || ''} onChange={handleChange} disabled={!editMode}
                  className="w-full bg-white/10 rounded px-4 py-2 text-white" />

                <label className="block text-white/70 mt-2">Phone</label>
                <input name="phone" value={formData?.phone || ''} onChange={handleChange} disabled={!editMode}
                  className="w-full bg-white/10 rounded px-4 py-2 text-white" />

                <label className="block text-white/70 mt-2">Location</label>
                <input name="location" value={formData?.location || ''} onChange={handleChange} disabled={!editMode}
                  className="w-full bg-white/10 rounded px-4 py-2 text-white" />
              </div>

              {formData?.userType === 'freelancer' && (
                <div className="card-glass p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Professional Info</h3>

                  <label className="block text-white/70 mt-2">Skills</label>
                  <input name="skills" value={formData?.skills || ''} onChange={handleChange} disabled={!editMode}
                    className="w-full bg-white/10 rounded px-4 py-2 text-white" />

                  <label className="block text-white/70 mt-2">Portfolio</label>
                  <input name="portfolio" value={formData?.portfolio || ''} onChange={handleChange} disabled={!editMode}
                    className="w-full bg-white/10 rounded px-4 py-2 text-white" />
                </div>
              )}

              {formData?.userType === 'client' && (
                <div className="card-glass p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Company Info</h3>

                  <label className="block text-white/70 mt-2">Company</label>
                  <input name="company" value={formData?.company || ''} onChange={handleChange} disabled={!editMode}
                    className="w-full bg-white/10 rounded px-4 py-2 text-white" />

                  <label className="block text-white/70 mt-2">Industry</label>
                  <input name="industry" value={formData?.industry || ''} onChange={handleChange} disabled={!editMode}
                    className="w-full bg-white/10 rounded px-4 py-2 text-white" />

                  <label className="block text-white/70 mt-2">Website</label>
                  <input name="website" value={formData?.website || ''} onChange={handleChange} disabled={!editMode}
                    className="w-full bg-white/10 rounded px-4 py-2 text-white" />
                </div>
              )}

              {editMode && (
                <button onClick={handleSave} className="btn-primary w-full py-3 mt-4">
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;