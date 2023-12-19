import React from "react";
import axios from "axios";
import { Flip, toast } from "react-toastify";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

function SignInForm() {
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { username, password } = state;

    axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((data) => {
        toast.success(data?.message ?? "Sucessfully logedIn", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        console.log(data, "res dataa");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ?? "Error", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      });

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="/" className="social">
            <FaFacebook />
          </a>
          <a href="/" className="social">
            <FaGoogle />
          </a>
          <a href="/" className="social">
            <FaLinkedin />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="/">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
