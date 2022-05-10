import { Avatar, List } from "antd";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import { useContext, useState ,useEffect} from "react";
import { UserContext } from "../../context";
import Link from "next/link"
import { RollbackOutlined } from "@ant-design/icons";

const Following =  () => {
  const [state,setState] = useContext(UserContext);
  const[people,setPeople] = useState([]);
  const router = useRouter();
  useEffect (()=>{
      if(state&&state.token) fetchFollowing();
  },[state&&state.token]);
  const fetchFollowing = async()=>{
      try{
     const {data} = await axios.get("/user-following");
     console.log(data);
     setPeople(data);
      }catch(err){
          console.log(err);
      }
  }
  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/img2.png";
    }
  };
  const handleUnfollow = async(user)=>{
      const {data }= await axios.put("/user-unfollow",{_id:user._id});
      let ath = JSON.parse(localStorage.getItem("ath"));
      ath.user= data;
      localStorage.setItem("ath",JSON.stringify(ath));
      setState({...state,user:data});
      // console.log("handle follow responce=>",data);
      // update filer state
       let filtered = people.filter((p) =>p._id !==  user._id);
       setPeople(filtered);
       
      toast.error(` Unfollow ${user.name}`)

  };
  return (
    <div className="row col-md-6 offset-md-3">
      <List
        itemLayout="horizontal "
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between ">
                  {user.username}
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary pointr px-3"
                  >
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Link href ="/user/dashbord">
        <a className="d-flex justify-content-center">
      <RollbackOutlined  style={{ fontSize: '40px', color: 'black' }} />
        </a>
            
      </Link>
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
    </div>
  );
};
export default Following;
