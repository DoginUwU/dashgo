import { useState } from "react";
import NextLink from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
// components
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { getUserById, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      () => getUserById(userId),
      {
        staleTime: 1000 * 60 * 10, // 10m
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
        <Sidebar />

        <Box flex={1} borderRadius={8} bg="gray.800" p={8}>
          <Flex mb={8} justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml={4} />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Create new user
              </Button>
            </NextLink>
          </Flex>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={[4, 4, 6]} color="gray.300" w={8}>
                  <Checkbox colorScheme="blue" />
                </Th>
                <Th>User</Th>
                {isWideVersion && <Th>Created At</Th>}
                <Th w={8}></Th>
              </Tr>
            </Thead>
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>An error occurred while trying to fetch users</Text>
              </Flex>
            ) : (
              <Tbody>
                {data.users.map((user, index) => (
                  <Tr key={index}>
                    <Td px={[4, 4, 6]}>
                      <Checkbox colorScheme="blue" />
                    </Td>
                    <Td>
                      <Box>
                        <Link
                          color="blue.400"
                          onMouseEnter={() => handlePrefetchUser(user.id)}
                        >
                          <Text fontSize="bold">{user.name}</Text>
                        </Link>
                        <Text fontSize="small" color="gray.300">
                          {user.email}
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && (
                      <>
                        <Td>{user.createdAt}</Td>
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            Edit user
                          </Button>
                        </Td>
                      </>
                    )}
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>

          <Pagination
            totalCount={data?.totalCount || 0}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </Flex>
    </Box>
  );
}
