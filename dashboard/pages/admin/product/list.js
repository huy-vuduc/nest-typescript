import React, { useEffect, useState } from 'react';
import Admin from 'layouts/Admin.js';
import { PRODUCT_TABLE_COLUMN } from 'components/Product/Column.js';
import { Button, Table, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PRODUCT_RESOURCE } from '../../../resource/product.resource';
import Link from 'next/link';
import withAuth from '../../../hooks/withAuth';
import { getProductList } from '../../../services/product.service';

function List() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getProductList();
      setData(data);
    })();
  }, []);
  return (
    <Card
      title={PRODUCT_RESOURCE.TITLE_LIST_PRODUCT}
      extra={
        <Link href={`${PRODUCT_RESOURCE.PRODUCT_ADMIN_PATH_ROOT}${PRODUCT_RESOURCE.CREAT_PATH}`}>
          <Button type="primary" shape="round" icon={<PlusOutlined />} size="small" />
        </Link>
      }>
      <Table
        style={{ paddingTop: 30 }}
        columns={PRODUCT_TABLE_COLUMN}
        dataSource={data}
        rowKey="id"
        bordered="enable"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}

List.layout = Admin;

export default withAuth(List);
