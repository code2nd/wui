import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  waitFor
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} data-testid="test-menu">
      <MenuItem index="0">active</MenuItem>
      <MenuItem index="1" disabled>
        disabled
      </MenuItem>
      <MenuItem index="2">xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .w-submenu: {
      display: none;
    }
    .w-submenu.menu-opened {
      display: block;
    }
  `;

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disablaedElement: HTMLElement;

describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disablaedElement = wrapper.getByText("disabled");
  });

  test("should render correct Menu and MenuItem based on default Props", () => {
    expect(menuElement).toBeInTheDocument;
    expect(/w-menu test/.test(menuElement.className)).toBe(true);
    // expect(menuElement.getElementsByTagName('li').length).toBe(3);
    expect(menuElement.querySelectorAll(":scope > li").length).toBe(4);
    expect(/w-menu-item is-active/.test(activeElement.className)).toBe(true);
    expect(/w-menu-item is-disabled/.test(disablaedElement.className)).toBe(
      true
    );
  });

  test("click items should change active and call this right callback", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(/is-active/.test(thirdItem.className)).toBe(true);
    expect(/is-active/.test(activeElement.className)).not.toBe(true);
    expect(testProps.onSelect).toHaveBeenLastCalledWith("2");
    fireEvent.click(disablaedElement);
    expect(/is-active/.test(disablaedElement.className)).not.toBe(true);
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
    expect(/is-active/.test(thirdItem.className)).toBe(true);
  });

  test("should render vertical mode when mode is set to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(/w-menu-vertical/.test(menuElement.className)).toBe(true);
  });

  test("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText("drop1")).not.toBeVisible;
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.getByText('drop1')).toBeVisible;
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible;
    });
  });
});
