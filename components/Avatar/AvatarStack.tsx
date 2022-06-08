import { Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import React from "react";

interface Avatar {
  name: string;
  image: string;
}

interface Props {
  avatars: Avatar[];
}
export default function AvatarStack({ avatars }: Props) {
  return (
    <Wrap spacing={-3}>
      {avatars.map((avatar) => (
        <WrapItem>
          <Avatar src={avatar.image} style={{ height: 40, width: 40 }} />
        </WrapItem>
      ))}
    </Wrap>
  );
}
