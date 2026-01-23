import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = () => {
  const { hasRole } = useAuth();

  // Admin never uses this dashboard
  if (hasRole("admin")) {
    return <Navigate to="/admin" replace />;
  }

  // Teacher vs Student
  return hasRole("teacher")
    ? <TeacherDashboard />
    : <StudentDashboard />;
};

export default Dashboard;
