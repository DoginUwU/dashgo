import { Text, Link, Icon } from "@chakra-ui/react";
import { Item } from "../../@types/SidebarItems";
import { ActiveLink } from "../ActiveLink";

interface NavSectionProps {
  item: Item;
}

export function NavItem({ item }: NavSectionProps) {
  return (
    <ActiveLink href={item.href} passHref>
      <Link display="flex" align="center">
        <Icon as={item.icon} fontSize={20} />
        <Text ml={4} fontWeight="medium">
          {item.name}
        </Text>
      </Link>
    </ActiveLink>
  );
}
