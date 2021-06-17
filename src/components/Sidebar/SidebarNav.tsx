import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGithubLine,
  RiInputMethodLine,
} from "react-icons/ri";
import { SidebarItems } from "../../@types/SidebarItems";
import { NavSection } from "./NavSection";

const SIDEBAR_ITEMS: Array<SidebarItems> = [
  {
    name: "GENERAL",
    items: [
      {
        name: "Dashboard",
        icon: RiDashboardLine,
        href: "/dashboard",
      },
      {
        name: "Users",
        icon: RiContactsLine,
        href: "/users",
      },
    ],
  },
  {
    name: "ADMINISTRATION",
    items: [
      {
        name: "Forms",
        icon: RiInputMethodLine,
        href: "/forms",
      },
      {
        name: "Automation",
        icon: RiGithubLine,
        href: "/automation",
      },
    ],
  },
];

export function SidebarNav() {
  return (
    <Stack spacing={12} align="flex-start">
      <NavSection items={SIDEBAR_ITEMS} />
    </Stack>
  );
}
