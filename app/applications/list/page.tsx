import { Box, Flex, Spacer } from "@chakra-ui/react";
import prisma from "@/prisma/client";
import React from "react";
import AddApplication from "./AddApplication";
import { Status } from "@prisma/client";
import ApplicationTable, { columnName, searchParamsProps } from "./ApplicationTable";

interface Props {
  searchParams: searchParamsProps;
}

const Applications = async ( {searchParams} : Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const where = { status };

  const orderBy = columnName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  // fetch all applications from backend
  const applications = await prisma.application.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const applicationCount = await prisma.application.count({ where });

  return (
    <Flex direction="column" gap="3">
      <Flex>
        <Box>
        <AddApplication />
        </Box>
      </Flex>
      <Spacer />
      <ApplicationTable applications={applications}  searchParams={searchParams}/>
    </Flex>
  );
};

export const metadata = {
  title: "Applications | Application List",
  description: "All Applications Page",
};

export default Applications;
