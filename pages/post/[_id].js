import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRouter from "../../routes/UserRouter";
import { toast } from "react-toastify";
import Post from "../../component/cards/Post";
import Link from "next/link";
import { ArrowLeftOutlined, BackwardOutlined } from "@ant-design/icons";
const PostComments = ({removeComment,handleLike,handleUnlike,handleComment}) => {
  const [post, setPost] = useState({});
  const router = useRouter();
  const _id = router.query._id;
  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };
 
  
  return (
    <>
      <div className="row col-md-8 offset-md-2">
        <Post post={post} key={post._id} commentsCount={100} removeComment={removeComment} handleLike={handleLike} handleUnlike={handleUnlike} handleComment={handleComment}/>
      </div>
      <Link href="/user/dashbord">
        <a className="d-flex justify-content-center ">
          <BackwardOutlined style={{ fontSize: "43px", color: "gray" }} />
        </a>
      </Link>
    </>
  );
};
export default PostComments;
