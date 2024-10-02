import { Image, Text, View } from "@gluestack-ui/themed";
import React from "react";

const GroupItem = ({ data }) => {


  return (
    <View display="flex" flexDirection="row" alignItems="center" gap={10}>
      <Image
        source={{ uri: data?.avatar }}
        style={{ width: 40, height: 40, borderRadius: 10 }}
        alt="groupAvatar"
      />
      <View>
        <Text fontWeight="$bold" fontSize="$sm">
          {data?.name}
        </Text>
        <Text fontSize="$xs">5 thông báo mới</Text>
      </View>
    </View>
  );
};

export default GroupItem;
