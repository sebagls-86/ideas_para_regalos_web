import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Button from "../../components/button/Button";

function UsersPage() {
  const [user] = useAuthState(auth);
  const { userName } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div>UsersPage {userName}</div>
      {user && (
        <div className="d-flex flex-column gap-3 mt-3">
          <Button
            label="Salir"
            className="btn primary__button"
            onClick={() => auth.signOut()}
          />
        </div>
      )}
    </>
  );
}

export default UsersPage;
