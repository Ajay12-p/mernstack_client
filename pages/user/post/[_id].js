import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostForm from "../../../component/forms/PostForm";
import UserRouter from "../../../routes/UserRouter";
import { toast } from "react-toastify";

const EditPost = () => {
  // stats
  const [content, setcontent] = useState("");
  const [image, setimage] = useState({});
  const [uploading, setuploading] = useState(false);
  const [post, setPost] = useState();
  const router = useRouter();
  console.log("router", router);
  const _id = router.query._id;
  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      //    console.log(res.data);
      setPost(data);
      setcontent(data.content);
      setimage(data.image);
    } catch (err) {
      console.log(err);
    }
  };
  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit post to update",content,image);
    try{
    const {data} = await axios.put(`/update-post/${_id}`,{content,image});
      if(data.error){
        toast.error(data.error);
      }
      else{
         toast.success("post updated");
        
         router.push("/user/dashbord");
      }

    }catch(err){
      console.log(err);
    }
  };
  const handleImage = async (j) => {
    const file = j.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    formData.append("content", content);
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
    <UserRouter>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image ">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <PostForm
              content={content}
              setcontent={setcontent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>

          {/* <pre>{JSON.stringify(posts, null ,4)}</pre> */}
        </div>
      </div>
    </UserRouter>
  );
};
export default EditPost;
