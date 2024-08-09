export type SideNavItem = {
  show: boolean;
  title: string;
  path: string;
  icon?: JSX.Element;
  protected?: boolean;
  roles?: string[];
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  show: boolean;
  title: string;
  roles?: string[];
  menuList: SideNavItem[];
};
