import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddFoundForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    date: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (form.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (form.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (form.location.trim() === "") {
      errors.location = "Location is required";
    }
    if (form.date.trim() === "") {
      errors.date = "Date is required";
    }
    if (form.description.trim() === "") {
      errors.description = "Description is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempForm = new FormData();

    tempForm.append("image", imageBlob);

    e.preventDefault();

    const imageData = await axios.post(
      "http://localhost:5000/api/upload",
      tempForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setForm({ ...form, imagePath: imageData.data.imagePath });
    const data = axios.post(
      "http://localhost:5000/api/found/addFoundItem",
      form
    );
    navigate("/");
  };
  const [imageBlob, setImgBlob] = useState(null);
  const handleImageUpload = (e) => {
    if (e.target?.files && e.target?.files[0]) {
      let img = e.target.files[0];
      setImgBlob(img);
    }
  };
  return (
    <div className="form-container">
      <form className="add-lost-form" onSubmit={handleSubmit}>
        <h1>Add Found Item</h1>
        <div className="form-field">
          <input
            type="file"
            alt="lost and found icon"
            onChange={(e) => handleImageUpload(e)}
          />
        </div>

        <div className="form-field">
          <label>Name</label>
          <input
            className="input-field"
            type="text"
            name="name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            className="input-field"
            type="email"
            name="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Phone Number</label>
          <input
            className="input-field"
            type="number"
            maxLength={10}
            name="phone number"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Location</label>
          <input
            className="input-field"
            type="text"
            name="location"
            required
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Date</label>
          <input
            className="input-field"
            type="date"
            name="date"
            required
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Description</label>
          <textarea
            className="input-field"
            name="description"
            required
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddFoundForm;
