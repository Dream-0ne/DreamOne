
import {Menu,Dropdown,Button} from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './App.css';
import logo from "./bannerLogo.jpg";


const menu = (
  <Menu >
    <Menu.Item key="1" >
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" >
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" >
      3rd menu item
    </Menu.Item>
  </Menu>
);


function Occasions() {
  return (
    <>
    <nav class = "navbar">
    <img src = {logo} class = "bannerLogo"/>
    </nav>
    <div class = "instruction">
      <h1 class = "instruction-words">
            Occasion  
      </h1>
    </div>
    

    <div class= "dropButton">
      Please choose an Occasion
    </div>

    <Dropdown overlay={menu}>
      <Button>
        Choose an Occasion <DownOutlined />
      </Button>
    </Dropdown>
      

   
      
      
    </>
  );
}

export default Occasions;
