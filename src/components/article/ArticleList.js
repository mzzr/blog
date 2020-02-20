import React, { useState, useEffect } from 'react';
import { List, Typography, Row, Col, Icon, Tag } from 'antd';
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

function TagList(props) {
    const colorMap = {
        "随笔": "magenta",
        "MLDL": "purple",
        "后端": "geekblue"
    }
    let tags = props.tags || [];
    let tagList = []
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i]
        tagList.push(<Tag key={i} color={colorMap[tag]}>{tag}</Tag>)
    }
    return (<div>{tagList}</div>)
}

function ListItem(props) {
    let itemStyle = {
        borderBottom: "1px solid #e8e8e8",
        margin: "0px",
        height: "200px",
        boxSizing: "border-box",
        padding: "10px",
        color: "#666",
    }
    let item = props.item
    return (
            <div style={itemStyle} >
                <Row>
                    <Col span={18}>
                        <Link to={item.href}>
                            <Title level={3} style={{margin: 0}}>{ item.title }</Title>
                        </Link>
                    </Col> 
                    <Col span={6} style={{textAlign: "right"}}>
                        <Icon type="clock-circle" />
                        <Text style={{fontFamily: "Georgia,serif"}}>&nbsp;{item.date}</Text>
                    </Col>
                </Row>
                <TagList tags={item.tags} />
                <Paragraph type="secondary" ellipsis={{ rows: 4}} style={{marginTop: 10}}>
                    { item.description }
                </Paragraph>
            </div>
    )   
};

export default function ArticleList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/articles.json')
        .then(response => response.json())
        .then(data => {
            setData(data);
            setLoading(false);
        });
    }, [])

    return loading || (
        <List
            itemLayout="vertical"
            size="middle"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,
            }}
            split={true}
            dataSource={data}
            renderItem={item => (<ListItem item={item}/>)}
        />
    )
}