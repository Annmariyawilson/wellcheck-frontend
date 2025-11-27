import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Check } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  // UserType from previous screen
  const userType = location.state?.userType || "Teacher";

  const [form, setForm] = useState({
    firstName: "",
    username: "",
    password: "",
    phone: "",
    dob: "",
    class_id: "",
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  // handle form value change
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Fetch classes from backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          "https://wellcheck-backend.onrender.com/api/classes"
        );
        setClasses(res.data.classes); // adjust if your API returns differently
      } catch (err) {
        console.error("Failed to fetch classes", err);
      }
    };
    fetchClasses();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let url = "";
    let payload = {};

    if (userType === "Student") {
      url = "https://wellcheck-backend.onrender.com/api/student-signup";
      payload = {
        username: form.username,
        password: form.password,
        class_id: form.class_id,
        phone: form.phone,
        dob: form.dob,
      };
    } else {
      url = "https://wellcheck-backend.onrender.com/api/teacher/signup";
      payload = {
        username: form.username,
        password: form.password,
        class_id: form.class_id, 
        phone: form.phone,
        dob: form.dob,
      };
    }

    const res = await axios.post(url, payload);

    alert(`${userType} Account Created Successfully!`);
    navigate("/");

  } catch (err) {
    console.error(err);

    const message = err.response?.data?.message || "";
    if (message.includes("duplicate key value")) {
      alert(
        "This phone number is already registered."
      );
    } else {
      alert(message || "Signup failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#03045E] rounded-full flex items-center justify-center text-white text-xl">
            <Check />
          </div>
          <h1 className="text-2xl font-bold text-[#03045E]">WellCheck</h1>
        </div>

        <h2 className="text-left font-semibold mb-1 text-[#333]">Create Account</h2>
        <p className="text-left text-sm mb-4 text-gray-600">
          Signing up as: <span className="font-semibold">{userType}</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-3"
            required
          />

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => updateField("username", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-3"
            required
          />

          {/* Class Selection */}
          {classes.length > 0 && (
            <select
              value={form.class_id}
              onChange={(e) => updateField("class_id", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-3"
              required
            >
              <option value="" disabled>
                Select Class
              </option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          )}

          {/* DOB */}
          <input
            type="date"
            value={form.dob}
            onChange={(e) => updateField("dob", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-3"
            required
          />

          {/* Phone */}
          <input
            type="number"
            placeholder="Contact Number"
            value={form.phone}
            onChange={(e) =>
              updateField("phone", e.target.value.replace(/\D/g, ""))
            }
            className="w-full border rounded-lg px-4 py-2 mb-3"
            maxLength="10"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-[#A0E7E5] text-[#333] font-semibold hover:bg-[#6CCBC8] transition shadow-md"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm mt-3 text-[#333]">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-[#03045E] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
