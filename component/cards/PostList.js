import { useContext } from "react";
import renderHTML from "react-render-html";
import Post from "./Post";
import moment from "moment";
import { Avatar } from "antd";
import "antd/dist/antd.css";
import { imageSource } from "../../functions";
import Link from "next/dist/client/link";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PostImage from "../image/PostImage";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            
            post={post }
            key={post._id}
            handleComment={handleComment}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            removComment={removeComment}
          />
        ))}
    </>
  );
};
export default PostList;
