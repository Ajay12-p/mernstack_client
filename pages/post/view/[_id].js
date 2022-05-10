// import { useContext } from "react";
// import { UserContext } from "../context";

import ParallaxBG from "../../../component/cards/ParallaxBG";
import axios from "axios";

import Head from "next/head";

import PostPublic from "../../../component/cards/PostPublic";
const SinglePost = ({ post }) => {
  

  const head = () => (
    <Head>
      <title>MernCAMP -a social media plateform by ajay1-_2</title>
      <meta
        name="description"
        content={post.content}
      />
      <meta
        property="og:description"
        content="A social network by devlopers for other web devlopers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site" content="MERNCAMP" />
      <meta property="og:url" content={`http://merncamp.com/post/view/${post._id}`} />
      <meta
        property="og:image:secure_url"
        content={imageSource(post)}
      />
    </Head>
  );
  const imageSource = (post) => {
    if(post.image) {
      return post.image.url;
    } else {
      return "/images/img2.png";
    }
};
  

  return (
    <>
      {head()} 
       <ParallaxBG url="/images/default.jpg" children="MernCAMP" />
       {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}
       
       <div className="container">
        <div className="row pt-3">
          
            <div className="col-md-8 offset-md-2">
               
                 <PostPublic post={post}  key={post._id} />  
              
                
            </div>
          
        </div>
      </div>
    </> 
  );
};
export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);

  // console.log(data);
  return {
    props: {
      post: data,
    },
  };
}
export default SinglePost;
