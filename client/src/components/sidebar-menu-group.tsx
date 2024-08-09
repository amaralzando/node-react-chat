import { useSideBarToggle } from "@/src/hooks/use-sidebar-toggle";
import { SideNavItemGroup } from "@/src/type";
import classNames from "classnames";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { SideBarMenuItem } from "./sidebar-menu-item";

const SideBarMenuGroup = ({ menuGroup }: { menuGroup: SideNavItemGroup }) => {
  const { user } = useContext(AuthContext);
  const { toggleCollapse } = useSideBarToggle();

  const menuGroupTitleStyle = classNames(
    "py-4 tracking-[.1rem] font-medium uppercase text-sm text-sidebar-foreground",
    {
      "text-center": toggleCollapse,
    }
  );

  // Determine if the menu group should be shown based on user roles
  const showMenuGroup = () => {
    if (!menuGroup.show) return false; // If explicitly hidden, don't show

    if (!menuGroup.roles || menuGroup.roles.length === 0) return true; // Show if no roles are defined

    return user && menuGroup.roles.includes(user.role);
  };

  return (
    <>
      {showMenuGroup() && (
        <>
          <h3 className={menuGroupTitleStyle}>
            {!toggleCollapse ? menuGroup.title : "..."}
          </h3>
          {menuGroup.menuList?.map((item, index) => (
            <SideBarMenuItem key={index} item={item} />
          ))}
        </>
      )}
    </>
  );
};

export default SideBarMenuGroup;
