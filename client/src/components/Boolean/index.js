import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './boolean.module.scss';

class FancyBoolean extends Component {
  constructor(props) {
    super(props);
    this.renderToggle = this.renderToggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isRadio = props.type === 'radio';
  }

  onChange(e) {
    const {
      passRawEvent, onChange, id, name,
    } = this.props;
    if (passRawEvent) {
      return onChange(e);
    }
    const { checked } = e.target;
    const value = this.isRadio ? id : checked;
    return onChange({ [name]: value });
  }

  renderToggle() {
    const { toggle } = this.props;
    if (!toggle) return null;
    return (
      <div className={cx(styles.toggleWrap)}>
        <div className={cx(styles.toggleBackground)} />
        <div className={cx(styles.toggler)} />
      </div>
    );
  }

  render() {
    const {
      className,
      disabled,
      error,
      style,
      styleName,
      type,
      saving,
      readOnly,
      labelStyle,
      name,
      value,
      autocomplete,
      toggle,
      id,
      label,
      small,
    } = this.props;

    return (
      <label
        className={cx(
          styles.fancyBool,
          className,
          styles[styleName], {
            [styles.error]: error,
            [styles.disabled]: disabled,
            [styles.readonly]: readOnly,
            [styles[type]]: !toggle,
            [styles.toggle]: toggle,
            [styles.small]: small,
          },
        )}
        style={style}
        htmlFor={this.isRadio ? id : name}
      >

        <input
          type={type}
          checked={value}
          onChange={this.onChange}
          name={name}
          autoComplete={autocomplete}
          {...disabled ? { disabled } : {}}
          {...readOnly ? { readOnly } : {}}
          {...this.isRadio ? {
            id,
            value: id,
          } : {}}
        />

        {this.renderToggle()}

        <span
          className={cx(styles.label, {
            'text-flash': saving,
          })}
          style={labelStyle}
        >
          {label}
        </span>

      </label>
    );
  }
}


FancyBoolean.propTypes = {
  autocomplete: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'radio']),
  attrs: PropTypes.shape({}),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  labelStyle: PropTypes.shape({}),
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  /** when true, onChange will pass the event instead of transforming it into a key-value pair. */
  passRawEvent: PropTypes.bool,
  style: PropTypes.shape({}),
  styleName: PropTypes.string,
  defaultValue: PropTypes.bool,
  value: PropTypes.bool,
  saving: PropTypes.bool,
  readOnly: PropTypes.bool,
  /** required when type="radio" * */
  id: PropTypes.string,
};

FancyBoolean.defaultProps = {
  autocomplete: 'off',
  type: 'checkbox',
  attrs: {},
  className: '',
  disabled: false,
  error: false,
  labelStyle: {},
  passRawEvent: false,
  style: {},
  styleName: null,
  defaultValue: undefined,
  value: undefined,
  saving: false,
  readOnly: undefined,
  id: undefined,
};

export default FancyBoolean;
export const Checkbox = props => <FancyBoolean type="checkbox" {...props} />;
export const Radio = props => <FancyBoolean type="radio" {...props} />;
export const Toggle = props => <FancyBoolean type="checkbox" toggle {...props} />;
export const RadioGroup = ({ options, value, ...props }) => (
  <span>
    {options.map(option => <Radio id={option} value={value === option} {...props} />)}
  </span>
);
