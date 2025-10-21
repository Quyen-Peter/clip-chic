import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/apiClient";
import "../css/VerifyEmail.css";
import Header from "../component/Header";
import Footer from "../component/Footer";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");
  const API_URL = process.env.REACT_APP_HOST_API || "https://localhost:7169";

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await apiRequest<{ message: string }>(
          `${API_URL}/api/Auth/verify-email`,
          {
            method: "POST",
            body: JSON.stringify({ token }),
          }
        );

        setStatus("success");
        setMessage(response.message || "Email verified successfully!");
        setTimeout(() => navigate("/Account/Login"), 3000);
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "An error occurred during verification."
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate, API_URL]);

  return (
    <div>
      <Header />
      <div className="verify-email-container">
        <div className="verify-email-content">
          {status === "loading" && (
            <div className="verify-email-loading">
              <div className="spinner"></div>
              <h2>Verifying your email...</h2>
              <p>Please wait while we verify your email address.</p>
            </div>
          )}

          {status === "success" && (
            <div className="verify-email-success">
              <div className="success-icon">✓</div>
              <h2>Email Verified!</h2>
              <p>{message}</p>
              <p className="redirect-message">Redirecting to login page...</p>
            </div>
          )}

          {status === "error" && (
            <div className="verify-email-error">
              <div className="error-icon">✕</div>
              <h2>Verification Failed</h2>
              <p>{message}</p>
              <button onClick={() => navigate("/Account/Login")}>
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
