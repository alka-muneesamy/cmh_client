import {useSelector} from "react-redux";
import {Card,Avatar} from "antd";
import moment from "moment";

const {Meta} = Card;

const ConnectNav= () => {

    const {user} = useSelector( (state) => ({...state}));
    return (
        <div className= "d-flex justify-content-around">
          {console.log(user)}
          <Card>
              <Meta avatar= {<Avatar>{user.name[0]}</Avatar>}
                    title={user.name} 
                    description={`Joined on ${moment(user.createdAt).fromNow()}`}
              />              
          </Card>
          { user &&
           user.stripe_seller &&
           user.stripe_seller.charges_enabled && (
            <>
            <div>Pending Balance</div>
            <div>Payout Settings</div>
            </>
           ) }          
        </div>
    )
}

export default ConnectNav;