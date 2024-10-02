import MyCourseItem from '@/components/components/MyCourseItem';
import {
  Box,
  Icon,
  Input,
  InputField,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
const tab2 = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View
    style={{backgroundColor: '#69b4ff'}}
  >
      <ScrollView
        style={{
          marginTop: 60,
        }}
      >
        <View style={{ backgroundColor: "#f7f7f7" }}>
          <View
            style={{
              backgroundColor: '#69b4ff',
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
                  // fontFamily="Poppins_700Bold"
                  color="#fff"
                  style={{
                    fontWeight: "bold",
                    fontSize: 24,
                    lineHeight: 35 * 0.75,
                    paddingTop: 35 - 35 * 0.75,
                  }}
                >
                  Khoá học của tôi
                </Text>
                {/* <Text
                  // fontFamily="Poppins_400Regular_Italic"
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
            <Box
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
            </Box>
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
              <Text
                style={activeTab == 0 ? styles.tabActive : null}
                // fontFamily="Poppins_400Regular"
              >
                OnGoing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveTab(1);
              }}
              style={[styles.tab, activeTab == 1 ? styles.tabActive : null]}
            >
              <Text
                style={activeTab == 1 ? styles.tabActive : null}
                // fontFamily="Poppins_400Regular"
              >
                Complete
              </Text>
            </TouchableOpacity>
          </View>
          <View rowGap={15} style={{marginTop: 30}}>
            <MyCourseItem />
            <MyCourseItem />
            <MyCourseItem />
            <MyCourseItem />

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
    backgroundColor: "#56b7ea",
    color: "#fff",
  },
});
export default tab2;
