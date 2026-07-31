import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role =
    user?.role?.toLowerCase();


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("restaurant");

    navigate("/login");

  };


  const menuItems = {

    customer:[
      ["Dashboard","/dashboard"],
      ["Restaurants","/restaurants"],
      ["Menu","/menu"],
      ["Orders","/orders"],
      ["Reservations","/reservations"],
      ["Profile","/profile"],
    ],


    manager:[

      ["Dashboard","/manager-dashboard"],
      ["Restaurants","/restaurants"],
      ["Inventory","/inventory"],
      ["Menu","/menu"],
      ["Orders","/orders"],
      ["Reservations","/reservations"],
      ["Employees","/employees"],
      ["Customers","/customers"],
      ["Reports","/reports"],
      ["AI Predictions","/predictions"],
      ["Profile","/profile"],

    ],


    owner:[

      ["Dashboard","/owner-dashboard"],
      ["Restaurants","/restaurants"],
      ["Inventory","/inventory"],
      ["Menu","/menu"],
      ["Orders","/orders"],
      ["Reservations","/reservations"],
      ["Employees","/employees"],
      ["Customers","/customers"],
      ["Reports","/analytics-dashboard"],
      ["Revenue","/revenue-report"],
      ["Profile","/profile"],

    ],


    chef:[

      ["Dashboard","/chef-dashboard"],
      ["Orders","/orders"],
      ["Menu","/menu"],
      ["Profile","/profile"],

    ]

  };


  const links =
    menuItems[role] || [];


  return (

<nav

style={{

position:"sticky",
top:0,
zIndex:1000,

background:
"rgba(12,12,20,.92)",

backdropFilter:
"blur(18px)",

borderBottom:
"1px solid rgba(255,255,255,.08)",

padding:"12px 25px",

boxShadow:
"0 10px 25px rgba(0,0,0,.35)"

}}

>


{/* TOP AREA */}

<div

style={{

display:"flex",
alignItems:"center",
justifyContent:"space-between"

}}

>


{/* LOGO */}

<h2

style={{

margin:0,

fontSize:"22px",

fontWeight:"800",

background:
"linear-gradient(90deg,#8B5CF6,#F97316)",

WebkitBackgroundClip:"text",

WebkitTextFillColor:
"transparent"

}}

>

🍽 RestroVerse AI

</h2>



{/* USER */}

<div

style={{

display:"flex",
alignItems:"center",
gap:"15px"

}}

>


<div

style={{

background:
"rgba(255,255,255,.05)",

padding:"8px 15px",

borderRadius:"12px",

color:"#E5E7EB",

fontSize:"13px"

}}

>

<div
style={{
fontWeight:"700"
}}
>

👋 {user?.name}

</div>


<div

style={{

color:"#9CA3AF",
fontSize:"12px"

}}

>

{user?.role}

</div>


</div>


<button

onClick={handleLogout}

style={{

border:"none",

background:
"linear-gradient(90deg,#EF4444,#F97316)",

color:"#fff",

padding:"9px 18px",

borderRadius:"10px",

fontWeight:"700",

cursor:"pointer"

}}

>

Logout

</button>


</div>


</div>



{/* MENU */}

<div

style={{

display:"flex",

gap:"10px",

marginTop:"14px",

flexWrap:"wrap"

}}

>


{

links.map(([name,path])=>(


<Link

key={name}

to={path}

style={{

textDecoration:"none",

color:"#CBD5E1",

fontSize:"13px",

fontWeight:"600",

padding:"9px 14px",

borderRadius:"10px",

background:
"rgba(255,255,255,.035)",

transition:".3s"

}}


onMouseEnter={(e)=>{

e.currentTarget.style.background=
"linear-gradient(90deg,#7C3AED,#F97316)";

e.currentTarget.style.color=
"#FFFFFF";

}}


onMouseLeave={(e)=>{

e.currentTarget.style.background=
"rgba(255,255,255,.035)";

e.currentTarget.style.color=
"#CBD5E1";

}}

>


{name}


</Link>


))

}


</div>



</nav>


  );

}


export default Navbar;