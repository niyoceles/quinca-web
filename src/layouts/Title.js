import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../components/Ui/Typography';

export default function Title(props) {
  return (
    <Typography variant="h4" className="text-secondary mb-4">
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};