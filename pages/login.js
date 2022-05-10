import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Link from "next/link";
import { Router, useRouter } from "next/router";
import AuthForms from "../component/forms/AuthForms";
import { SecurityScanTwoTone } from "@ant-design/icons";
import { UserContext } from "../context";

const login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [state,setState] = useContext(UserContext);
  const router = useRouter();
  const handlesubmit = async (e) => {
    e.preventDefault(); // it prevent the app to reload
    // console.log(name,email,password,secret);
    try {
      setloading(true);
      const { data } = await axios.post(`/login`, {
         email: email,
         password: password,
      });
      if(data.error){
        toast(data.error);
        setloading(false);
      }else{
      setState({
        user:data.user,
        token:data.token,
      });
      window.localStorage.setItem("ath",JSON.stringify(data));
      router.push("/");
    }
    } catch (err) {
      toast(err.data);
      setloading(false);
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondry text-light">
        <div className="col text-center">
          <h1>login</h1>
        </div>
      </div>
      {/* {loading?<h1>loading</h1>:" "} */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <AuthForms
            handlesubmit={handlesubmit}
            setemail={setemail}
            email={email}
            password={password}
            setpassword={setpassword}
            loading 
            
            page = "login"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet register{" "}
            <Link href="/ragister">
              <a>ragister</a>
            </Link>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            forget password{" "}
            <Link href="/forget-password">
              <a className="text-danger">forget password</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default login;
