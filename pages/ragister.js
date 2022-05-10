 import { useState,useContext } from "react";
 import axios from "axios";
 import { toast } from "react-toastify";
import {Modal} from "antd";
 import Link from "next/link";
 
 import AuthForms from "../component/forms/AuthForms";
 import { UserContext } from "../context";
import { Router } from "next/router";
 import { useRouter } from "next/router";
const ragister = () => {
  
   const [name,setname] = useState("");
    const[email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const[secret,setsecret] = useState("");
    const [loading,setloading] = useState(false);
    const [ok,setOk] =useState(false);
    const [state] = useContext(UserContext);
    const router = useRouter();
    const handlesubmit= async(e)=>{
      e.preventDefault();// it prevent the app to reload
      // console.log(name,email,password,secret);

      try{
        setloading(true);
       const {data}= await axios
      .post(`/register`,{
        name:name,
        email:email,
        password:password,
        secret:secret,
      });
      if(data.error){
        toast.error(data.error);
      }else{
      setname("");
      setemail("");
      setpassword("");
      setsecret("");
      setOk(data.ok);
      setloading(false);
      }
      }catch (err){
        
        toast(err.data);
        setloading(false);

      }
    };
   if(state&&state.token){router.push("/");}

  return (
    <div className="container-fluid">

      <div className=  "row py-5 bg-default-image text-light" >
      
        <div className="col text-center">
          <h1>ragister</h1>
        </div>
     
      </div>
      {/* {loading?<h1>loading</h1>:" "} */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <AuthForms
             handlesubmit= {handlesubmit}
          name ={name}
          setname ={setname}
          setemail={setemail}
          email ={email}
          password ={password}
          setpassword ={setpassword}
          secret ={secret}
          setsecret ={setsecret}
          loading
          />
       
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal 
          title ="Congrachuletions!" 
          visible={ok}
          onCancel={()=>setOk(false)}
          footer={null}
          >
          <p>you have successfully ragister!</p>
          <Link href="/login">
            <a className="btn btn-primary btn-5m">Login</a>
          </Link>
          </Modal>
        </div>
      </div>
      <div className="row">
         <div className="col">
             <p className="text-center">
                 already register login{" "}
                 <Link href="/login">
                     <a>Login</a>
                 </Link>
             </p>
         </div>
     </div>

    </div>
  );
};
export default ragister;
