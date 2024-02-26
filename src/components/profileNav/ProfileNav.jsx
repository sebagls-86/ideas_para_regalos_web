import React, { useState, useEffect } from "react";
import styles from "./profileNav.module.css";
import PostByUser from "../../modules/post/PostByUser";
import WishList from "../../modules/wishList/WishList";
import Profiles from "../../modules/profiles/Profiles";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

function ProfileNav() {
  const { user_id } = useParams();
  const [reloadProfiles, setReloadProfiles] = useState(false);
  const user__id = parseInt(user_id);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.user_id;

  useEffect(() => {
    if (reloadProfiles) {
      setReloadProfiles(false); // Reset to false after reload
    }
  }, [reloadProfiles]);

  return (
    <>
      <div className={styles.profileContent}>
        <Tabs
          defaultActiveKey="publicaciones"
          id="uncontrolled-tab-example"
          className={styles.profileNav}
        >
          <Tab eventKey="publicaciones" title="Publicaciones">
            <div className="p-3">
              <PostByUser user_id={user__id} />
            </div>
          </Tab>
          <Tab eventKey="wishlist" title="Lista de deseados">
            <WishList user_id={user__id} />
          </Tab>
          {userId === user__id ? (
            <Tab eventKey="profiles" title="Perfiles">
              <Profiles reload={reloadProfiles} />
            </Tab>
          ) : (
            ""
          )}
        </Tabs>
      </div>
      <div className={styles.profileContentMobile}>
        <Tabs
          defaultActiveKey="publicaciones"
          id="uncontrolled-tab-example"
          className={styles.profileNav}
        >
          <Tab eventKey="publicaciones" title="Publicaciones">
            <div className="p-3"></div>
          </Tab>
          <Tab eventKey="wishlist" title="Lista">
            <div className=""> hola</div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default ProfileNav;
