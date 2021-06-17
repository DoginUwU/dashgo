import { IconType } from "react-icons/lib";

export interface SidebarItems {
  name: string;
  items: Array<Item>;
}

export interface Item {
  name: string;
  icon: IconType;
  selected?: boolean;
  href: string;
}
