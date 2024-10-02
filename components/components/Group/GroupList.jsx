import { useGlobalState } from "@/context/globalContext";
import { FlatList, Image, Text, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const GroupItem = ({ item }) => {
  const router = useRouter();
  const { setGroupId } = useGlobalState();
  return (
    <TouchableOpacity
      onPress={() => {
        setGroupId(item?.id);
        router.push("/Group");
      }}
    >
      <View style={styles.item}>
        <LinearGradient
          // Các màu cho gradient
          colors={["transparent","rgba(0, 0, 0, 0.5)", ]}
          // Vị trí gradient
          style={styles.overlay}
        />
        <Image source={item?.avatar} style={styles.image} alt="groupimage" />
        <Text
          numberOfLines={2}
          color="#fff"
          fontSize="$xs"
          fontWeight="$bold"
          ellipsizeMode="tail"
          style={styles.text}
        >
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const GroupList = ({ groupList }) => {
  const [entries, setEntries] = useState(groupList);
  useEffect(() => {
    setEntries(groupList);
  }, [groupList]);
  const renderItem = ({ item, index }) => {
    return <GroupItem key={index} item={item} />;
  };
  return (
    <FlatList
      data={entries}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
      contentContainerStyle={{
        marginTop: 10,
      }}
    />
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  text: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderRadius: 10,
  },
});

export default GroupList;
