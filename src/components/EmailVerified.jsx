// src/pages/EmailVerified.jsx
import { useSearchParams, Link } from "react-router-dom";

export default function EmailVerified() {
  const [params] = useSearchParams();
  const status = params.get("status");

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>✅ Email Verified</h2>
        <p>Your email has been successfully verified.</p>
        <Link to="/login">Proceed to Login</Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>❌ Verification Failed</h2>
      <p>The link is invalid or has expired.</p>
      <Link to="/resend-verification">Resend verification email</Link>
    </div>
  );
}
