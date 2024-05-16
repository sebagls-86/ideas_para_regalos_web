import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./nuevoRegaloHome.module.css";
import MyIcon from "../myIcon/MyIcon";
import { Link } from "react-router-dom";
import Links from "../link/Links";

function NuevoRegaloHome() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <>
      <div className={styles.nuevoRegaloContainer}>
        {" "}
        {userInfo && userInfo.data?.avatar ? (
          <div className={styles.avatarContainer}>
            <img
              src={userInfo.data.avatar}
              alt="imagen perfil usuario"
              width={"54px"}
              height={"54px"}
              style={{ borderRadius: "50%" }}
            />
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
          >
            <circle cx="27" cy="27" r="27" fill="#A9D097" />
            <path
              d="M22.8551 13.6106L25.0573 17.3568H20.4188C19.0203 17.3568 17.8875 16.2241 17.8875 14.8256C17.8875 13.4271 19.0203 12.2943 20.4188 12.2943H20.558C21.5009 12.2943 22.3805 12.7943 22.8551 13.6106ZM14.85 14.8256C14.85 15.7368 15.0715 16.5975 15.4575 17.3568H12.825C11.705 17.3568 10.8 18.2618 10.8 19.3818V23.4318C10.8 24.5519 11.705 25.4568 12.825 25.4568H41.175C42.2951 25.4568 43.2 24.5519 43.2 23.4318V19.3818C43.2 18.2618 42.2951 17.3568 41.175 17.3568H38.5425C38.9286 16.5975 39.15 15.7368 39.15 14.8256C39.15 11.7501 36.6568 9.25684 33.5813 9.25684H33.4421C31.4234 9.25684 29.5503 10.3263 28.5251 12.0665L27 14.6674L25.475 12.0729C24.4498 10.3263 22.5767 9.25684 20.558 9.25684H20.4188C17.3433 9.25684 14.85 11.7501 14.85 14.8256ZM36.1125 14.8256C36.1125 16.2241 34.9798 17.3568 33.5813 17.3568H28.9428L31.145 13.6106C31.6259 12.7943 32.4992 12.2943 33.4421 12.2943H33.5813C34.9798 12.2943 36.1125 13.4271 36.1125 14.8256ZM12.825 27.4818V38.6193C12.825 40.2963 14.1856 41.6568 15.8625 41.6568H24.975V27.4818H12.825ZM29.025 41.6568H38.1375C39.8145 41.6568 41.175 40.2963 41.175 38.6193V27.4818H29.025V41.6568Z"
              fill="#139CBA"
            />
          </svg>
        )}
        <Link to="/nuevoRegalo" className="w-100">
          <Form.Control
            type="text"
            id=""
            aria-describedby="passwordHelpBlock"
            placeholder="¿Para quién es el regalo?"
            className={styles.nuevoRegaloInput}
          />
          <div className="d-flex justify-content-between align-items-center mt-5">
            <div className={styles.icons}>
              <MyIcon name="calendar" />
              <MyIcon name="heart" />
              {/*<MyIcon name="image" />*/}
              <MyIcon name="list" />
            </div>
            <Links title="Regalar" url="/nuevoRegalo" />
          </div>
        </Link>
      </div>
    </>
  );
}
export default NuevoRegaloHome;
