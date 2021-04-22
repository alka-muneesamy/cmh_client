import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import VendorNav from "../../navigation/VendorNav";
import {DatePicker} from "antd";
import {Link} from "react-router-dom";
import moment from "moment";
import {fetchTimeslots} from "../../../actions/timeslot";
import {readVendorCalendar} from "../../../actions/vendorCalendar";

const VendorCalendarEdit= ({match}) => {

const {user} = useSelector( (state) => ({...state}));
const [fromDate, setFromDate] = useState("");
const [caldata, setCaldata] = useState([]);
const [toDate, setToDate] = useState("");
const [timeslots, setTimeslots] = useState([]);
const [currentSlots, setCurrentSlots] = useState([]);

const [clicked, setClicked] = useState([]);
const [loading,setLoading] = useState("false");

useEffect( () => {    
    fetchTimeslots().then( res => setTimeslots(res.data));
},[]);

useEffect( () => {
   readVendorCalendar(match.params.id)
   .then ( (res) => {
        console.log(res.data.availability[0].start);
        setFromDate(res.data.availability[0].start)
        setToDate (res.data.availability[0].end)
        setCurrentSlots(res.data.availability[0].timeslots)
   });  
},[]);

console.log("Current slots",  currentSlots);


const handleClick= (e,t,index) => {
    e.preventDefault();
    timeslots && timeslots.map ( (slot,i) => {
      if (clicked.includes(index)) {
        const temp = [...clicked];
        const tempCal= [...caldata];
       // removing the element using splice
        temp.splice(temp.indexOf(index),1);
        tempCal.splice(temp.indexOf(index),1);
      // updating the list
        setClicked(temp);
        setCaldata(tempCal);
        return;
      }
      if (i === index) {        
        setClicked(prevArray => [...prevArray, i]);
        setCaldata(prevArray => [...prevArray, e.target.value]);                 
      } else {
        return slot
      }
       })
       }

const handleSubmit= () => {

}

    return (
     <div className= "row">
      <div className= "col col-md-3">
        <VendorNav />
      </div>
      <div className="col col-md-9">
        <h2 className="font-weight-bold">Update your Availability</h2>
        <form>
            <div className= "col d-flex justify-content-center">
            { fromDate && <DatePicker
              className="site-calendar-card  ml-4 h6"
              placeholder="From date"
              size= "large"   
              defaultValue= {moment(fromDate, "YYYY-MM-DD")}              
              onChange= {(date,dateString) => 
                        setFromDate(dateString)
                       }
              disabledDate= { (current => 
                    current && current.valueOf() < moment().subtract( 1- "days"))}
             /> 
            }
            { toDate && <DatePicker
              className="site-calendar-card  ml-4 h6"
              placeholder="To date" 
              size="large"   
              defaultValue= {moment(toDate, "YYYY-MM-DD")}       
              onChange= {(date,dateString) => 
                          setToDate(dateString)
                          }
              disabledDate= { (current => 
                    current && current.valueOf() < moment().subtract( 1- "days"))}
             /> 
            }
             </div>
             <br />
             {/* {JSON.stringify(currentSlots)} */}
              {/* {currentSlots && currentSlots.map( (sl) => ( */}
              {/* <div key= {sl._id}>     */}
                {timeslots && timeslots.map( (t, index) => (
              <div className= "col  font-weight-bold d-flex justify-content-center mt-1 "
                   key= {t._id}>                         
                        
                        {console.log(t,!currentSlots.some(slot => {return slot._id == t._id}),'t')}
                        {}
                 {/* {sl._id === t._id ? setClicked=== index : setClicked=== null} */}
                 <button className=  { currentSlots.some(slot => {return slot._id == t._id}) ? "btn btn-secondary" : !clicked.includes(index)  ?  "btn btn-primary" :  "btn btn-danger"}
                        value= {t._id}
                       disabled = {currentSlots.some(slot => {return slot._id == t._id})}
                        onClick= {(e) => handleClick(e,t,index)}                        
                >  
                   {t.startSlot} - {t.endSlot} </button>          
                           
              </div>
             ))
             }
             {/* </div> */}
              )
              
             {/* )}  */}
          
            <div className= "row ">
              <div className= "col col-md-6 d-flex justify-content-end" >
               <button className="btn btn-secondary font-weight-bold"
                      onClick= {handleSubmit}> Submit your Availability</button>
               </div>
            
            <div className= "col col-md-6 d-flex justify-content-start">
              <Link to= {`/vendor/vendorcallist/${user._id}`}
               type="button" className= "btn btn-secondary font-weight-bold">Back</Link>
            </div>
            </div>
            </form>
      </div>

     </div>
    )

}

export default VendorCalendarEdit;