import { Button, Card, Col, Form, Row, Input, Upload, Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Dropdown } from '../../../components/Dropdown/Dropdown';
import { PRODUCT_RESOURCE } from '../../../resource/product.resource';
import { BUTTON } from '../../../resource/common.resource';
import { getBase64 } from '../../../services/image/image.service';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

import Admin from 'layouts/Admin.js';
const dropdownData = {
    label: PRODUCT_RESOURCE.LB_PRODUCT_CATEGORY_NAME_DROPDOWN,
    message: PRODUCT_RESOURCE.MGS_REQUIRED_PRODUCT_CATEGORY,
    placeholder: PRODUCT_RESOURCE.PHD_PRODUCT_CATEGORY,
    data: [
        { value: 'iphone', name: 'Iphone' },
        { value: 'mac', name: 'Mac' }
    ]
};

const fileListData = [
    {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
        uid: '-5',
        name: 'image.png',
        status: 'error'
    }
];

const Create = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState(fileListData);
    const router = useRouter();

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

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleFormSubmit = (value) => {
        console.log(value.name, value.description, value.category, value.price);
    };

    return (
        <Card title={PRODUCT_RESOURCE.TITLE_ADD_PRODUCT}>
            <Form
                requiredMark={true}
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                onFinish={handleFormSubmit}>
                <Row>
                    <Col span={12}>
                        <div>
                            <Dropdown dropdownData={dropdownData} />
                        </div>
                        <div>
                            <Form.Item label={PRODUCT_RESOURCE.LB_PRODUCT_IMAGE} />
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}>
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Form.Item
                                name="name"
                                label={PRODUCT_RESOURCE.LB_PRODUCT_NAME}
                                rules={[
                                    {
                                        required: true,
                                        message: PRODUCT_RESOURCE.MGS_REQUIRED_PRODUCT_NAME
                                    }
                                ]}>
                                <Input name="name" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label={PRODUCT_RESOURCE.LB_PRODUCT_DESCRIPTION}>
                                <TextArea name="description" rows={4} />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[
                                    {
                                        required: true,
                                        message: PRODUCT_RESOURCE.MGS_REQUIRED_PRODUCT_PRICE
                                    }
                                ]}>
                                <Input name="price" />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <div>
                    <Row>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                style={{ marginRight: 30 }}>
                                {BUTTON.BTN_SAVE}
                            </Button>
                            <Button type="primary" danger size="large" onClick={router.back}>
                                {BUTTON.BTN_CANCEL}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Card>
    );
};

Create.layout = Admin;

export default Create;
