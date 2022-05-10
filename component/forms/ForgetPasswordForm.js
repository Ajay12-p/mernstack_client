import { SyncOutlined } from "@ant-design/icons";
const ForgetPasswordForm = ({
  handlesubmit,
  setemail,
  email,
  newpassword,
  setnewpassword,
  secret,
  setsecret,
  loading,
  
}) => (
  <form onSubmit={handlesubmit}>
  
    
   
    <div className="form-group  p-2">
      <small>
        <label className="text-muted">email</label>
      </small>
      <input
        value={email}
        onChange={(e) => setemail(e.target.value)}
        type="email"
        className="form-control"
        placeholder="enter the email"
      />
    </div>
    <div className="form-group  p-2">
      <small>
        <label className="text-muted">password</label>
      </small>
      <input
        value={newpassword}
        onChange={(e) => setnewpassword(e.target.value)}
        type="password"
        className="form-control"
        placeholder="enter the new password"
      />
    </div>
   
   
    <div className="form-group p-2">
    
      <small>
        <label className="text-muted">pic a question</label>
      </small>
      <select className="form-control">
        <option>what is your fev color</option>
        <option>what is your bestfrind name</option>
        <option>what is your pet name</option>
      </select>
      <small className="form-text text-muted">
        you can use this if your password is forgotton
      </small>
    </div>
    <div className="form-group p-2">
      <input
        value={secret}
        onChange={(e) => setsecret(e.target.value)}
        type="text"
        className="form-control"
        placeholder="write your answer here"
      />
    </div>
    <div className="form-group p-2">
      <button className="btn-btn-primary col-12">
        {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
      </button>
      
    </div>
  </form>
);
export default ForgetPasswordForm;
