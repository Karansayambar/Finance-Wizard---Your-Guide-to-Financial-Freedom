import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "../Header/styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { AiOutlineUser } from "react-icons/ai";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      // window.Location = "/dashbord";
      navigate("/dashbord");
    }
  }, [user, loading]);
  function logoutFun() {
    try {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged Out Successfully");
          // window.Location = "/";
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
        });
    } catch (error) {
      toast.error(error);
    }
    console.log("logout");
  }
  return (
    <div className="navbar">
      <p className="logo">Finance Wizard</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              style={{ borderRadius: "50%", height: "1.5rem", width: "1.5rem" }}
            />
          ) : (
            <AiOutlineUser
              style={{
                borderRadius: "50%",
                height: "2rem",
                width: "2rem",
                color: "var(--white)",
              }}
            />
          )}
          <p className="logo link" onClick={logoutFun}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
