import React from 'react';
import { ResponsiveContainer } from 'recharts';
import Title from '../layouts/Title';

export default function Slides() {

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
      <h3>Slide images</h3>
      </ResponsiveContainer>
    </React.Fragment>
  );
}