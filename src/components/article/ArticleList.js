import React, { useState, useEffect, useContext } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { List, Typography, Row, Col, Spin } from 'antd';
import { Link } from "react-router-dom";
import { TopTagList, ArticleTagList, TagContext, ADD_TAG } from '../tag/tag' 

const { Title, Text, Paragraph } = Typography;

function ListItem(props) {
    let itemStyle = {
        borderBottom: "1px solid #e8e8e8",
        margin: "0px 5px 10px 5px",
        height: "180px",
        boxSizing: "border-box",
        padding: "10px",
        color: "#666",
        transition: '0.3s',
        boxShadow: "0px 3px 20px -8px rgba(0,0,0,0.3)",
    }
    const [hover, setHover] = useState(false);
    if (hover) {
        itemStyle["boxShadow"] = "0px 3px 25px -8px rgba(0,0,0,0.7)"
        itemStyle["margin"] = "0px 0px 10px 0px"
        itemStyle["padding"] = "10px 15px"
    }
    const item = props.item
    return (
        <Link to={item.href}>
            <div style={itemStyle}
                onMouseEnter={()=>setHover(true)} 
                onMouseLeave={()=>setHover(false)}>
                
                <Row>
                    <Col span={18}>
                            <Title level={3} style={{margin: 0}}>{ item.title }</Title>
                    </Col> 
                    <Col span={6} style={{textAlign: "right"}}>
                        <ClockCircleOutlined />
                        <Text style={{fontFamily: "Georgia,serif"}}>&nbsp;{item.date}</Text>
                    </Col>
                </Row>
                <ArticleTagList tags={item.tags} />
                <Paragraph type="secondary" ellipsis={{ rows: 3}} style={{marginTop: 10}}>
                    { item.description }
                </Paragraph>

                </div>
        </Link>

    );   
}

export default function ArticleList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {state, dispatch} = useContext(TagContext)
    const activeList = state.activeList
    const [show, setShow] = useState(true)

    useEffect(() => {
        setShow(i => !i)
        setTimeout(() => setShow(i => !i), 0)
    }, [state])

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/articles.json')
        .then(response => response.json())
        .then(data => {
            setData(data);
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        data.forEach(item => {
            item.tags.forEach( tag => dispatch({type: ADD_TAG, tag: tag}))
        })
    }, [data, dispatch])

    const filterFunc = (item) => {
        // filter draft
        if (item.tags.indexOf("Draft") !== -1 &&
            activeList.indexOf("Draft") === -1 ) {
            return false
        }
        for (let i = 0; i < activeList.length; i+=1) {
            if (item.tags.indexOf(activeList[i]) !== -1) {
                return true
            }
        }
        return false
    }

    let filterData = data.filter(filterFunc)
    // console.log(filterData, state)

    if (loading) {
        return <Spin delay={300} size="large" style={{width: "100%", paddingTop: "calc(30vh)"}} />
    } else {
        return (
            <div>
                <TopTagList/>
                <List
                    className={show?"show":"hide"}
                    itemLayout="vertical"
                    size="big"
                    pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                    }}
                    split={true}
                    dataSource={filterData}
                    renderItem={item => (<ListItem item={item}/>)}
                />
            </div>
        )
    }
}