import React, {useState, useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import { List, Card } from "antd";
import {fetchTimeslots} from "../../actions/timeslot";
import moment from "moment";
import _ from "lodash";

const RenderTimeslot = ({timeslotval,index,day,isDate}) => {  

     const {dayval} = useSelector( (state) => ({...state}));
     const {timeslotsval}= useSelector( (state) => ({...state}));
     const [caldata,setCaldata] = useState([]);
     const [ color, setColor] = useState(false);
    
    const dispatch= useDispatch();
    const timeslots= [];
      
    const handleClick= (e,timeslotval,index,day) => {
      e.preventDefault();
      setColor(!color); 
       // timeslots && timeslots.map ( (slot,i) => {
      //   if (color.includes(index)) {
      //     const temp = [...color];
      //     const tempCal= [...caldata];
      //    // removing the element using splice
      //     temp.splice(temp.indexOf(index),1);
      //     tempCal.splice(temp.indexOf(index),1);
      //   // updating the list
      //     setColor(temp);
      //     setCaldata(tempCal);
      //     return;
      //   }
      //   if (i === index) {        
      //     setColor(prevArray => [...prevArray, i]);
      //     setCaldata(prevArray => [...prevArray, e.target.value]);                 
      //   } else {
      //     return slot
      //   }
      //    })
      localStorage.setItem("dayval", day);
      if (typeof window !== "undefined")  {
        if (localStorage.getItem("timeslots")) {
          timeslots= JSON.parse(localStorage.getItem("timeslots"))
        }
        timeslots.push({ ...timeslotval,
                         count: 1})
      } 
      {console.log("TIMESLOTS", timeslots)} 
      let unique=_.uniqWith(timeslots,_.isEqual);  
      //add to redux store
      dispatch({
        type: "SELECTED_DAY",
         payload:{ 
             dayval: day
         }
      });

      dispatch({
            type: "SELECTED_TIMESLOT",
             payload:{ 
                 tsday:day,
                 tstimeslot:unique
             }
          });         
           
       console.log("redux store val", dayval.dayval, timeslotsval);     
     } 
     
     const disableButtons= (timeslots,key) => {
      let newslots = new Set();
      return timeslots.filter(item => {
          let k = key(item);
          return newslots.has(k) ? false : newslots.add(k);
      });
  } 
        
  return (
             <div>                  
              <button className= "btn btn-primary btn-sm font-weight-bold"
                      key={timeslotval._id}
                      className=  { timeslotval.tsday==dayval.dayval
                                    && timeslotsval.timeslotsval.some(slot => {return slot._id == timeslotval._id})
                                    ?  "btn btn-danger" :  "btn btn-primary"}
                       value= {timeslotval._id}
                        onClick= {(e) => handleClick(e,timeslotval,index,day)} 
                                             >
                    {timeslotval.startSlot}-{timeslotval.endSlot}
                    
               </button>
             
             </div>      
     
       
  )
}

export default RenderTimeslot;