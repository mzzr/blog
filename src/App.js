import React from 'react';
import { Layout, Result, Button } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import Nav from './components/nav/Nav';
import LeftSider from './components/sider/Sider';
import Article from './components/article/Article';
import ArticleList from './components/article/ArticleList';

const { Content } = Layout;
const contentStyle = {
  background: "#fff",
  padding: 24,
}

const layoutStyle = {
  margin: "auto",
  maxWidth: 1125,
  minHeight: "calc(100vh - 100px)"
}

// const pageHeight = document.body.clientHeight
// console.log(1111, pageHeight)
// const layoutStyle = {
//   background: 'linear-gradient(#002E4B 50%, #0081B6 50%)',
//   backgroundSize: '100% 50px',
//   backgroundPosition: '0 35px',
//   height: pageHeight,
// }

function NoMatch() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/blog">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  )
}

function App() {
  return (
    <Router>
      <Nav />
      <Layout style={ layoutStyle } >
        <LeftSider/>
        <Content style={ contentStyle } >
          <Switch>
            <Redirect exact from='/' to='/blog'/>
            <Route exact path="/blog">
              <ArticleList />
            </Route>
            <Route exact path="/blog/:id">
              <Article />
            </Route>
            <Route path="/projects">
              Projects placeholder.
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Content>
      </Layout>
      <div style={{ textAlign: 'center', padding: 10 }}>
        版权所有 <span role="img" aria-label="Copyright">©️</span> 京ICP备19010859号-1
      </div>


    </Router>
    
  );
}

export default App;
