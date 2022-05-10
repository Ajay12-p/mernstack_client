import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import UserRouter from "../../routes/UserRouter";
import PostForm from "../../component/forms/PostForm";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../component/cards/PostList";
import People from "../../component/cards/people";
import Link from "next/link";
import { Modal, Pagination } from "antd";
import CommentForm from "../../component/forms/CommentForm";
import Search from "../../routes/Search";
import io from "socket.io-client";
const socket  =io(process.env.NEXT_PUBLIC_SOCKETIO,{
  reconnection:true,
})
const Home = () => {
  const [state, setState] = useContext(UserContext);
  const [content, setcontent] = useState("");
  const [image, setimage] = useState({});
  const [uploading, setuploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const router = useRouter();
  // comments
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPages] = useState(1);
  
    const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");

      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };
  // const onChange= (value) => setPages(value);
  useEffect(() => {
    try {
      axios.get(`/total-posts`).then(({ data }) => setTotalPosts(data));
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (state && state.token) {
      newsFeed();
      findPeople();
    }
  }, [state && state.token,page]);
  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      // console.log("user-posts=>",data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/create-post", { content, image });
      console.log("create post response=>>", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        newsFeed();
        toast.success("post created");
        setcontent("");
        setimage({});
        ///socket
        socket.emit('new-post',data);
      }
    } catch (err) {
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
  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("are you sure");
      if (!answer) return;

      const { data } = await axios.delete(`/delete-post/${post._id}`);

      console.log("post deleted");
      toast.error("post deleated");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };
  const handleFollow = async (user) => {
    // console.log("add this user to the following lsit ",user);
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      let ath = JSON.parse(localStorage.getItem("ath"));
      ath.user = data;
      localStorage.setItem("ath", JSON.stringify(ath));
      setState({ ...state, user: data });
      // console.log("handle follow responce=>",data);
      // update filer state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      // rerender the post in News feed;
      newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put("/like-post", { _id });
      console.log("liked", data);
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      console.log("unlike", data);
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };
  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    //
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      console.log("add comment", data);
      setComment("");
      setVisible(false);
      newsFeed();
    } catch (err) {
      console.log(err);
    }

    //
  };
  const removeComment = async (postId, comment) => {
    let answer = window.confirm("are you sure ??");
    if(!answer) return;
    try {
      console.log(postId,comment);
      const {data} = await axios.put("/remove-comment",{
        postId,
        comment,
      });
      console.log("comment removed",data);
      fetchPost()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRouter>
      <div className="container-fluid  ">
        <div className=" col text-center bg-text">
          <h1 className="box px-1">Dashbord</h1>
        </div>
        <div className="row py-5 bg-default-image "></div>

        <div className="row py-3 ">
          <div className="col-md-8">
            <PostForm 
              content={content}
              setcontent={setcontent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <br />
            <PostList
              handleComment={handleComment}
              newsFeed={newsFeed}
              posts={posts}
              
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              removeComment={removeComment}
            />
            <Pagination
              current={page}
              total={(totalPosts / 5) * 10}
              onChange={(value) => setPages(value)}
              // value={page}
              // onChange ={(e)=> setPages(e.target.value)}
              className="pb-3"
       
            />
            
          </div>
          <div className="col-md-4">
           <Search
             className ="pb-3"
           />
            <div className="d-flex justify-content-between">
              {state && state.user && state.user.following && (
                <Link href={`/user/following`}>
                  <a className="h6">{state.user.following.length} Following</a>
                </Link>
              )}

             
            </div>

            <People people={people} handleFollow={handleFollow} />
          </div>

          {/* <pre>{JSON.stringify(posts, null ,4)}</pre> */}
        </div>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Comments"
          footer={null}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRouter>
  );
};
export default Home;
