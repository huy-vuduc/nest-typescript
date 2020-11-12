import React from 'react';
import { Space } from 'antd';
import { PRODUCT_RESOURCE } from '../../resource/product.resource';
import { FileTextTwoTone, EditTwoTone } from '@ant-design/icons';
import { LinkData } from '../Link/LinkData';
import Link from 'next/link';

function renderButton(id) {
  return (
    <Space>
      <Link href={`${PRODUCT_RESOURCE.PRODUCT_ADMIN_PATH_ROOT}/${id}`}>
        <FileTextTwoTone />
      </Link>
      <Link href={`${PRODUCT_RESOURCE.PRODUCT_ADMIN_PATH_ROOT}/${id}${PRODUCT_RESOURCE.EDIT_PATH}`}>
        <EditTwoTone />
      </Link>
    </Space>
  );
}

export const PRODUCT_TABLE_COLUMN = [
  {
    title: 'Loại sản phẩm',
    dataIndex: 'category',
    key: 'categoryName',
    width: '15%',
    // eslint-disable-next-line react/display-name
    render: (value) => {
      const path = `${PRODUCT_RESOURCE.PRODUCT_CATEGORY_ADMIN_PATH_ROOT}/${value.id}`;
      return <LinkData data={value} path={path} />;
    }
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    width: '35%',
    // eslint-disable-next-line react/display-name
    render: (value, row) => {
      const path = `${PRODUCT_RESOURCE.PRODUCT_ADMIN_PATH_ROOT}/${row.id}`;
      return <LinkData data={row} path={path} />;
    }
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    width: '30%'
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    width: '20%'
  },
  {
    title: '',
    dataIndex: 'id',
    width: '20%',
    align: 'center',
    render: renderButton
  }
];
