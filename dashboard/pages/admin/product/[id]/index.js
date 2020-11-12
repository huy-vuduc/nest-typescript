import React, { useState } from 'react';
import Admin from 'layouts/Admin.js';
import { RobotOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Space, Typography, Upload, Button } from 'antd';
import { PRODUCT_RESOURCE } from '../../../../resource/product.resource';
import { getBase64 } from '../../../../services/image/image.service';
import Link from 'next/link';

const data = {
    key: '3',
    category: 'Mac',
    name: 'Joe Black',
    describe:
        'Sidney No. 1 Lake Park Sidney No. 1 Lake Park Sidney No. Sidney No. 1 Lake Park Sidney No. 1 Lake Park Sidney No.Sidney No. 1 Lake Park Sidney No. 1 Lake Park Sidney No. Sidney No. 1 Lake Park Sidney No. 1 Lake Park Sidney No.Sidney No. 1 Lake Park Sidney No. 1 Lake Park Sidney No. Sidney No. 1 Lake Park Sidney No. 1 Lake Park Sidney No.',
    price: 32
};

const fileListData = [
    {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url:
            'https://images.unsplash.com/photo-1602966291901-c551c3ccbb36?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
    },
    {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url:
            'https://images.unsplash.com/photo-1602966291901-c551c3ccbb36?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
    },
    {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url:
            'https://images.unsplash.com/photo-1602966291901-c551c3ccbb36?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
    },
    {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url:
            'https://images.unsplash.com/photo-1602966291901-c551c3ccbb36?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
    },
    {
        uid: '-5',
        name: 'image.png',
        status: 'done',
        url:
            'https://images.unsplash.com/photo-1602966291901-c551c3ccbb36?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
    },
    {
        uid: '-6',
        name: 'image.png',
        status: 'done',
        url:
            'https://images.unsplash.com/photo-1602966291901-c551c3ccbb36?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
    }
];

function Index() {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            getBase64(file.originFileObj, (imageUrl) => {
                setPreviewImage(imageUrl);
            });
        }
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    return (
        <div>
            <div>
                <div>
                    <Typography.Title level={4}>
                        <RobotOutlined />
                        &nbsp;&nbsp;{PRODUCT_RESOURCE.TITLE_VIEW_PRODUCT}&nbsp;
                    </Typography.Title>
                </div>
                <div style={{ float: 'right', marginTop: -28, marginRight: 60 }}>
                    <Space>
                        <Link
                            href={`${PRODUCT_RESOURCE.PRODUCT_ADMIN_PATH_ROOT}/1${PRODUCT_RESOURCE.EDIT_PATH}`}>
                            <Button
                                type="primary"
                                shape="round"
                                icon={<EditOutlined />}
                                size="small"
                            />
                        </Link>
                        <Link href="#">
                            <Button
                                danger={true}
                                type="primary"
                                shape="round"
                                icon={<DeleteOutlined />}
                                size="small"
                            />
                        </Link>
                    </Space>
                </div>
            </div>
            <div style={{ paddingTop: 20 }}>
                <Row>
                    <Col span={3}>
                        <Space direction="vertical" size="middle">
                            <Typography.Text strong type="secondary">
                                {PRODUCT_RESOURCE.LB_PRODUCT_CATEGORY_NAME}:
                            </Typography.Text>
                            <Typography.Text strong type="secondary">
                                {PRODUCT_RESOURCE.LB_PRODUCT_NAME}:
                            </Typography.Text>
                            <Typography.Text strong type="secondary">
                                {PRODUCT_RESOURCE.LB_PRODUCT_PRICE}:
                            </Typography.Text>
                            <Typography.Text strong type="secondary">
                                {PRODUCT_RESOURCE.LB_PRODUCT_DESCRIPTION}:
                            </Typography.Text>
                        </Space>
                    </Col>
                    <Col span={9}>
                        <Space direction="vertical" size="middle">
                            <Typography.Text>{data.category}</Typography.Text>
                            <Typography.Text>{data.name}</Typography.Text>
                            <Typography.Text>{data.price}</Typography.Text>
                            <Typography.Text>{data.describe}</Typography.Text>
                        </Space>
                    </Col>
                    <Col span={12} style={{ paddingLeft: 30 }}>
                        <Upload
                            listType="picture-card"
                            showUploadList={{
                                showPreviewIcon: true,
                                showRemoveIcon: false
                            }}
                            fileList={fileListData}
                            onPreview={handlePreview}
                        />
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

Index.layout = Admin;

export default Index;
