import axios from "axios";
import { formValues } from "redux-form";
import history from "../history";
import addressDistance from "../apis/addressDistance";
import {FETCH_USER, 
        FETCH_DISTANCE,
        SUBMIT_VENDOR, 
        CREATE_VENDOR,
        CREATE_CATEGORY,
        FETCH_CATEGORIES,
        FETCH_CATEGORY,
        EDIT_CATEGORY,
        DELETE_CATEGORY,
        FETCH_CATEGORIES_NAME,
        CREATE_SUBCATEGORY,
        FETCH_SUBCATEGORIES,
        FETCH_SUBCATEGORY,
        EDIT_SUBCATEGORY,
        DELETE_SUBCATEGORY,
        CREATE_QUESTION,  
        FETCH_QUESTIONS
      } from "./types";

export const fetchDistance = () =>
{
  return ( async (dispatch) => {
    const response = await addressDistance.get("/json?origins");
    dispatch({type: FETCH_DISTANCE, payload: response});
  });
}

export const fetchUser = () =>
{
 return (async (dispatch) => {
  const res= await axios.get("/api/current_user");
   dispatch({type: FETCH_USER, payload:res.data});
 })
}
//action creators for Categories master
export const addCategory = (values) => {
   return( async (dispatch) => {
    const res = await axios.post("http://localhost:5000/api/category",values);
    dispatch({type: CREATE_CATEGORY, payload: res.data });
    history.push("/admin/categories/categorieslist");
  });
};

export const fetchCategories = () => async (dispatch) => {
   const res= await axios.get("http://localhost:5000/api/category");
   console.log("Response from fetch categories:",res.data);
   dispatch({type: FETCH_CATEGORIES, payload: res.data});
     
  };

  export const editCategory = (id, formValues) => {
    return( async (dispatch) => {
      const res= await axios.patch(`http://localhost:5000/api/category/${id}`,formValues);
      dispatch({type:EDIT_CATEGORY, payload: res.data});
      history.push("/admin/categories/categorieslist");
    });
  };

export const fetchCategory = (id) => {
  return( async (dispatch) => {
    const res= await axios.get(`http://localhost:5000/api/category/${id}`);
    dispatch({type: FETCH_CATEGORY, payload:res.data});
  });
};

export const deleteCategory =(id) => {
  return( async (dispatch) => {
  await axios.delete(`http://localhost:5000/api/category/${id}`);  
  dispatch({type: DELETE_CATEGORY, payload: id});
  history.push("/admin/categories/categorieslist");
  });
};

 //action creator for Subcategory Master
 export const addSubcategory = (values) => async (dispatch) => {
   console.log("Values from action creator",values);
   const res = await axios.post("http://localhost:5000/api/subcategory",values);
   dispatch({type: CREATE_SUBCATEGORY, payload: res.data});
   history.push("/admin/subcategories/subcategorieslist");
 }

 export const fetchSubcategories = () => async (dispatch) => {
    const res = await axios.get("http://localhost:5000/api/subcategory");
    dispatch({ type: FETCH_SUBCATEGORIES, payload:res.data });
 }

 export const fetchSubcategory = (id) => async (dispatch) => {
    const res = await axios.get(`http://localhost:5000/api/subcategory/${id}`);
    dispatch({ type: FETCH_SUBCATEGORY, payload: res.data});
 }

 export const editSubcategory = (id, formValues) => async (dispatch) => {
   console.log("Formvalues from edit subcategory",formValues);
    const res = await axios.patch(`http://localhost:5000/api/subcategory/${id}`,formValues);
    dispatch( { type: EDIT_SUBCATEGORY, payload: res.data});
    history.push("/admin/subcategories/subcategorieslist");
 }

export const deleteSubcategory = (id) => {
    return( async (dispatch) => {
    await axios.delete(`http://localhost:5000/api/subcategory/${id}`);
    dispatch({type: DELETE_SUBCATEGORY, payload: id });
    history.push("/admin/subcategories/subcategorieslist");
  })
}

 //action creator for Questions Master
 export const addQuestion = (values) => {
   return( async (dispatch) => {
      console.log("In questions action creator", values);
       const res = await axios.post("http://localhost:5000/api/questions", values);
       console.log("Response from questions action creator:",res.data);
       dispatch({type: CREATE_QUESTION, payload: res.data});
       history.push("/admin/questions/questionslist");
   })
 }

 export const fetchQuestions = () => {
   return (async (dispatch) => {
     const res = await axios.get("http://localhost:5000/api/questions");
     dispatch({ type: FETCH_QUESTIONS, payload: res.data})
   })
 }
 

//action creator for Vendors
export const submitVendor = (values, history) => {
  return ( async (dispatch) => {
    console.log("values from vendor action creator:",values);
     const res = await axios.post("http://localhost:5000/api/vendor", values);
         //  history.push("/");
    //  window.location.href = '/'
     dispatch({type: SUBMIT_VENDOR, payload:res.data});
  })    
}

export const submitVendorCategories = (values,history) => {
   return (async (dispatch) => {
     const res= await axios.post("http://localhost:5000/api/vendorcategories",values);
     //  history.push("/");
    window.location.href = '/'
   })
}

//util for fetching the category name
export const fetchCategoriesName = () => async (dispatch) => {
  const res= await axios.get("http://localhost:5000/api/categoryname");
  console.log("Response from fetch categories name:", res.data);
  dispatch({type: FETCH_CATEGORIES_NAME, payload: res.data});    
 };




