
import { UserContext } from "../context";
import { useContext,useEffect, useState } from "react";
import ParallaxBG from "../component/cards/ParallaxBG";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import PostPublic from "../component/cards/PostPublic";
// import { Socket } from "socket.io-client";
import io from "socket.io-client"
const socket =io(process.env.NEXT_PUBLIC_SOCKTIO,{
  reconnection:true
})
const Home = () => {
  const [state, setState] = useContext(UserContext);
  
  // useEffect(()=>{
    //   // console.log("socketio  on JOIN",socket);
    //   // socket.on('receive-message',(newMessage)=>{
      //   //     console.log(newMessage)
      //   socket.on("get-message",(newMessage)=>{
        //     alert(newMessage);
        //   })
        // alert(newMessage);
        
        // },[]);
        const [newsFeed,setNewsFeed] = useState([])
        const[posts,getPosts] = useState([]);
        const getserverPost= async ()=>{
          
          const { data } = await axios.get(`/posts`);
          
          
          getPosts(data);
          
        }
        useEffect(()=>{
       
          getserverPost()
          socket.on("new-post",(newPost)=>{
            setNewsFeed(newPost,...posts)
        })
      },[])
        
       
      

  const head = () => (
    <Head>
      <title>MernCAMP -a social media plateform by ajay1-_2</title>
      <meta
        name="description"
        content="A social network by devlopers for other web devlopers"
      />
      <meta
        property="og:description"
        content="A social network by devlopers for other web devlopers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site" content="MERNCAMP" />
      <meta property="og:url" content="http://merncamp.com" />
      <meta
        property="og:image:secure_url"
        content="http://merncamp.com/images/default.jpg"
      />
    </Head>
    
    );
   const collection = newsFeed.length>0 ? newsFeed : posts;

  return (
    <>
      {head()} 
       <ParallaxBG url="/images/default.jpg" children="MernCAMP" />
       {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}
       
       {/* <div className="container">
       <button onClick={()=>{
         socket.emit('send-message',"this is ajay...")
       }}>
         Send message
       </button> */}
       
         <div className="row pt-3">
          {collection.map((post) => (
            <div key={post._id} className="col-md-4">
               <Link href={`/post/view/${post._id}`}>
                <a>
                   
                 <PostPublic key={post._id} post={post} />  
                </a> 
              </Link>
                
            </div>
          ))}
      </div>
         
    </>  
  );
};
// export  const getServerSideProps= async ()=>{
  
//   const { data } = await axios.get(`/posts`);

  
//   return {
//     props: {
//       posts: data,
//     },
//   };
// }

export default Home;
