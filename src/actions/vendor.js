import axios from "axios";
import history from "../history";

export const addVendor =  async (formvalues, authtoken) =>  {
    const res = await axios.post("http://localhost:5000/api/vendor",formvalues,
    {headers: {authtoken}}); 
    history.push("/vendor/vendorcatlist");
  };

export const getAllVendorCategories = async(page) => {
  console.log("value of page", page);
  return await axios.get(`http://localhost:5000/api/vendors`); 
}

export const getVendorCategoriesUser = async(userid,page) => {
  console.log("user from actions",userid );
  return await axios.get(`http://localhost:5000/api/vendors/${userid}`,{page}); 
}

export const getVendorCategory = async(id) => {
  return await axios.get(`http://localhost:5000/api/vendor/${id}`); 
}

export const deleteVendor = async (id, authtoken) =>  {
  console.log("auth and id", id, authtoken);
  const res= await axios.delete(`http://localhost:5000/api/vendor/${id}`,
   { headers: {authtoken} }); 
   console.log("value of RES", res);
   history.push("/vendor/vendorcatlist");
  };

  export const updateVendor =  async (id,formvalues, authtoken) =>  {
    const res = await axios.put(`http://localhost:5000/api/vendor/${id}`,formvalues,
    {headers: {authtoken}}); 
    history.push("/vendor/vendorcatlist");
  };

  export const getVendors = async(order,page) => {
    return await axios.post(`http://localhost:5000/api/vendors`, {order, page}); 
  }

  export const getVendorsTotal= async () => {
    return await axios.get("http://localhost:5000/api/vendors/total"); 
  };


