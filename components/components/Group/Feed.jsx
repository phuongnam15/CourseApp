import { FlatList } from "@gluestack-ui/themed";
import React from "react";
import FeedsItem from "./FeedsItem";

const Feed = ({entries, onSubmit}) => {

  const renderItem = ({ item, index }) => {
    return <FeedsItem key={index} item={item} />;
  };
  return (
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        onEndReached={onSubmit}
        onEndReachedThreshold={0.2}
        contentContainerStyle={{
          marginTop: 0,
        }}
      />
     
  );
};

export default Feed;
