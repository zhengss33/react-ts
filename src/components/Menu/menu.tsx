import React, { FC, CSSProperties, createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallBack = (selectIndex: string) => void;
export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  className?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode;
  style?: CSSProperties;
  onSelect?: SelectCallBack;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  activeIndex: string;
  onSelect?: SelectCallBack;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({activeIndex: '0'});

export const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    children,
    style,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus
  } = props;

  const [ activeIndex, setActive ] = useState(defaultIndex);

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  }

  const passedContext: IMenuContext = {
    activeIndex: activeIndex || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        });
      } else {
        console.log('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return(
    <ul
      className={classes}
      style={style}
      data-testid="test-menu">
        <MenuContext.Provider value={passedContext}>
          {renderChildren()}
        </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu;