import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import "../css/Login.css";
const API_URL = process.env.REACT_APP_HOST_API;

const LoginWith = () => {
  const clientId =
    "239599596531-2baf0u2drokrdalqb2am9lvbt6psg1q1.apps.googleusercontent.com";

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        try {
          window.google.accounts.id.cancel();
          window.google.accounts.id.disableAutoSelect();
          clearInterval(interval);
        } catch (err) {
          console.log("Google One Tap chưa khởi tạo, thử lại...");
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

const handleGoogleSuccess = async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential);

  try {
    const response = await fetch(`${API_URL}/api/Auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idToken: credentialResponse.credential,
      }),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (response.ok) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("isLoggedIn", "true");
      window.location.href = "/Account";
    } else {
      console.error("Login failed:", data);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};


  const handleGoogleError = () => console.log("Google Login Failed");
  const appId = "818845790539632";

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
    };

    if (!document.getElementById("facebook-jssdk")) {
      const js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      document.body.appendChild(js);
    }
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Facebook login success:", response);
          window.FB.api("/me", { fields: "name,email,picture" }, function (user) {
            console.log("Facebook user:", user);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userName", user.name);
            sessionStorage.setItem("userEmail", user.email);
            sessionStorage.setItem("userAvatar", user.picture.data.url);
            window.location.href = "/Account";
          });
        } else {
          console.log("Facebook login cancelled");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="social-login">
      <button
        onClick={handleFacebookLogin}
        style={{
          backgroundColor: "#4564b5",
          color: "white",
          border: "none",
          borderRadius: "20px",
          padding: "9px 20px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "200px",
        }}
      >
        Facebook
      </button>

      <a style={{ margin: "0 10px" }}>|</a>

      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          ux_mode="popup"
          auto_select={false}
          useOneTap={false}
          prompt="select_account"
          text="signin_with"
          shape="pill"
          width="200"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginWith;
