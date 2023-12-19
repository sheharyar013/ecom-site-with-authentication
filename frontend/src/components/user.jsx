import axios from "axios";
import React, { useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";

export const Users = () => {
  const [usersList, setUserList] = useState([]);
  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUserList(res?.data);
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
  };

  return (
    <>
      {usersList?.users?.map((user, userIndex) => (
        <div key={userIndex}>{user?.username}</div>
      ))}
    </>
  );
};
