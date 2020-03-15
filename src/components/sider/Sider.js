import React from 'react';
import { FacebookOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { Card, Layout } from 'antd';
const { Sider } = Layout;
const { Meta } = Card;

export default function LeftSider() {
    const iconStyle = { fontSize: '20px', color: '#046' };
    return (
        <Sider breakpoint="lg" trigger={null} collapsedWidth="0" width={300} style={{ background: '#fff' }}>
            <Card
                style={{ width: 250, margin: 30, boxShadow: "10px 3px 20px -8px rgba(0,0,0,0.2)" }}
                cover={
                <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/avator.jpg'}
                />
                }
                actions={[
                    <GithubOutlined style={iconStyle} onClick={() => window.open('https://github.com/mzzr')} />,
                    <FacebookOutlined style={iconStyle} />,
                    <MailOutlined style={iconStyle} onClick={() => window.open('mailto:0xmzzr@gmail.com')} />,
                ]}
            >
                <Meta
                title="Rui Miao"
                description="事情太多，时间太少。"
                />
            </Card>
        </Sider>
    );
}
