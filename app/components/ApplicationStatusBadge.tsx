"use client";
import { useState } from "react";
import { Badge, Box, Button, Link } from "@chakra-ui/react";
import { Application } from "@prisma/client";
import { statusOptions } from "../src/utils/Reusables";

interface Props {
  application: Application;
  isEdit?: boolean;
}

const ApplicationStatusBadge = ({ application, isEdit }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Box justifyContent="center">
      <Badge colorScheme={statusOptions[application.status].color}>
        {statusOptions[application.status].label}
      </Badge>
      {isEdit ? (
        <Button size="xs" ml={3} onClick={()=>{setIsClicked(!isClicked)}} isLoading={isClicked}>
          <Link href={`/applications/${application.application_id}/edit`}>
            Edit
          </Link>
        </Button>
      ) : null}
    </Box>
  );
};

export default ApplicationStatusBadge;
