import { Header } from "../components/Header";
import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexCharts.ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-05-31T00:00:00.000Z",
      "2021-06-01T00:00:00.000Z",
      "2021-06-02T00:00:00.000Z",
      "2021-06-03T00:00:00.000Z",
      "2021-06-04T00:00:00.000Z",
      "2021-06-05T00:00:00.000Z",
      "2021-06-06T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: "series1",
    data: [31, 120, 10, 28, 54, 32, 64],
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
        <Sidebar />

        <SimpleGrid flex={1} gap={4} minChildWidth={320} align="flex-start">
          <Box p={[6, 8]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb={4} pb={4}>
              Subscribers of the week
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p={[6, 8]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb={4} pb={4}>
              Opening rate
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
