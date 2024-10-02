import { FlatList } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import CategoryItems from "./CategoryItems";
import { Newspaper, ShieldCheck, TrendingUp, User } from "lucide-react-native";

const GroupCategory = ({onSubmit}) => {
  const ref = useRef(null);
  const [entries, setEntries] = useState([
    {
      id: 0,
      text: "Dành cho bạn",
      icon: Newspaper,
    },
    {
      text: "Quản lý",
      icon: ShieldCheck,
      id: 1,
    },
    {
      text: "Nhóm của bạn",
      icon: User,
      id: 2,
    },
    {
      text: "Khám phá",
      icon: TrendingUp,
      id: 3,
    },
  ]);
  const [activeId, setActiveId] = useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <CategoryItems
        key={index}
        activeId={activeId}
        setActiveId={() => {
          onSubmit(item.id);
          setActiveId(item.id);
        }}
        item={item}
      />
    );
  };
  useEffect(() => {
    ref.current.scrollToIndex({ index: activeId, animated: true, viewPoistion: 0.5});
  },[activeId])
  return (
    <FlatList
      ref={ref}
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

export default GroupCategory;
