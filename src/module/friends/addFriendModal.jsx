import React, { useState } from 'react';
import './../../style/addFriendsList.css';

const AddFriendModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    address: '',
    bio: '',
    pincode: '',
    logo: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.role.trim()) newErrors.role = 'Role is required';
    if (!form.password.trim()) newErrors.password = 'Password is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.bio.trim()) newErrors.bio = 'Bio is required';
    if (!form.pincode.trim()) newErrors.pincode = 'Pincode is required';
    // logo is optional
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAdd(form);
    setForm({ name: '', email: '', phone: '', role: '', password: '', address: '', bio: '', pincode: '', logo: null });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3 className="modal-title">Add New Friend</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
            <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
            {errors.role && <span className="error-text">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
            <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
          
          <div className="form-group">
            <label>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} />
            {errors.bio && <span className="error-text">{errors.bio}</span>}
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input name="pincode" value={form.pincode} onChange={handleChange} />
            {errors.pincode && <span className="error-text">{errors.pincode}</span>}
          </div>


        

        

          

          <div className="form-group">
            <label>Logo</label>
            <input type="file" name="logo" accept="image/*" onChange={handleChange} />
            {/* logo is optional, no error display */}
          </div>

          <div className="modal-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" onClick={onClose} className="cancel-btn">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriendModal;
