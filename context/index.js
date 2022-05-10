import { Router } from "next/router";
import { useState,createContext,useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext=createContext();
const UserProvider =({children})=>{
    const [state,setState] = useState({
        user:{},
        token:"",
    });
    useEffect(()=>{
        setState(JSON.parse( window.localStorage.getItem("ath")));
    },[]);

    const router = useRouter();

   const token= state&&state.token?state.token:"";
   axios.defaults.baseURL =process.env.NEXT_PUBLIC_API;
   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.interceptors.response.use(
        function (response) {
        // Do something before request is sent
        return response;
      }, function (error) {
          let res = error.response;
          
        // Do something with request error
        if(res.status===401&&res.config&&!res.config._isRetryRequest){
            setState(null);
            window.localStorage.removeItem("auth");
            Router.push("/login"); 
        }
        
      });
    
    
    return(
        <UserContext.Provider value = {[state , setState]}>
        {children}
        </UserContext.Provider>
    );
};
export {UserContext,UserProvider};


