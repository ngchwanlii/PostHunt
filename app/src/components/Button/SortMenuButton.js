import React from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';

export class SortMenuButton extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  handleMenuClick = (dataType, sortKey) => elem => {
    let sortType = elem.key;
    this.props.onSort(dataType, sortType, sortKey);
  };

  render() {
    const {
      dataType,
      menus,
      sortKey,
      title,
      buttonType,
      iconType,
      className,
    } = this.props;

    const menuList = (
      <Menu onClick={this.handleMenuClick(dataType, sortKey)}>
        {menus.map(m => <Menu.Item key={m}>{m}</Menu.Item>)}
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menuList}>
          <Button type={buttonType} className={className}>
            <Icon type={iconType} />
            {title}
          </Button>
        </Dropdown>
      </div>
    );
  }
}
