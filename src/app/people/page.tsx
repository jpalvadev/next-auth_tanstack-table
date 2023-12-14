import React from 'react';
import PeopleDataTable from './data-table';
import { columns } from './columns';
import { people } from '@/lib/people';

type Props = {};

const PeoplePage = (props: Props) => {
  return <PeopleDataTable columns={columns} data={people} />;
};

export default PeoplePage;
