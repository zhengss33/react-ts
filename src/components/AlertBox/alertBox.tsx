import React, { FC, useState } from 'react';
import classNames from 'classnames';

export enum alertType {
  SUCCESS = 'success',
  DEFAULT = 'default',
  DANGER = 'danger',
  WARNING = 'warning',
}

interface BaseAlertProps {
  className?: string;
  title: string;
  content?: string;
  closeEnable: boolean;
  alertType?: alertType;
}

const AlertBox: FC<BaseAlertProps> = (props) => {
  const {
    className,
    title,
    content,
    closeEnable,
    alertType
  } = props;

  const [isShow, toggleShow] = useState(true)

  const classes = classNames('alert-wrap', className, {
    [`alert-${alertType}`]: alertType,
    'alert-visible': isShow
  });

  return (
    <div className={classes}>
      <div>
        <h2 className="title">{title}</h2>
        {closeEnable && <span className="close-btn" onClick={ () => { toggleShow(false)}}>close</span>}
      </div>
      <div className="content">{content}</div>
    </div>
  )
}

AlertBox.defaultProps = {
  alertType: alertType.DEFAULT
}

export default AlertBox;