import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/changePasswordApi";

function ChangePassword() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(newPassword !== confirmPassword){

      alert("Passwords do not match");

      return;
    }

    try{

      setLoading(true);

      await changePassword({

        email:user.email,

        old_password:oldPassword,

        new_password:newPassword

      });

      alert("Password Changed Successfully");

      navigate("/profile");

    }

    catch(error){

      alert(
        error.response?.data?.detail ||
        "Unable to change password"
      );

    }

    finally{

      setLoading(false);

    }

  };

  return(

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",
background:"#f5f5f5"
}}
>

<form
onSubmit={handleSubmit}
style={{
width:"420px",
background:"white",
padding:"35px",
borderRadius:"12px",
boxShadow:"0 0 20px rgba(0,0,0,.15)"
}}
>

<h2
style={{
textAlign:"center",
marginBottom:"25px"
}}
>
Change Password
</h2>

<input

type="password"

placeholder="Old Password"

value={oldPassword}

onChange={(e)=>setOldPassword(e.target.value)}

required

style={inputStyle}

/>

<input

type="password"

placeholder="New Password"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

required

style={inputStyle}

/>

<input

type="password"

placeholder="Confirm Password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

required

style={inputStyle}

/>

<button

type="submit"

style={buttonStyle}

>

{loading ? "Updating..." : "Change Password"}

</button>

</form>

</div>

);

}

const inputStyle={

width:"100%",

padding:"14px",

marginBottom:"18px",

borderRadius:"8px",

border:"1px solid #ccc",

fontSize:"16px"

};

const buttonStyle={

width:"100%",

padding:"14px",

background:"#7C3AED",

color:"white",

fontWeight:"bold",

border:"none",

borderRadius:"8px",

cursor:"pointer",

fontSize:"16px"

};

export default ChangePassword;