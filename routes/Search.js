import { useState, useContext } from "react";
import { UserContext } from "../context";
import People from "../component/cards/people";
import axios from "axios";
// import { Toast } from "bootstrap";
import { toast } from "react-toastify";
const Search =  () => {
  const [state,setState] = useContext(UserContext);
  const[result,setResult] = useState();
  const [query, setQuery] = useState("");
  const searchUser = async (e) => {
    e.preventDefault();
    // console.log(`find"${query}" from db`);
    try{
        const {data}= await axios.get(`/search-user/${query}`)
        console.log("search user response=>",data);
        setResult(data);
    }catch(err){
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
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      // rerender the post in News feed;
      // newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnfollow = async(user)=>{
    const {data }= await axios.put("/user-unfollow",{_id:user._id});
    let ath = JSON.parse(localStorage.getItem("ath"));
    ath.user= data;
    localStorage.setItem("ath",JSON.stringify(ath));
    setState({...state,user:data});
    // console.log("handle follow responce=>",data);
    // update filer state
     let filtered = result.filter((p) =>p._id !==  user._id);
     setResult(filtered);
     
    toast.error(` Unfollow ${user.name}`)

};
  return (
    <>
      <form className="form-inline  row" onSubmit={searchUser} >
       <div className="col-8">
       <input
          onChange={(e) => {setQuery(e.target.value)
          setResult([]);
          }}

          value={query}
          className="form-control mr-sm-2  pb-5 col"
          type="search"
          placeholder="Search people. . ."
        />
       </div>
     <div className="col-4">
     <button
          className="btn btn-outline-primary  col-12  "
          type="submit"
        
        >Search</button>
     </div> 
      </form>
      {result && result.map((r) =>(<People key={r._id} people={result} handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>))}
    </>
  );
};
export default Search;
