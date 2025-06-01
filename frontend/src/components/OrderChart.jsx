import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import styles from '../styles/componentStyles/OrderChart.module.css';

const OrderChart = ({ data, title = 'Orders Chart' }) => {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" barSize={30} fill="grey" />
          <Line type="monotone" dataKey="revenue" stroke="black" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderChart;
