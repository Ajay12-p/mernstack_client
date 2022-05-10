
import { Avatar ,Card} from "antd";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
 const {Meta} = Card;// <Card.Meta/>
import { useRouter } from "next/router";
import { useContext, useState ,useEffect} from "react";
import { UserContext } from "../../context";
import Link from "next/link"
import { LeftCircleOutlined } from "@ant-design/icons";
const Username =  () => {
  const [state,setState] = useContext(UserContext);
  const[user,setUser] = useState({});
  const router = useRouter();
  useEffect (()=>{
      if(state&&state.token) fetchUser();
  },[router.query.username]);
  const fetchUser= async()=>{
      try{
     const {data} = await axios.get(`/user/${router.query.username}`);
     console.log(data);
     setUser(data);
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
  
  return (
    <div className="row col-md-4 offset-md-4">
     
      {/* <pre>{JSON.stringify(user,null,4)}</pre> */}
      <div className="pt-5 pb-5">
      <Card size="small" hoverable cover ={<img src ={imageSource(user) }alt = {user.name}/>}>
       <Meta title ={user.name} description={user.about}/>
       <p className="pt-2 text-muted">joined{moment(user.createdAt).fromNow()} 
       <div className="d-flex justify-content-between">
         <span className="btn btn-sm">
           {user.followers&&user.followers.length} Followers
         </span>
         <span className="btn btn-sm">
           {user.followers&&user.following.length} Following
         </span>
       </div>
       </p>
      </Card>

      <Link href ="/user/dashbord">
        <a className="d-flex justify-content-center">
      <LeftCircleOutlined style={{ fontSize: '40px', color: '#ff8080' }} />
        </a>
            
      </Link>
      </div>
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
    </div>
  );
};
export default Username;
