import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import AdminRoute from "../../routes/AdminRoute";
import axios from "axios";
import { toast } from "react-toastify";


import renderHTML from "react-render-html";
const Admin = () => {
  const [state, setState] = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  // const onChange= (value) => setPages(value);

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);
  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      // console.log("user-posts=>",data);
      setPosts(data);
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("are you sure");
      if (!answer) return;

      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);

      console.log("post deleted");
      toast.error("post deleated");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid bg-default-image">
        <div className=" col text-center bg-text">
          <h1 className="box px-1">ADMIN</h1>
        </div>
      </div>
      <div className="row py-4">
          
        <div className="col-md-8 offset-md-2">
            {posts && posts.map((post)=>(
              <div key = {post._id} className=" d-flex justify-content-between">
              {renderHTML(post.content)} 
               {/* <b>{post.postedBy.name}</b> */}
               <span onClick={()=> handleDelete(post)} className="text-danger"> Delete</span>
              </div>
            ))}
              </div>
          
        </div>
      
    </AdminRoute>
  );
};
export default Admin;
