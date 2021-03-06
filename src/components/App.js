import React, { useEffect} from "react";
import {Router, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {auth} from "../firebase";
import {useDispatch} from 'react-redux';

import * as actions from "../actions";
import history from "../history";

import Mainpage from "./Mainpage";
import GetAllVendors from "./home/GetAllVendors";

import AdminDashboard from "./admin/AdminDashboard";
import CategoriesCreate from "./admin/Categories/CategoriesCreate";
import CategoriesList from "./admin/Categories/CategoriesList";
import CategoriesEdit from "./admin/Categories/CategoriesEdit";
import CategoriesDelete from "./admin/Categories/CategoriesDelete";
import SubcategoriesCreate from "./admin/Subcategories/SubcategoriesCreate";
import SubcategoriesList from "./admin/Subcategories/SubcategoriesList";
import SubcategoriesDelete from "./admin/Subcategories/SubcategoriesDelete";
import SubcategoriesEdit from "./admin/Subcategories/SubcategoriesEdit";
import QuestionsCreate from "./admin/Questions/QuestionsCreate";
import QuestionsList from "./admin/Questions/QuestionsList";
import QuestionsEdit from "./admin/Questions/QuestionsEdit";
import QuestionsDelete from "./admin/Questions/QuestionsDelete";
import SubcategoryQuestionsCreate from "./admin/SubcategoryQuestions/SubcategoryQuestionsCreate";
import SubcategoryQuestionsEdit from "./admin/SubcategoryQuestions/SubcategoryQuestionsEdit";
import SubcategoryQuestionsDelete from "./admin/SubcategoryQuestions/SubcategoryQuestionsDelete";
import SubcategoryQuestionsList from "./admin/SubcategoryQuestions/SubcategoryQuestionsList";

import Header from "./Header";
import Footer from "./Footer";
import Shop from "./utils/Shop.js";
import Cart from "./Cart";
import SideDrawer from "./drawer/SideDrawer";
import Checkout from "./pages/Checkout";
// home page
import VendorDetails from "./home/VendorDetails";
import GetVendorsSubcat from "./home/GetVendorsSubcat";

//login and registration
import Login from "./login/Login";
import Register from "./login/Register";
import RegisterComplete from "./login/RegisterComplete";
import ForgotPassword from "./login/ForgotPassword";
// use navigation
import UserHistory from "./user/UserHistory";
import UserPassword from "./user/UserPassword";
//vendor navigation
import VendorHistory from "./vendor/VendorHistory";
import VendorPassword from "./vendor/VendorPassword";
import Vendor from "./admin/Vendor";
import VendorNew from "./vendor/VendorNew";
import VendorCategories from "./admin/VendorCategories";
import Vendorsign from "./vendor/Vendorsign";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

import VendorDashboard from "./vendor/VendorDashboard";
import VendorCreate from "./vendor/VendorProducts/VendorCreate";
import VendorEdit from "./vendor/VendorProducts/VendorEdit";
import VendorInfoCreate from "./vendor/VendorInfo/VendorInfoCreate";
import VendorInfoEdit from "./vendor/VendorInfo/VendorInfoEdit";
import VendorsInfoList from "./vendor/VendorInfo/VendorsInfoList"
import VendorCatList from "./admin/Vendors/VendorCatList";
import VendorCatDelete from "./admin/Vendors/VendorCatDelete";
import VendorListUser from "./vendor/VendorProducts/VendorListUser";

import { LOGGED_IN_USER } from "../actions/types";
import {currentUser, admintUser} from "../actions/auth";

const App = () => {

  const dispatch= useDispatch();

   useEffect(() => {
     const unsubscribe= auth.onAuthStateChanged( async (user) => 
     {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)     
          .then ( (res) => dispatch ({
                 type: LOGGED_IN_USER,
                 payload: {
                 name: res.data.name,
                 email: res.data.email,
                 token: idTokenResult.token,
                 role: res.data.role,
                _id: res.data._id
              }
          })) 
          .catch ( (err) => console.log(err));        
      }
    });
    //clean up
     return () => unsubscribe();
  }, []); 
      
  return (
     <div className="App">
     <Router history = {history}>
       <Header />
       <SideDrawer />
       <ToastContainer />
       {/* login and registration routes */}
       <Switch>
        <Route  path= "/login" exact component= {Login} />
        <Route path= "/register" exact component= {Register} />
        <Route path= "/registercomplete" exact component= {RegisterComplete} />
        <Route path= "/forgot/password" exact component= {ForgotPassword} />
       </Switch>
       {/* Home page routes */}
       {/* <Route path= "/" exact component= {GetAllVendors} />   */}
       <Route path= "/" exact component= {Mainpage} />      
       <Route path= "/vendor" exact component= {VendorDashboard} />
       <Route path= "/allvendors" exact component= {GetAllVendors} /> 
       <Route path= "/vendorcat/:slug"  exact component= {GetVendorsSubcat} />

        {/* admin routes   */}
       <AdminRoute path= "/admin/categories/categoriescreate" exact component= {CategoriesCreate} />
       <AdminRoute path= "/admin/categories/categorieslist" exact component= {CategoriesList} />
       <AdminRoute path= "/admin/categories/categoriesedit/:slug" exact component= {CategoriesEdit} />
       <AdminRoute path= "/admin/categories/categoriesdelete/:slug" component= {CategoriesDelete} />

       <AdminRoute path= "/admin/subcategories/subcategoriescreate" exact component= {SubcategoriesCreate} />
       <AdminRoute path= "/admin/subcategories/subcategorieslist" exact component= {SubcategoriesList} />
       <AdminRoute path= "/admin/subcategories/subcategoriesdelete/:slug"   component= {SubcategoriesDelete} />
       <AdminRoute path= "/admin/subcategories/subcategoriesedit/:slug"  component= {SubcategoriesEdit} />

       <AdminRoute path= "/admin/questions/questionscreate" exact component= {QuestionsCreate} />
       <AdminRoute path= "/admin/questions/questionslist"  component= {QuestionsList} /> 
       <AdminRoute path= "/admin/questions/questionsedit/:id"  component= {QuestionsEdit} />
       <AdminRoute path= "/admin/questions/questionsdelete/:id" component= {QuestionsDelete} />        

       <Route path= "/admin/subcatquestions/subcatquestionscreate"  component= {SubcategoryQuestionsCreate} />
       <Route path= "/admin/subcatquestions/subcatquestionsedit/:id" component= {SubcategoryQuestionsEdit} />
       <Route path= "/admin/subcatquestions/subcatquestionsdelete/:id"  component= {SubcategoryQuestionsDelete} />
       <Route path= "/admin/subcatquestions/subcatquestionslist" exact component= {SubcategoryQuestionsList} />
       <Route path= "/admin/vendor" exact component= {Vendor} /> 

       <AdminRoute path= "/vendor/vendorsinfolist" exact component={VendorsInfoList} /> 
       <AdminRoute path= "/vendor/vendorcatlist" exact component={VendorCatList} />   

        {/* vendor routes */}
       <UserRoute path= "/vendor/vendorcreate" exact component= {VendorCreate} />
       <UserRoute path= "/vendor/vendoredit/:id" exact component= {VendorEdit} />

      {/* user routes */}
       <UserRoute path= "/user/history" exact component= {UserHistory} />
       <UserRoute path= "/user/userpassword" exact component = {UserPassword} />
       <UserRoute  exact path= "/vendor/dashboard"  component= {VendorDashboard} />
       <UserRoute path= "/vendor/password" exact component= {VendorPassword} />
       <UserRoute path= "/vendor/vendordetails" exact component= {VendorNew} />
       <UserRoute path= "/vendor/vendorcategories" exact component= {VendorCategories} />
       <UserRoute path= "/vendor/vendorcatdelete/:id" exact component= {VendorCatDelete} />      
       <UserRoute path= "/vendor/vendorcatlistuser/:userid" exact component= {VendorListUser} />
     
       
       <Switch>
         <UserRoute path= "/vendor/vendorinfocreate" exact component= {VendorInfoCreate} />
         <UserRoute path= "/vendor/vendorinfoedit/:email" exact component= {VendorInfoEdit} />
       </Switch>

       <AdminRoute path= "/admin/dashboard" exact component= {AdminDashboard} />
       <Route path= "/vendordetails/:id" exact component= {VendorDetails} />
       <Route path= "/shop" exact component= {Shop} />
       <Route path="/cart" exact component= {Cart} />
       <UserRoute path="/checkout" exact component={Checkout} />
      
       {/* <Footer /> */}
     </Router>
    </div>
  );
}


export default connect(null,actions)(App);
