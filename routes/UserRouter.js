import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined, SynOutlined } from "@ant-design/icons";
import { UserContext } from "../context";
const UserRouter = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);
  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`);
      if (data.ok) setOk(true);
    } catch (err) {
      router.push("/login");
    }
  };
  process.browser&&
  state===null &&
  setTimeout(()=>{
      getCurrentUser();
  },1000);
  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 p-5 " style={{color:"black"}}
    />
  ) : (
    <> {children}</>
  );
};
export default UserRouter;
