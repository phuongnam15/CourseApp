import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonIcon,
  Icon,
  Input,
  InputField,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Search, ShoppingCart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import CategoriresItem from "../../../components/components/CategoriesItem";
import Course from "../../../components/components/Course";
import { sendGet } from "@/api/axiosClient";

const { width: screenWidth } = Dimensions.get("window");
export default function Home() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [entries, setEntries] = useState([]);
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
  const handleGetBanner = async () => {
    try {
      const res = await sendGet("/user/banner");
      setEntries(
        res.data.data.map((item: any) => {
          return {
            thumbnail: item.image.url,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetCategory = async () => {
    try {
      const res = await sendGet("/user/category");
      setCategoryList(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetBanner();
    handleGetCategory();
  }, []);
  return (
    <View style={{ backgroundColor: "#69b4ff" }}>
      <ScrollView
        style={{
          marginTop: 60,
        }}
      >
        <View style={{ backgroundColor: "#f7f7f7" }}>
          <View
            style={{
              backgroundColor: "#69b4ff",
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
                <Text color="#fff" style={{ fontWeight: "bold", fontSize: 18 }}>
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
                <Badge
                  h={23}
                  w={23}
                  bg="$red600"
                  borderRadius="$full"
                  mb={-14}
                  mr={-5}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                >
                  <BadgeText color="$white">2</BadgeText>
                </Badge>
                <Button
                  onPress={() => {
                    router.push("/Checkout/");
                  }}
                  borderRadius="$full"
                  size="lg"
                  p={1}
                  paddingHorizontal={15}
                  bg="#56b7ea"
                  borderColor="#56b7ea"
                >
                  <ButtonIcon as={ShoppingCart} />
                </Button>
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
                  <InputField placeholder="Search for anything ..." />
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
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 40,
          }}
        >
          <Carousel
            sliderWidth={screenWidth - 20}
            itemWidth={screenWidth - 20}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages={true}
            vertical={false}
            loop={true} // Thêm prop loop
            autoplay={true} // Thêm prop autoplay
            autoplayInterval={3000} // Thời gian giữa các slide trong autoplay (nếu cần)
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          {/* {pagination()} */}
          <View>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
              marginTop={20}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Danh mục</Text>
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
            <CategoriresItem data={categoryList} />
            {categoryList
              ?.filter((arg: any) => arg.total_courses > 0)
              .map((item, index) => (
                <Course key={index} data={item} />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
    // height: screenWidth - 240,
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
    height: "100%",
    position: "absolute",
    // height: 150,
  },
});
