import React from "react";
import {Card,Tabs} from "antd";
import {Link} from "react-router-dom";
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import VendorListItems from "./VendorListItems";
import StarRatings from  "react-star-ratings";
import StarRatingModal from "../Modal/StarRatingModal";
import {showAverageRating} from "../../actions/rating";

const {TabPane} = Tabs;

const SingleVendor= ({vendor, onRatingClick, rating}) => {
   
  console.log("Rating from single vendor",{rating});

    const {_id,vendorInfoId, images} = vendor;
    return (
        <div className="row">
            <div className= "col col-md-6">
              <Carousel showArrows={true} autoPlay infiniteLoop> 
                 {images && images.map( (i) => (
                      <img src= {i.url} key={i.public_id} />                 
                 )
                 )}
              </Carousel> 
            
           </div>
           
            <div className= "col col-md-6 font-weight-bold h6">
           { vendor ?  <h1 className="bg-info p-3">{vendorInfoId.name}</h1>
                    : <h1>Loading...</h1>}           
            { vendor && vendor.ratings && vendor.ratings.length > 0
              ? showAverageRating(vendor)
              : <div className= "d-flex justify-content-center mt-1 mb-3">"No rating yet"</div>
            }
             <Card
              actions= {[ <Link to= {`/vendor/${_id}`}>
                      <ShoppingCartOutlined  className= "text-success" /> <br />Select Vendor
                      </Link>,
                     <Link to= {`/vendor/vendorcatdelete/${_id}`}>
                      <HeartOutlined  className= "text-danger" /><br />Add to Wishlist
                      </Link>,
                      <StarRatingModal>
                        <StarRatings 
                            starRatedColor= "red"
                            noOfStars= {5}
                            rating={rating}
                            changeRating= {onRatingClick}                            
                            name={_id}
                            isSelectable={true}
                         />
                       </StarRatingModal>
                       ]}    >
                 <VendorListItems vendor = {vendor}/>
            </Card>
                 
            </div>
          <div className="row">
            <Tabs type= "card">
              <TabPane tab= "More Details" key="1">
                  For any further queries, please call us on XXXX-XXX-XXXX
              </TabPane>
            </Tabs>
          </div> 
        </div>
        

    )

}

export default SingleVendor;