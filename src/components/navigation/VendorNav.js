import React from "react";
import {Link} from "react-router-dom";

const VendorNav = () => {
   return(
    <nav className="navbar mt-2 ">
      <ul className= "nav flex-column font-weight-bold mt-2">
      <li className= "nav-item">
          <Link to= "/vendor/history" className= "nav-link">VENDOR HISTORY</Link>
        </li>
        <li className= "nav-item">
          <Link to= "/vendor/vendorlogin" className= "nav-link">UPDATE PERSONAL DETAILS</Link>
        </li>
        <li className= "nav-item">
          <Link to= "/vendor/vendorcategories" className= "nav-link">CHANGE CATEGORIES</Link>
        </li>
        <li className= "nav-item">
          <Link to= "/user/password" className= "nav-link">PASSWORD RESET</Link>
        </li>
      </ul>
    </nav>
   )
  }

export default VendorNav;