import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr={4} textAlign="right">
          <Text>Luiz Eduardo</Text>
          <Text color="gray.300" fontSize="small">
            doginuwu@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Luiz Eduardo"
        src="https://avatars.githubusercontent.com/u/59850361?v=4"
      />
    </Flex>
  );
}
