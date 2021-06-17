import Link from "next/link";
import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
// components
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";
import { createUser } from "../../services/hooks/useUsers";
import { User } from "../../@types/User";
import { queryClient } from "../../services/queryClient";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
const createUserSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("Email is required."),
  password: yup.string().min(6, "Password must be contains 6 characters."),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Password mismatch."),
});

export default function CreateUser() {
  const router = useRouter();

  const newUser = useMutation((user: User) => createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema, { abortEarly: false }),
  });

  const createUserSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    await newUser.mutateAsync({ ...data });
    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(createUserSubmit)}
          flex={1}
          borderRadius={8}
          bg="gray.800"
          p={[6, 8]}
        >
          <Heading size="lg" fontWeight="normal">
            Create user
          </Heading>
          <Divider my={6} borderColor="gray.700" />
          <VStack spacing={8}>
            <SimpleGrid minChildWidth="240px" spacing={[6, 8]} w="100%">
              <Input
                name="name"
                label="Full name"
                error={errors.name}
                {...register("name")}
              />
              <Input
                type="email"
                name="email"
                label="Email"
                error={errors.email}
                {...register("email")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={[6, 8]} w="100%">
              <Input
                type="password"
                name="password"
                label="Password"
                error={errors.password}
                {...register("password")}
              />
              <Input
                type="password"
                name="password-confirmation"
                label="Repeat password"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={[6, 8]} justify="flex-end">
            <HStack spacing={4}>
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
