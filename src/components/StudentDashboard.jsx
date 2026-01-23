import { useEffect, useState } from "react";
import api from "../api/apiClient";
import "../css/Dashboard.css";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses/")
      .then(res => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="dashboard-loading">Loading dashboard…</p>;
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Student Dashboard</h1>

      <div className="dashboard-cards">
        {courses.length === 0 ? (
          <div className="dashboard-card empty">
            <h3>No Courses Yet</h3>
            <p>Courses you enroll in will appear here.</p>
          </div>
        ) : (
          courses.map(course => (
            <div key={course.id} className="dashboard-card">
              <h3>{course.title}</h3>
              <p>{course.description || "No description available"}</p>
              <button className="primary-btn">Continue</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
