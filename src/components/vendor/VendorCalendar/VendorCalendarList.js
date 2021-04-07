import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Card} from "antd";
import VendorNav from "../../navigation/VendorNav";
import AdminMenu from "../../admin/AdminMenu";
import {EditOutlined} from "@ant-design/icons";
import {fetchVendorCalendar} from "../../../actions/vendorCalendar";
import VendorCalCard from "../../cards/VendorCalCard";

const VendorCalendarList = () => {

    const {user} = useSelector( state => ({...state}));
    const [vendorCal, setVendorCal] = useState([]);
    const [loading, setLoading] = useState("false");

   useEffect (() => {
      loadVendorCalendar();
   }, []);

   const loadVendorCalendar= () => {
    setLoading(true);
    fetchVendorCalendar(user._id)
    .then (res => setVendorCal(res.data));
    setLoading(false);
   }

    return (
        <div className= "row">
         <div className= "col col-md-2">
        <VendorNav />
        </div>  
       <div className = "col col-md-9 category">  
         <li className= "nav-item col d-flex justify-content-center admin-class mb-2">
            <Link to= "/vendor/vendorcalcreate/:user._id" className= "nav-link">Add New Calendar Availability</Link>
         </li>
         { loading ? <h4>Loading....</h4>
                      :  <h4 className= "font-weight-bold"> Your Current Calendar Availability</h4>
         }

         <div className= "row pb-3">
            { vendorCal.map( (cal) => {
             return (
              <div className= "col col-md-4"  key= {cal._id}>                              
               <VendorCalCard  cal= {cal}                                
               />
               </div>
             )
            })
            } 
            </div> 
           
         <div>

         </div>  
       </div>

        </div>
    )

}

export default VendorCalendarList;