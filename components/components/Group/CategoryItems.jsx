import { Icon, Text, View } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const CategoryItems = ({ item, activeId, setActiveId }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setActiveId(item.id);
      }}
    >
      <View
        style={[
          styles.edit_item,
          activeId === item.id ? styles.edit_item_active : null,
        ]}
      >
        {item?.icon && (
          <Icon
            as={item.icon}
            color={activeId === item.id ? "#2E8B57" : "#000"}
          />
        )}
        <Text
          numberOfLines={1}
          fontSize="$sm"
          fontWeight="$bold"
          ellipsizeMode="tail"
          style={activeId === item.id ? styles.text_active : null}
        >
          {item?.text}
        </Text>
        <Text
          numberOfLines={1}
          fontSize="$sm"
          fontWeight="$bold"
          ellipsizeMode="tail"
          style={activeId === item.id ? styles.text_active : null}
        >
          {item?.count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  edit_item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    gap: 5,
    borderRadius: 20,
    backgroundColor: "#e4e4e9",
    marginRight: 5,
  },
  edit_item_active: {
    backgroundColor: "#bbf7d0",
  },
  text_active: {
    color: "#2E8B57",
  },
});

export default CategoryItems;
