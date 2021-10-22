import { Layout } from 'antd';

import {Menu,Dropdown,Button,Space} from "antd";
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

const { Header, Footer, Sider, Content } = Layout;
function Occasions() {
  return ( 
    <Layout>
        <Header class = "navbar">
          <img src = {logo} class = "bannerLogo"/>
          <Header class = "secondHeader">
            <div style= {{backgroundColor : "#FCE9DB"}}>
              <h1 class = "instruction-words">
                    Occasion  
              </h1>
            </div>
          </Header>
      </Header>

     
     {/* <Content> */}
       Hello world
      {/* <div class = "instruction">
      <h1 >
        Please choose any one occasion to start your plan:
      </h1>
      
      
      </div>

      <div class = "instruction">
      <Dropdown overlay={menu} >
        <Button shape = "round" size = "large" style={{background :"#C0988D"}}>
            <h3 style = {{color: "#FFF0F0"}}>Choose an Occasion <DownOutlined /></h3>
          </Button>
        </Dropdown>
      </div> */}
      {/* </Content> */}
    </Layout>

    
  );
}

export default Occasions;
