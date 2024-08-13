import { SideNavItemGroup } from "@/src/type";
import {
  BsEnvelope,
  BsGear,
  BsHouseDoor,
  BsKanban,
  BsListUl,
  BsQuestionCircle,
} from "react-icons/bs";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    show: true,
    title: "View",
    menuList: [
      {
        show: true,
        title: "Chat",
        path: "/chat",
        protected: true,
        icon: <BsHouseDoor size={20} />,
      },
    ],
  },
  {
    show: true,
    title: "Others",
    menuList: [
      {
        show: true,
        title: "Settings",
        path: "/settings",
        protected: true,
        icon: <BsGear size={20} />,
      },
      {
        show: true,
        title: "Help",
        path: "/help",
        protected: true,
        icon: <BsQuestionCircle size={20} />,
      },
    ],
  },
];
