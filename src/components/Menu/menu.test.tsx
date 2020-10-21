import React from 'react';
import { render, RenderResult, fireEvent, cleanup, await } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
import { watchFile } from 'fs';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem >default</MenuItem>
      <SubMenu title="drop">
        <MenuItem>item1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const style: string = `
  .submenu {
    display: none;
  }
  .submenu.menu-opened {
    display: block;
  }`
  const cssFile = document.createElement('style');
  cssFile.type = 'text/css';
  cssFile.innerHTML = style;
  return cssFile;
}

let wrapper: RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disableElement:HTMLElement

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disableElement = wrapper.getByText('disabled')
  })
  it('should render correct menu and menuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('test menu');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disableElement).toHaveClass('menu-item is-disabled');
  })
  it('click items should change active annd call the right callback', () => {
    const defaultItem = wrapper.getByText('default');
    fireEvent.click(defaultItem);
    expect(defaultItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  })
  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('item1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('drop');
    fireEvent.mouseEnter(dropdownElement);
    await (() => {
      expect(wrapper.queryByText('item1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('item1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    expect(wrapper.queryByText('item1')).not.toBeVisible();
  })
})