import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './block.module.scss';

export default ({ children, className, style = {} }) => (
  <div
    className={cx(styles.block, 'bg-white', 'text-center', 'p-4', className)}
    style={{ maxWidth: '720px', margin: '0 auto', ...style }}
  >
    {children}
  </div>
);
