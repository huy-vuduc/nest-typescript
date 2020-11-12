import React from 'react';
import { PRODUCT_RESOURCE } from '../../resource/product.resource';
import { LinkData } from '../Link/LinkData';
import { Space } from 'antd';
import Link from 'next/link';
import { EditTwoTone, FileTextTwoTone } from '@ant-design/icons';

function renderButton(id) {
  return (
    <Space>
      <Link href={`${PRODUCT_RESOURCE.PRODUCT_CATEGORY_ADMIN_PATH_ROOT}/${id}`}>
        <FileTextTwoTone />
      </Link>
      <Link
        href={`${PRODUCT_RESOURCE.PRODUCT_CATEGORY_ADMIN_PATH_ROOT}/${id}${PRODUCT_RESOURCE.EDIT_PATH}`}>
        <EditTwoTone />
      </Link>
    </Space>
  );
}
export const PRODUCT_CATEGORY_TABLE_COLUMN = [
  {
    title: 'Loại sản phẩm',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    // eslint-disable-next-line react/display-name
    render: (value, row) => {
      const path = `${PRODUCT_RESOURCE.PRODUCT_CATEGORY_ADMIN_PATH_ROOT}/${row.id}`;
      return <LinkData data={row} path={path} />;
    }
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'describe'
  },
  {
    title: '',
    dataIndex: 'id',
    width: '15%',
    align: 'center',
    render: renderButton
  }
];
