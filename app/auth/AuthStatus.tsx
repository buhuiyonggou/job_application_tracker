"use client";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Skeleton,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Link from "../components/Link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../lib/userSlice';
import { RootState } from '../../lib/store';

export const AuthStatus = () => {
  const { status, data: session } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const toast = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      axios.get("/api/users/me")
        .then((response) => {
          dispatch(setUser(response.data));
          console.log("User fetched successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error fetching user data",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [status, dispatch, toast]);

  return (
    <Box>
      <Menu>
        <MenuButton as={Box} display="flex" alignItems="center">
          <Avatar
            src={user?.image}
            name={user?.name || "User"}
            size="sm"
          />
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link href={`/profile/${session?.user?.id}`}>
              <Text size="sm">{session?.user?.email}</Text>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/api/auth/signout">Log out</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
