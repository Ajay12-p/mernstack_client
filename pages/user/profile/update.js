import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";

import AuthForms from "../../../component/forms/AuthForms";
import { UserContext } from "../../../context";

import { useRouter } from "next/router";
import { Avatar } from "antd";
import { Card } from "antd";

import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
const ragister = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [image, setimage] = useState({});
  const [uploading, setuploading] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [secret, setsecret] = useState("");
  const [loading, setloading] = useState(false);
  const [ok, setOk] = useState(false);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (state && state.user) {
      //  console.log("user from the state",state.user)
      setUsername(state.user.username);
      setAbout(state.user.about);
      setname(state.user.name);
      setemail(state.user.email);
      setimage(state.user.image);
    }
  }, [state && state.user]);
  const handlesubmit = async (e) => {
    e.preventDefault(); // it prevent the app to reload
    // console.log(name,email,password,secret);

    try {
      setloading(true);
      const { data } = await axios.put(`/profile-update`, {
        username: username,
        about: about,
        name: name,
        email: email,
        password: password,
        secret: secret,
        image:image,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        console.log("update responce=>", data);
        // update localstorege , update user, keep token
        let ath = JSON.parse(localStorage.getItem("ath"));
        ath.user = data;
        localStorage.setItem("ath", JSON.stringify(ath));
        // update context
        setState({ ...state, user: data });
        console.log(user);
        setOk(true);
        setloading(false);
      }
    } catch (err) {
      toast(err.data);
      setloading(false);
    }
  };
  const handleImage = async (j) => {
    const file = j.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // formData.append("content", content);
    console.log([...formData]);
    setuploading(true);

    try {
      const { data } = await axios.post("/upload-image", formData);
      console.log("uploaded image =>", data);
      setimage({
        url: data.url,
        public_id: data.public_id,
      });
      setuploading(false);
    } catch (err) {
      console.log(err);
      setuploading(false);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image text-light">
        <div className="col text-center">
          <h1>profile</h1>
        </div>
      </div>
      {/* {loading?<h1>loading</h1>:" "} */}
        
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <label className="d-flex justify-content-center h5">
            {image && image.url ? (
              <Avatar size={125} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" />
            )}
            <input
              onChange={handleImage}
              type="file"
              accept="images/*"
              hidden
            />
          </label>
          <AuthForms
            profileUpdate={true}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
            handlesubmit={handlesubmit}
            name={name}
            setname={setname}
            setemail={setemail}
            email={email}
            password={password}
            setpassword={setpassword}
            secret={secret}
            setsecret={setsecret}
            loading
          />
        </div>
      </div>
      
      <div className="row">
        <div className="col">
          <Modal
            title="Congrachuletions!"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>you have successfully updated your profile!</p>
            <Link href="/login">
              <a className="btn btn-primary btn-5m">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
      
    </div>
  );
};
export default ragister;
