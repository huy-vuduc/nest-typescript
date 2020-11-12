import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default function FooterComponent() {
    return (
        <Footer style={{ textAlign: 'right' }}>
            <span>Green Care Admin &copy;{1900 + new Date().getYear()} Created by KDA</span>
        </Footer>
    );
}
