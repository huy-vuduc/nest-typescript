import { Form, Select } from 'antd';
import React from 'react';

const { Option } = Select;

export const Dropdown = ({ dropdownData }) => {
    const { label, message, placeholder, data, style } = dropdownData;
    const listSelectOptions = data.map(({ value, name }, key) => (
        <Option value={value} key={key}>
            {name}
        </Option>
    ));
    return (
        <Form.Item
            {...style}
            label={label}
            name="category"
            rules={[{ required: true, message: { message } }]}>
            <Select name="category" placeholder={placeholder}>
                {listSelectOptions}
            </Select>
        </Form.Item>
    );
};
