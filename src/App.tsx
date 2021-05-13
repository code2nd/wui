import React from 'react';
import Button, { ButtonType, ButtonSize } from 'components/Button/button';
import Menu from 'components/Menu/menu';
import MenuItem from 'components/Menu/menuItem';
import SubMenu from 'components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <Button>default button</Button>
      <Button disabled>desabled button</Button>
      <Button btnType={ButtonType.Primary}>primary button</Button>
      <Button btnType={ButtonType.Danger}>danger button</Button>
      <Button
        btnType={ButtonType.Link}
        href="http://www.baidu.com"
        target="_blank"
      >
        link button
      </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>
        disabled link button
      </Button>
      <Button size={ButtonSize.Large}>large button</Button>

      <Menu
        mode="vertical"
        defaultIndex={0}
        onSelect={(index) => {
          console.log(index);
        }}
      >
        <MenuItem>active</MenuItem>
        <MenuItem>menu-item1</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>xyz</MenuItem>
        <li>hello</li>
      </Menu>
    </div>
  );
}

export default App;
