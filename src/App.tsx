import React from 'react';
import logo from './logo.svg';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import AlertBox , { alertType } from './components/AlertBox/alertBox';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import './styles/index.scss';

library.add(fas)

function App() {
  return (
    <div className="App">
      <Icon icon={fas.faCoffee} theme="dark" size="10x"/>
      <Menu
        defaultIndex="0"
        onSelect={(index: string) => console.log(index)}
        mode="vertical"
        defaultOpenSubMenus={['2']}>
        <MenuItem>0</MenuItem>
        <MenuItem disabled>1</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu 1</MenuItem>
          <MenuItem>submenu 2</MenuItem>
          <MenuItem>submenu 3</MenuItem>
        </SubMenu>
        <MenuItem>2</MenuItem>
      </Menu>
      <Button disabled> Hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>world</Button>
      <Button disabled btnType={ButtonType.Link} href="http://www.baidu.com">baidu</Button>
      <AlertBox
        title="alert title"
        closeEnable={true}
        alertType={alertType.WARNING}
      ></AlertBox>
    </div>
  );
}

export default App;
