import { useContext } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import "antd/dist/antd.css";
import { imageSource } from "../../functions";

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
const PostPublic = ({
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentsCount = 2,
  removComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {post && post.postedBy && (
        <div  key={post._id} className="card mb-5">
          <div className="card-header ">
            {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar>{" "} */}
            <Avatar size={40} src={imageSource(post.postedBy)} />

            <span className="pt-2 ml-3 " style={{ marginLeft: "1rem" }}>
              {" "}
              {post.postedBy.name}
            </span>
            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
              {" "}
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">{renderHTML(post.content)}</div>
          <div className="card-footer">
            {/* <img
                src={post.image && post.image.url}
                alt={post.postedBy.name}
              /> */}
            {post.image && <PostImage url={post.image.url} />}

            <div className="d-flex  pt-2">
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
                <HeartFilled
                  
                  className="text-danger pt-2 h5 px-2"
                />
              ) : (
                <HeartOutlined
                  
                  className="text-danger pt-2 h5 px-2"
                />
              )}
              <div className=" pt-2 pl-3" style={{ marginRight: "1rem" }}>
                {post.likes.length} likes
              </div>
              <CommentOutlined
                
                className="text-danger pt-2 h5 px-2"
              />
              <div className="pt-2 pl-3">
                
                  <a>{post.comments.length} comments</a>
                
              </div>
              {state && state.user && state.user._id === post.postedBy._id && (
                <>
                  <EditOutlined
                    onClick={() => router.push(`/user/post/${post._id}`)}
                    className="text-danger pt-2 h5 px-2 mx-auto  "
                    style={{ color: "black" }}
                  />
                  <DeleteOutlined
                    
                    className="text-danger pt-2 h5 px-2  "
                  />
                </>
              )}
            </div>
          </div>
          {/* 2 comments */}
          {post.comments && post.comments.length > 0 && (
            <ol
              className="list-group"
              style={{ maxHeight: "125px", overflow: "scroll" }}
            >
              {post.comments.map((c) => (
                <li key={c._id} className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div>
                      <Avatar
                        size={25}
                        className="mb-1 mr-3"
                        src={imageSource(c.postedBy)}
                      />
                    </div>
                    <div className="text-muted">{c.text}</div>
                  </div>
                  <span className="badge rounded-pill text-muted">
                    {moment(c.created).fromNow()}
                    {state && state.user && state.user._id !== c.postedBy._id && (
                      <div className="ml-auto mt-1">
                        <DeleteOutlined
                          
                          className="pl-2 pt-2 text-denger"
                          style={{ size: "25px" }}
                        />
                      </div>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </>
  );
};
export default PostPublic;
