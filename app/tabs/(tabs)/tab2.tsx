import MyCourseItem from "@/components/components/MyCourseItem";
import { useGlobalState } from "@/context/globalContext";
import { Box, FlatList, ScrollView, Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const tab2 = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { myCourseList } = useGlobalState();
  const insets = useSafeAreaInsets();
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View mb={15}>
        <MyCourseItem
          data={item}
          avatar={item?.course?.image?.url}
          title={item?.course?.name}
          totalLearn={item?.course?.total_learned}
          totalLessons={item?.course?.total_lessions}
          author={item?.course?.author?.name}
          key={index}
        />
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#2E8B57",
        flex: 1,
        display: "flex",
        paddingBottom: -insets.bottom,
      }}
    >
      <View style={{ backgroundColor: "#f7f7f7" }}>
        <View
          style={{
            backgroundColor: "#2E8B57",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingBottom: 20,
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            <Box display="flex" flexDirection="column">
              <Text
                color="#fff"
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  lineHeight: 35 * 0.75,
                  paddingTop: 35 - 35 * 0.75,
                }}
              >
                Khoá học của tôi
              </Text>
            </Box>
          </Box>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#f7f7f7",
          paddingTop: 30,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 40,
          flex: 1,
        }}
      >
        <View
          display="flex"
          flexDirection="row"
          alignItems="stretch"
          style={{ width: "100%", backgroundColor: "#fff", borderRadius: 30 }}
        >
          <TouchableOpacity
            onPress={() => {
              setActiveTab(0);
            }}
            style={[styles.tab, activeTab == 0 ? styles.tabActive : null]}
          >
            <Text style={activeTab == 0 ? styles.tabActive : null}>
              OnGoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveTab(1);
            }}
            style={[styles.tab, activeTab == 1 ? styles.tabActive : null]}
          >
            <Text style={activeTab == 1 ? styles.tabActive : null}>
              Complete
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={myCourseList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // horizontal
          // showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{
            marginTop: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tab: {
    width: "50%",
    backgroundColor: "transparent",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabActive: {
    backgroundColor: "#61bc84",
    color: "#fff",
  },
});
export default tab2;
