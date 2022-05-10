import { SyncOutlined } from "@ant-design/icons";
const AuthForms = ({
  
  handlesubmit,
  name,
  setname,
  setemail,
  email,
  password,
  setpassword,
  secret,
  setsecret,
  loading,
  username,
  setUsername,
  about,
  setAbout,
  profileUpdate,
  page,
}) => (
  <form onSubmit={handlesubmit}>
  { profileUpdate && <div className="form-group  p-2">
      <small>
        <label className="text-muted">username</label>
      </small>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className="form-control"
        placeholder="username"
      />
    </div>}
    {profileUpdate &&
    <div className="form-group  p-2">
      <small>
        <label className="text-muted">about</label>
      </small>
      <input
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        type="text"
        className="form-control"
        placeholder="Tell us about Yourself"
      />
    </div>}
  {page !=="login"&&(
    <div className="form-group  p-2">
      <small>
        <label className="text-muted">your name</label>
      </small>
      <input
        value={name}
        onChange={(e) => setname(e.target.value)}
        type="text"
        className="form-control"
        placeholder="enter the name"
      />
    </div>
   )}
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
        disabled ={profileUpdate}
      />
    </div>
    <div className="form-group  p-2">
      <small>
        <label className="text-muted">password</label>
      </small>
      <input
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        type="password"
        className="form-control"
        placeholder="enter the password"
      />
    </div>
    {page !=="login"&&(
   <>
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
    
</>
     ) }

    <div className="form-group p-2">
      <button className="btn-btn-primary col-12">
        {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
      </button>
      {/* disabled={!name||!email||!password||!secret} */}
    </div>
  </form>
);
export default AuthForms;
