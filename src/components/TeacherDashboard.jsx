import { useEffect, useState } from "react";
import api from "../api/apiClient";
import "../css/Dashboard.css";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses/?mine=true")
      .then(res => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="dashboard-loading">Loading dashboard…</p>;
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Teacher Dashboard</h1>

      <div className="dashboard-cards">
        {courses.length === 0 ? (
          <div className="dashboard-card empty">
            <h3>No Courses Created</h3>
            <p>Create your first course to get started.</p>
            <button className="primary-btn">+ Create Course</button>
          </div>
        ) : (
          courses.map(course => (
            <div key={course.id} className="dashboard-card">
              <h3>{course.title}</h3>
              <p>{course.description || "No description available"}</p>
              <button className="secondary-btn">Manage</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
