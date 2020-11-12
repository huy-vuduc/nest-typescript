import React from 'react';
import { Space } from 'antd';
import Link from 'next/link';
import { EditTwoTone, FileTextTwoTone } from '@ant-design/icons';
import { SERVICE_RESOURCE } from '../../resource/service.resource';
import { LinkData } from '../Link/LinkData';

function renderButton(id) {
  return (
    <Space>
      <Link href={`${SERVICE_RESOURCE.SERVICE_CATEGORY_ADMIN_PATH_ROOT}/${id}`}>
        <FileTextTwoTone />
      </Link>
      <Link
        href={`${SERVICE_RESOURCE.SERVICE_CATEGORY_ADMIN_PATH_ROOT}/${id}${SERVICE_RESOURCE.EDIT_PATH}`}>
        <EditTwoTone />
      </Link>
    </Space>
  );
}
export const SERVICE_CATEGORY_TABLE_COLUMN = [
  {
    title: 'Loại dịch vụ',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    // eslint-disable-next-line react/display-name
    render: (value, row) => {
      const path = `${SERVICE_RESOURCE.SERVICE_CATEGORY_ADMIN_PATH_ROOT}/${row.id}`;
      return <LinkData data={row} path={path} />;
    }
  },
  {
    title: 'Mô tả',
    dataIndex: 'describe',
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
