import React from 'react';
import { Menu } from 'antd';
import {
  Link,
  useRouteMatch,
} from "react-router-dom";

import './Nav.css'

export default function Nav() {
    const match = useRouteMatch("/:path");
    const path = match && match.params.path;
    console.log(path)
    return (
      <div style = {{ borderBottom: "#ededed 1px solid", marginTop: "6px", margin: "auto", maxWidth: 1125}}>
        <div className="logo">Miaorui's Blog</div>
        <div style = {{ display: "inline-block" }}>
            <Menu selectedKeys={[path]} mode="horizontal">
            <Menu.Item key="blog">
                <Link to="/blog">Articles</Link>
            </Menu.Item>
            <Menu.Item key="projects">
                <Link to="/projects">Projects</Link>
            </Menu.Item>
            </Menu>
        </div>        
      </div>
    )
  }