import { Box, Icon, Image, Text } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Clock1, PlayCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const LessonItem = ({ data }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/lessonDetails/");
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        marginHorizontal={10}
        marginVertical={5}
        paddingEnd={50}
        style={styles.lessonContainer}
      >
        <Box style={styles.container}>
          <Image
            source={{
              uri: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg",
            }}
            alt="lessonImg"
            style={styles.imgLesson}
          />
          <Icon style={styles.iconLesson} as={PlayCircle} size="xl" />
        </Box>
        <Box paddingLeft={5}>
          <Text
            style={{ fontWeight: "bold" }}
            // fontFamily="Poppins_700Bold"
          >
            {data?.name}
          </Text>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Icon as={Clock1} size="xs" />
            <Text
              // fontFamily="Poppins_400Regular"
              style={{ fontSize: 12, marginLeft: 2 }}
            >
              {data?.time} phút
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  lessonContainer: {
    backgroundColor: "#e0e8ec",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  container: {
    position: "relative",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgLesson: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 15,
  },
});
export default LessonItem;
