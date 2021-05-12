import React from 'react';
import Button, { ButtonType, ButtonSize } from 'components/Button/button';
import Menu from 'components/Menu/menu';
import MenuItem from 'components/Menu/menuItem';

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
        <MenuItem index={0}>active</MenuItem>
        <MenuItem index={1} disabled>
          disabled
        </MenuItem>
        <MenuItem index={2}>xyz</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
