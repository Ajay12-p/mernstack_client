import { Avatar } from "antd";
import dynamic from "next/dynamic";


import { CameraOutlined,LoadingOutlined } from "@ant-design/icons";
const ReactQuill = dynamic (()=> import("react-quill"),{ssr:false});

import "react-quill/dist/quill.snow.css";
// ssr false
const PostForm =({content,setcontent,postSubmit,handleImage,uploading,image})=>{
    return(
    <div className="card">
        <div className="card-body pb-1">
            <form className="form-group">
               
                <ReactQuill
                 theme="snow"
                  value={content}
                  onChange ={(e)=>setcontent(e)}
                 className="form-coltrol"
                    placeholder="write  something..."
               />
            </form>

        </div>
       
        <div className="card-footer d-flex justify-content-between text-muted">
        
           <button
            onClick={postSubmit}
           className="btn btn-primary mt-1 ">post</button>
            <label>
            {
                image&&image.url? (
                    <Avatar size ={30} src={image.url} className ="mt-1" />
                ): uploading ?(<LoadingOutlined className="mt-2"/>):(<CameraOutlined className="mt-2"/>)
            }
        <input  onChange ={handleImage}type ="file" accept = "images/*" hidden/>
        </label>

        </div>
    </div>

    );
}
export default PostForm;