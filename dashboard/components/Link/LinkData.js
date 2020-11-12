import Link from 'next/link';
import React from 'react';

export const LinkData = ({ data, ...path }) => {
  return <Link href={`${path.path}`}>{data.name}</Link>;
};
