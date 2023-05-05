import React, { useState } from 'react'
import './Form.css'
import {useNavigate} from 'react-router-dom'
import imageUpload from '../../util/Cloudinary'
import Loader from '../Loader/Loader'

function Form() {
    const navigate = useNavigate()
    const[error,setError]=useState("")
    const[success,setSuccess]=useState("")
    const[loading,setLoading]=useState(false)
    const [user,setUser]=useState({
        firstName:"",lastName:"",email:"",phone:"",resume:""
    })
    const [file,setFile]=useState("")
    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const closeError = () => {
        setTimeout(() => {
          setError("");
        }, 2000);
      };
    const upload = async (e) => {
        e.preventDefault();
        if (!user.firstName || user.firstName.trim().length < 4 || !/^[A-Za-z]/.test(user.firstName)) {
          setError("Enter your firstName");
          closeError();
        }
        else if (!user.lastName || user.lastName.trim().length < 4 || !/^[A-Za-z]/.test(user.lastName)) {
            setError("Enter your lastName");
            closeError();
          } 
        else if (!user.email) {
          setError("Enter your email ");
          closeError();
        } 
        else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(user.email)){
            setError("Enter correct email ");
            closeError();
        }
        else if(user.phone.length !==10 || !/^[0-9]/.test(user.phone)){
            setError('Enter valid mobile number')
            closeError()
          }
        else if (!file) {
          setError("Please upload image");
          closeError();
        } else if (file && file.name.split(".").pop() !== "pdf") {
          setError("Please choose pdf only");
          closeError();
        } else {
          setLoading(true)
          const url = await imageUpload(file);  // getting image url from cloudinary
          user.resume = url;
          let data = await fetch("http://localhost:4000/register", {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          data = await data.json()
          if (data.status === true) {
            e.target.reset()
            setSuccess(data.msg)
            setLoading(false)
          } else {
            setError(data.msg);
            setLoading(false)
          }
        }
      };
  return (
    <> 
    {loading && <Loader/>}   
        <div className="container">
      {error && <h2 id="error">{error}</h2>}
      {success && <h2 id="success">{success}</h2>}
      <form method="post" onSubmit={upload}>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          onChange={handleInput}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          onChange={handleInput}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleInput}
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          onChange={handleInput}
        />
        <input
          type="file"
          accept="application/pdf"
          name="resume"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div id="buttondiv">
          <button onClick={() => navigate("/")}>Cancel</button>
          <button type="submit">{loading ? "Submitting..." : "submit"}</button>
        </div>
      </form>
    </div>
    </>

  );
}

export default Form
