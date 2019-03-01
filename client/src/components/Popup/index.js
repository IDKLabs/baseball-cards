/* eslint jsx-a11y/click-events-have-key-events: 0 jsx-a11y/no-static-element-interactions: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './popup.module.scss';
import Button from '../Button';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.state = {
      hidden: true,
    };
  }

  componentDidMount() {
    const { hidden, mountDelay } = this.props;
    if (!hidden) {
      setTimeout(() => {
        this.setState({ hidden: false });
      }, mountDelay);
    }
  }

  componentDidUpdate({ hidden: prevHidden }) {
    const { hidden } = this.props;
    if (prevHidden !== hidden) {
      // eslint-disable-next-line
      this.setState({ hidden });
    }
  }

  onClose(e) {
    if (e && e.preventDefault) e.preventDefault();
    const {
      closeable, close, preClose,
    } = this.props;
    if (!closeable) return;
    this.setState({ hidden: true });
    if (!close) return;
    if (preClose) {
      preClose();
    }
    setTimeout(() => {
      close();
    }, 300);
  }

  onConfirm = async () => {
    const { onConfirm } = this.props;
    if (onConfirm) {
      await onConfirm();
    }
    this.onClose();
  }

  render() {
    const {
      style,
      children,
      modal,
      className,
      size,
      closeable,
      title,
      confirmText,
      onConfirm,
      onCancel,
      closeText,
      confirmClassName,
      disabled,
      contentStyle,
    } = this.props;
    const { hidden } = this.state;

    return (
      <span className={cx({ [styles.hidden]: hidden })}>

        { modal && <div className={cx(styles.modal)} onClick={this.onClose} /> }

        <div className={cx(styles.popup, styles[size], className)} style={style}>
          { closeable && (
            <button
              type="button"
              className={cx(styles.closeX)}
              onClick={this.onClose}
              onKeyDown={this.onClose}
              tabIndex={0}
            >𐄂
            </button>
          )}

          { title && (
            <div className={cx(styles.popupTitle)}>
              <h3>{ title }</h3>
            </div>
          )}

          <div
            style={contentStyle}
            className={cx(styles.popupContent, {
              [styles.hasTitle]: title,
              [styles.hasActions]: onConfirm,
            })}
          >
            { React.cloneElement(children, {
              close: this.onClose,
            })}
          </div>

          { onConfirm && (
            <div className={cx(styles.popupActions)}>
              <Button
                white
                className={cx('test-close-popup')}
                onClick={onCancel || this.onClose}
              >{closeText}
              </Button>
              <Button
                action
                type="submit"
                className={cx(confirmClassName)}
                onClick={this.onConfirm}
                {...disabled !== undefined ? { disabled } : {}}
              >{confirmText}
              </Button>
            </div>
          )}
        </div>
      </span>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  /* if no close function is passed in, the popup can only be shown and hidden once. */
  close: PropTypes.func,
  preClose: PropTypes.func,
  closeable: PropTypes.bool,
  /* popup visibility can be toggled using the 'hidden' prop or simply by mounting/unmounting the component. */
  hidden: PropTypes.bool,
  modal: PropTypes.bool,
  /* milliseconds to delay the popup visibility. useful for graceful entry after a page loads. */
  mountDelay: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'l', 'xl', 'max', 'fullScreen']),
  style: PropTypes.shape({}),
  contentStyle: PropTypes.shape({}),
  title: PropTypes.string,

  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  confirmClassName: PropTypes.string,
  /* will only get called on button click, not if modal is closed */
  onCancel: PropTypes.func,
  closeText: PropTypes.string,
  disabled: PropTypes.bool,
};

Popup.defaultProps = {
  className: '',
  close: null,
  closeable: true,
  hidden: false,
  modal: true,
  mountDelay: 0,
  size: 'md',
  style: {},
  contentStyle: {},
  title: null,

  onConfirm: null,
  onCancel: null,
  confirmText: 'Confirm',
  confirmClassName: '',
  closeText: 'Close',
  preClose: null,
  disabled: undefined,
};

export default Popup;
