import MyCourseItem from "@/components/components/MyCourseItem";
import { useGlobalState } from "@/context/globalContext";
import {
    Box,
    ScrollView,
    Text,
    View
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
const index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { myCourseList } = useGlobalState();
  return (
    <View style={{ backgroundColor: "#2E8B57" }}>
      <ScrollView
        style={{
          marginTop: 45,
          backgroundColor: "#f7f7f7",
          height: "100%",
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
                {/* <Text
                    style={{
                      fontStyle: "italic",
                      fontSize: 14,
                    }}
                    color="#fff"
                  >
                    Let's start learning!
                  </Text> */}
              </Box>
            </Box>
            {/* <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  style={{
                    marginTop: 10,
                    borderRadius: 20,
                    backgroundColor: "#fff",
                    width: "85%",
                    paddingHorizontal: 20,
                  }}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Icon as={Search} size="xl" />
                  <Input
                    variant="outline"
                    size="md"
                    style={{
                      width: "90%",
                      borderRadius: 20,
                      marginLeft: 5,
                      borderWidth: 0,
                    }}
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      // id="username"
                      // value={formData.username}
                      // onChangeText={(e) => {
                      //   handleChange("username", e);
                      // }}
                      placeholder="Search for anything ..."
                    />
                  </Input>
                </Box>
              </Box> */}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f7f7f7",
            paddingTop: 30,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 40,
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
          <View rowGap={15} style={{ marginTop: 30 }}>
            {myCourseList.map((item: any, index: any) => (
              <MyCourseItem
                data={item}
                avatar={item?.course?.image?.url}
                title={item?.course?.name}
                totalLearn={item?.course?.total_learned}
                totalLessons={item?.course?.total_lessions}
                author={item?.course?.author?.name}
                key={index}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
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
export default index;
