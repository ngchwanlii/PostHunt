import React from 'react';
import { message, Popconfirm } from 'antd';

export default class PopDelete extends React.Component {
  render() {
    const {
      title,
      id,
      dataType,
      onDelete,
      uiComponent: UIComponent,
    } = this.props;

    const confirm = e => {
      message.success(`Deleted ${dataType}`, 0.5);
      onDelete(id, dataType);
    };
    const cancel = e => {};

    return (
      <Popconfirm
        title={title}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        {UIComponent}
      </Popconfirm>
    );
  }
}
