import React from 'react';
import { Card, Icon, Layout } from 'antd';
const { Sider } = Layout;
const { Meta } = Card;

export default function LeftSider() {
    const iconStyle = { fontSize: '20px', color: '#046' };
    return (
        <Sider breakpoint="lg" trigger={null} collapsedWidth="0" width={300} style={{ background: '#fff' }}>
            <Card
                style={{ width: 250, margin: 30 }}
                cover={
                <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/avator.jpg'}
                />
                }
                actions={[
                <Icon type="github" style={iconStyle} onClick={() => window.open('https://github.com/mzzr')} />,
                <Icon type="facebook" style={iconStyle} />,
                <Icon type="mail" style={iconStyle}  onClick={() => window.open('mailto:0xmzzr@gmail.com')}/>,
                ]}
            >
                <Meta
                title="Rui Miao"
                description="No description yet."
                />
            </Card>
        </Sider>
    )
}
