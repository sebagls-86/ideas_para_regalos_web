import React, { useEffect, useState } from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import { Col } from "react-bootstrap";
import Nav from "../../modules/nav/Nav";
import Post from "../../modules/post/Post";
import NavBar from "../../modules/navBar/NavBar";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import NuevoRegaloHome from "../../components/nuevoRegaloHome/NuevoRegaloHome";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/button/Button";

function HomePage() {
  const [tokenExists, setTokenExists] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userMetadata, setUserMetadata] = useState(null);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const domain = "dev-oraf1nl35nag2oxd.us.auth0.com";

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        console.log("accessToken", accessToken);
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
        console.log("user_metadata", user_metadata);  
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [ getAccessTokenWithPopup, user?.sub]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      setTokenExists(true);
    }
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const sendToken = async () => {
    try {
      const accessToken = await getAccessTokenWithPopup({
           authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });

      console.log("accessToken", accessToken);
      // Configurar los datos para la solicitud POST
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` // Agregar el token como encabezado de autorización
        },
        body: JSON.stringify({}) // Agregar aquí el cuerpo de la solicitud si es necesario
      };
  
      // Realizar la solicitud POST
      const response = await fetch('http://localhost:8080/api/v1/users/verify', requestOptions);
      
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json();
        // Manejar la respuesta exitosa aquí
        console.log('Respuesta exitosa:', data);
      } else {
        // Manejar errores de la respuesta
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener el token de acceso o al realizar la solicitud:', error);
    }
  };

  console.log("Usuario:", user);
  console.log("token", accessToken);

  return (
    <>
      {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.sub}</p>
        </div>
      )}
      {(!tokenExists && !isAuthenticated)}
      <NavBar />
      <div className="contenedor">
        <div className="left__aside">{(tokenExists || isAuthenticated) && <Nav user={user?.displayName} />}</div>
        <div className="content">
          <PageTitle title="Inicio" />
          
          {(!isAuthenticated && !tokenExists) && <Col>
            {/* <LoginMobile /> */}
          </Col>}
          <NuevoRegaloHome></NuevoRegaloHome>
          <Button onClick={sendToken}>Enviar Token</Button>
          <div className="mt-3 p-3 bordes-y">
            <Post />
          </div>
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            {(isAuthenticated || tokenExists)}
            {(!isAuthenticated && !tokenExists) && <AsideLogin />}
            {(isAuthenticated || tokenExists) && (
              <div>
                <EventSnipet />
                <UserSuggestions />
                <div className="mt-5 d-flex justify-content-center ">
                  <Links
                    title="Post nuevo regalo"
                    url="/nuevoRegalo"
                    type={"primary"}
                  />
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

export default HomePage;
