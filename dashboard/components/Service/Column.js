import React from 'react';
import { Space } from 'antd';
import Link from 'next/link';
import { SERVICE_RESOURCE } from '../../resource/service.resource';
import { EditTwoTone, FileTextTwoTone } from '@ant-design/icons';
import { LinkData } from '../Link/LinkData';

function renderButton(id) {
  return (
    <Space>
      <Link href={`${SERVICE_RESOURCE.SERVICE_ADMIN_PATH_ROOT}/${id}`}>
        <FileTextTwoTone />
      </Link>
      <Link href={`${SERVICE_RESOURCE.SERVICE_ADMIN_PATH_ROOT}/${id}${SERVICE_RESOURCE.EDIT_PATH}`}>
        <EditTwoTone />
      </Link>
    </Space>
  );
}
export const SERVICE_TABLE_COLUMN = [
  {
    title: 'Loại dịch vụ',
    dataIndex: 'category',
    key: 'category',
    // eslint-disable-next-line react/display-name
    render: (value) => {
      const path = `${SERVICE_RESOURCE.SERVICE_CATEGORY_ADMIN_PATH_ROOT}/${value.id}`;
      return <LinkData data={value} path={path} />;
    }
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'name',
    key: 'name',
    // eslint-disable-next-line react/display-name
    render: (value, row) => {
      const path = `${SERVICE_RESOURCE.SERVICE_ADMIN_PATH_ROOT}/${row.id}`;
      return <LinkData data={row} path={path} />;
    }
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '',
    dataIndex: 'id',
    width: '20%',
    align: 'center',
    render: renderButton
  }
];
