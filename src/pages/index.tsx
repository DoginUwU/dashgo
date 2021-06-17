import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type SigInFormData = {
  email: string;
  password: string;
};
const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigInFormData>({
    resolver: yupResolver(signInSchema, { abortEarly: false }),
  });

  const handleSigIn: SubmitHandler<SigInFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSigIn)}
      >
        <Stack spacing={4}>
          <Input
            label="Email:"
            name="email"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <Input
            label="Password:"
            name="password"
            type="password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt={6}
          colorScheme="blue"
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
}
