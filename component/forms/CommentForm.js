const CommentForm =({addComment,comment,setComment})=>{
    return(
        <form onSubmit ={addComment}>
       
       <input
          type="text"
          className="form-control"
          placeholder="write something... "
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        
        <button style={{background :"black" ,color :"white"  }} className="bgg  btn btn-primary btn-sm btn-block mt-3">
        Submit
        </button>
       
      </form>
    );
};
export default CommentForm;