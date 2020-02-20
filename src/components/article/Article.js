import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monoBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Card } from 'antd';

function codeRenderer(props) {
    return (
        <SyntaxHighlighter 
            language={props.language} 
            style={monoBlue} 
            showLineNumbers={true}
            lineNumberProps={{ 
                style: { display: 'block', background: '#dee', width: 30, textAlign: 'center', color: '#108ee9' }
            }}
        >
            {props.value}
        </SyntaxHighlighter>
    )
}

function headingRenderer(props) {
    const level = props.level
    const text = props.children[0].props.value
    switch (level) {
        case 1:
          return <h1 style={{fontSize: "2.5em"}}> {text} </h1>
        case 2:
          return <h2 style={{borderBottom: "2px solid #999"}}> {text} </h2>
        case 3:
          return <h3> {text} </h3>
        case 4:
          return <h4> {text} </h4>
        case 6:
          return <h5> {text} </h5>
        case 5:
          return <h6> {text} </h6>
        default:
          return <h6> {text} </h6>
      }
}

function imageRenderer(props) {
    return (
        <Card>
            <img alt="" {...props} style={{width: "70%", maxWidth: 800}}></img>
        </Card>
    )
}

export default function Article() {
    const { id } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/articles/' + id + '.md')
        .then(response => response.text())
        .then(data => {
            setData(data);
        });
    }, [id])

    return (
        <div>
            <ReactMarkdown 
                source={data}
                renderers={{
                    code: codeRenderer,
                    heading: headingRenderer,
                    image: imageRenderer,
                }} 
            />
        </div>
    )
}