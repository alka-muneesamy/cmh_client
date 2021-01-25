import React, {useState} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Menu} from 'antd';
import { HomeOutlined, LoginOutlined, UserAddOutlined,SettingOutlined,LogoutOutlined } from '@ant-design/icons';
import "bootstrap/dist/css/bootstrap.css";
import logo from "./common/cmh_new.png";
import firebase from 'firebase';
import { LOGOUT } from "../actions/types";
import useSelection from "antd/lib/table/hooks/useSelection";

const { SubMenu} = Menu;

const Header = () => {

const [current,setCurrent] = useState('home');

const dispatch = useDispatch();
const history = useHistory();
const {user}= useSelector( (stateVal) => ({...stateVal}));

const handleClick = (e) => {
   setCurrent(e.key);
}

const logout = () => {
  firebase.auth().signOut()
  dispatch ({
     type: LOGOUT,
     payload:null

  });
  history.push("/login");
}

 return (
<div>
<header>
<section className="header-section" id="title">
  <div className="container-fluid">

    <nav className="navbar navbar-expand-lg navbar-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="nav navbar-nav navbar-center">
          <li className="nav-item">
            <a className="nav-link font-weight-bold" href="/contact">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link font-weight-bold" href="/newletter">Newsletter</a>
          </li>
          <li className="nav-item">
            <a className="nav-link font-weight-bold" href="/download">Download</a>
          </li>
        </ul>

        
      </div>

      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className= "font-weight-bold menu">

        <Menu.Item  icon={<HomeOutlined />} >
          <Link to= "/">Home </Link>
        </Menu.Item> 
        <Menu.Item  icon={<HomeOutlined />} className= "float-left">
          <Link to= "/admin">Admin</Link>
        </Menu.Item> 
        <Menu.Item  icon={<HomeOutlined />} className= "float-left">
          <Link to= "/vendor/vendorlogin">Vendor</Link>
        </Menu.Item>

        { !user && 
          <Menu.Item  icon={<LoginOutlined /> } > 
         <Link to= "/login">Login</Link>
        </Menu.Item> }
         
         { !user &&
          <Menu.Item  icon={<UserAddOutlined />}>
         <Link to= "/register">Register</Link>
        </Menu.Item> 
         }

         { user &&
          <SubMenu key="SubMenu" icon={<SettingOutlined />} 
                   className= "float-right"
                   title= {user.email && user.email.split("@")[0]}>
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Dashboard</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} onClick= {logout}>Logout</Menu.Item>
          </Menu.ItemGroup>
          
        </SubMenu>
          
         }
               
        
        
      </Menu>
    </nav>
<section>
    <div className="row">
      <div className="pull-left col-sm-12">
        <img src= { logo } alt="Compare my Helper" className="float-left header-img" />
      </div>

     </div>
  </section>
  </div>
  </section>
</header>
</div>
);
}

 function mapStateToProps(state) {
     return {auth: state.auth};
 }

export default connect(mapStateToProps)(Header);
