import React from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from "react-redux";
import AdminMenu from "../AdminMenu";
import { addSubcategory } from "../../../actions/subcategory";
import SubcategoriesForm from "./SubcategoriesForm";

class SubcategoriesCreate extends React.Component {  

    
   addRoute() {
     return("/admin/subcategories/subcategoriescreate");
   }

   onSubmit = (formValues) => {
     console.log("Props from subcat XXX",this.props);
       this.props.addSubcategory(formValues);
   }

     
    render() {  
          return (
              
            <div>             
             <AdminMenu 
               addRoute = {this.addRoute()}
             />
             <h1 className="category-head font-weight-bold card-header"> Add New Sub Category</h1>             
             <SubcategoriesForm
               onSubmit = {this.onSubmit}
              /> 
             </div>                         
            ); 
      }      
    }

const mapStateToProps = (state) => {
      return ( { formValues: state.form.subcategoriesForm }
     );
 }


export default connect(mapStateToProps,{ addSubcategory })(SubcategoriesCreate);