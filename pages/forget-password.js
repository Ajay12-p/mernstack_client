import { useState,useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Link from "next/link";

import { Modal } from "antd";

import { UserContext } from "../context";
import { Router } from "next/router";
import { useRouter } from "next/router";
import ForgetPasswordForm from "../component/forms/forgetpasswordForm";
const ForgotPassword = () => {
 
  
   const[email,setemail] = useState("");
   const [newpassword,setnewpassword] = useState("");
   const[secret,setsecret] = useState("");
   const [loading,setloading] = useState(false);
   const [ok,setOk] =useState(false);
   const [state] = useContext(UserContext);
   const router = useRouter();
  
   const handlesubmit = async(e)=>{
    
     e.preventDefault();    

    try{
      setloading(true);
     const {data}= await axios
    .post(`/forget-password`,{
   
      email,
      newpassword,
      secret,
    });
    console.log("forget password ",data);
   
    setOk(data.ok);
    setloading(false);
    }catch (err){
   
      toast(err.response.data);
      setloading(false);

    }
  };
 if(state&&state.token){router.push("/");}

   
  

 return (
   
   <div className="container-fluid">

     <div className=  "row py-5 bg-default-image text-light" >
     
       <div className="col text-center">
         <h1>forget-password</h1>
       </div>
    
     </div>
     
     <div className="row">
       <div className="col-md-6 offset-md-3">
       <ForgetPasswordForm
       handlesubmit={handlesubmit}
           setemail={setemail}
         email ={email}
         newpassword ={newpassword}
         setnewpassword ={setnewpassword}
         secret ={secret}
         setsecret ={setsecret}
          loading

       />
        
      
       </div>
     </div>
     <div className="row">
       <div className="col">
         
        
         <Modal title ="Congrachuletions!" 
         visible={ok}
         onCancel={()=>setOk(false)}
         footer={null}
         >
         <p>congrachulations you can login with the new password !</p>
         <Link href="/login">
           <a className="btn btn-primary btn-5m">Login</a>
         </Link>

         </Modal>
       </div>
     </div>
     <div className="row">
        <div className="col">
            <p className="text-center">
                already registered login{" "}
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </p>
        </div>
    </div>

   </div>
 
 );
};
export default ForgotPassword;
