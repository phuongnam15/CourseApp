import { Box, FlatList, Image, Text, View } from "@gluestack-ui/themed";
import { Skeleton } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const Item = ({ item, index }) => {
  return (
    <View style={styles.edit_item}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
        alt="category image"
        marginBottom={10}
      />
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          fontWeight: "bold",
        }}
      >
        {item?.text}
      </Text>
    </View>
  );
};
const CategoriesItem = ({ data }) => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    if (data) {
      const convertItem = data?.map((item) => {
        return {
          thumbnail: item.image.url,
          text: item.name,
        };
      });
      setEntries(convertItem);
      setIsloading(false);
    }
  }, [data]);
  const renderItem = ({ item, index }) => {
    return <Item key={index} index={index} item={item} />;
  };
  return (
    <Box style={styles.container}>
      {isLoading ? (
        <Box display="flex" flexDirection="row" columnGap={10}>
          <Skeleton width={200} height={50} />
          <Skeleton width={200} height={50} />
        </Box>
      ) : (
        <>
       
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
            style={{ marginLeft: 5 }}
          />
        </>
      )}
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  edit_item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 150,
  },
  item: {
    width: 100,
    height: 100,
    backgroundColor: "#e1ffff",
    borderRadius: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  extra_item: {
    width: 100,
    height: 100,
    backgroundColor: "#fef1c7",
    borderRadius: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    objectFit: "cover",
    width: "100%",
    height: 80,
    borderRadius: 10,
    marginHorizontal: "auto",
    // marginRight: 5,
    // marginTop: 20,
  },
});

export default CategoriesItem;
