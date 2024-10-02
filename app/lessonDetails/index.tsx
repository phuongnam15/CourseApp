import { Box, Icon, Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { ChevronLeftCircle } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import VideoPlayer from "@/components/components/VideoPlayer";
import LessonItem from "@/components/components/LessonItem";
import ReviewItem from "@/components/components/ReviewItem";
const index = () => {
  const router = useRouter();
  const [activeState, setActiveState] = useState(0);
  return (
    <ScrollView
      style={{
        height: "100%",
        position: "relative",
        backgroundColor: "#e7f1f5",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 45,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 15,
          backgroundColor: "#e7f1f5",
          marginTop: 60,
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 15,
            top: 7.5,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <Icon as={ChevronLeftCircle} size="xl" />
        </TouchableOpacity>
      </View>
      <View>
        <VideoPlayer />
      </View>
      <View
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal={20}
        marginVertical={20}
        marginBottom={10}
        flexDirection="row"
      >
        <Text
          // fontFamily="Poppins_600SemiBold"
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: "#000",
            lineHeight: 35 * 0.75,
            paddingTop: 35 - 35 * 0.75,
          }}
        >
          Bài 1: Lùa Gà
        </Text>
        <Text
          // fontFamily="Poppins_600SemiBold"
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: "#000",
            lineHeight: 35 * 0.75,
            paddingTop: 35 - 35 * 0.75,
          }}
        >
          10 Phút
        </Text>
      </View>
      <View
        display="flex"
        alignItems="center"
        paddingHorizontal={20}
        flexDirection="row"
      >
        <Image
          size="md"
          alt="avatar"
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
          }}
          source={require("../../assets/images/avatar.jpg")}
        />
        <Text
          // fontFamily="Poppins_400Regular"
          marginLeft={5}
          style={{ color: "#000" }}
        >
          Phan Lâm
        </Text>
      </View>
      <Text
        // fontFamily="Poppins_600SemiBold"
        paddingHorizontal={20}
        style={{
          marginTop: 10,
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#000",
        }}
      >
        Mô tả
      </Text>
      <Text
        // fontFamily="Poppins_400Regular"
        paddingHorizontal={20}
        style={{
          fontSize: 12,
          color: "#000",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        fermentum pharetra sem et placerat. Nam rutrum at magna non pharetra.
        Aliquam erat volutpat. Nulla eget lobortis purus, blandit malesuada
        augue. Duis mauris nisl, maximus in lacus id, condimentum ...{" "}
        <Text
          // fontFamily="Poppins_400Regular_Italic"
          style={{ color: "#38B6FF", fontSize: 12, fontStyle: "italic" }}
        >
          Xem Thêm
        </Text>
      </Text>
      <Box
        marginTop={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        paddingHorizontal={20}
      >
        <TouchableOpacity
          onPress={() => {
            setActiveState(0);
          }}
        >
          <Text
            // fontFamily="Poppins_400Regular"
            style={[
              styles.navTitle,
              activeState === 0 ? styles.navActive : null,
            ]}
          >
            Bài Giảng
          </Text>
          <Box style={activeState === 0 ? styles.lineActive : null}></Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveState(1);
          }}
        >
          <Text
            // fontFamily="Poppins_400Regular"
            style={[
              styles.navTitle,
              activeState === 1 ? styles.navActive : null,
            ]}
          >
            Đánh giá
          </Text>
          <Box style={activeState === 1 ? styles.lineActive : null}></Box>
        </TouchableOpacity>
      </Box>
      {(activeState == 0 && (
        <Box paddingHorizontal={10} marginTop={10}>
          <LessonItem />
          <LessonItem />
          <LessonItem />
          <LessonItem />
          <LessonItem />
        </Box>
      )) ||
        (activeState == 1 && (
          <Box paddingHorizontal={20} marginTop={10} marginBottom={20}>
            <Text 
            // fontFamily="Poppins_400Regular"
             style={{ marginBottom: 10 }}>
              Tất cả đánh giá:
            </Text>
            <Box paddingHorizontal={20}>
              <ReviewItem />
              <ReviewItem />
              <ReviewItem />
              <ReviewItem />
            </Box>
          </Box>
        ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  coverImg: {
    width: "100%",
    height: 250,
    objectFit: "cover",
  },
  navTitle: {
    color: "#333",
    borderRadius: 20,
    paddingBottom: 8,
    marginRight: 20,
  },
  navActive: {
    fontWeight: "bold",
    // fontFamily: "Poppins_600SemiBold",
  },
  lineActive: {
    fontWeight: "bold",
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    width: "40%",
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 35 * 0.75,
  },
});
export default index;
