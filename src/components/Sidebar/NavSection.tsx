import ReactRouterLink from "next/link";
import { Box, Stack, Text } from "@chakra-ui/react";
import { SidebarItems } from "../../@types/SidebarItems";
import { NavItem } from "./NavItem";

interface NavSectionProps {
  items: Array<SidebarItems>;
}

export function NavSection({ items }: NavSectionProps) {
  return (
    <>
      {items.map((nav, index) => (
        <Box key={index}>
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            {nav.name}
          </Text>
          <Stack spacing={4} mt={8} align="stretch">
            {nav.items.map((item, index) => (
              <NavItem item={item} key={index} />
            ))}
          </Stack>
        </Box>
      ))}
    </>
  );
}
