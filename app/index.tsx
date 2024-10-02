import {
  View
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");
export default function Home() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const entries = [
    {
      thumbnail:
        "https://glints.com/vn/blog/wp-content/uploads/2022/08/Google-Digital-Marketing-khoa%CC%81-ho%CC%A3c-free.jpeg",
    },
    {
      thumbnail:
        "https://glints.com/vn/blog/wp-content/uploads/2022/08/skillshare-introduction-to-marketing.jpg",
    },
    {
      thumbnail:
        "https://khoahocfree.com/wp-content/uploads/2024/04/Huong-dan-quy-trinh-nhap-hang-chi-tiet-1.jpg",
    },
    // Thêm các mục khác nếu cần
  ];
  const renderItem = (
    { item, index }: { item: any; index: number },
    parallaxProps?: any
  ) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };
  const pagination = () => {
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 15 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 4,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        dotColor="#794A86"
        inactiveDotColor="rgba(0, 0, 0, 0.92)"
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };
  // useEffect(() => {
  //   router.push('/tabs/(tabs)/')
  // },[])
  return (
    <View style={{ backgroundColor: "#2E8B57" }}>
      {/* <ScrollView
        style={{
          marginTop: 45,
          backgroundColor: "#f7f7f7",
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
                  style={{ fontWeight: "bold", fontSize: 18 }}
                >
                  Good Morning, Đatprs
                </Text>
                <Text
                  style={{
                    fontStyle: "italic",
                    fontSize: 14,
                  }}
                  color="#fff"
                >
                  Let's start learning!
                </Text>
              </Box>

              <Box>
                <Image
                  size="md"
                  alt="avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                  }}
                  source={require("../assets/images/avatar.jpg")}
                />
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
            backgroundColor: "#f7f7f7",
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 80,
          }}
        >
          <Carousel
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages={true}
            vertical={false}
            loop={true} // Thêm prop loop
            autoplay={true} // Thêm prop autoplay
            autoplayInterval={3000} // Thời gian giữa các slide trong autoplay (nếu cần)
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          {pagination()}
          <View style={{}}>
            <Course />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
              marginTop={20}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold" }}
              >
                Danh mục
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  borderBottomWidth: 0.5,
                }}
              >
                Xem tất cả
              </Text>
            </Box>
            <CategoriresItem />
            <Course />
            <Course />
            <Course />
          </View>
        </View>
      </ScrollView> */}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 240,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    objectFit: "cover",
    width: "100%",
    height: 150,
  },
});
