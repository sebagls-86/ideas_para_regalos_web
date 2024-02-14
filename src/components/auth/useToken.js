import { useState, useEffect } from "react";

function useToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, saveToken, deleteToken };
}

export default useToken;
