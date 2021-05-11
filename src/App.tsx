import React from 'react';
import Button, { ButtonType, ButtonSize } from 'components/Button';

function App() {
  return (
    <div className="App">
      <Button>default button</Button>
      <Button disabled>desabled button</Button>
      <Button btnType={ButtonType.Primary}>primary button</Button>
      <Button btnType={ButtonType.Danger}>danger button</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">
        link button
      </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>
        disabled link button
      </Button>
      <Button size={ButtonSize.Large}>large button</Button>
    </div>
  );
}

export default App;
