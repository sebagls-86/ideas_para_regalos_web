import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Nav from "../../modules/nav/Nav";
import Button from "../../components/button/Button";
import SimplePageTitle from "../../components/simplePageTittle/SimplePageTitle";
import ImgPageTitle from "../../components/imgPageTitle/ImgPageTitle";
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
      {user && (
        <div className="d-flex flex-column gap-3 mt-3">
          <Button
            label="Salir"
            className="btn primary__button"
            onClick={() => auth.signOut()}
          />
        </div>
      )}
      
      <div className="contenedor">
        <div className="left__aside">{user && <Nav />}</div>
        <div className="content">
          <ImgPageTitle title="Perfil"/>
        </div>
        
        <aside className="right__aside">
          <div className="container pt-2">
            
          </div>
        </aside>
      </div>
    </>
  );
}

export default UsersPage;
