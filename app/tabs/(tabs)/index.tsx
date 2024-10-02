import { sendGet } from "@/api/axiosClient";
import DefaultHeader from "@/components/components/Header/DefaultHeader";
import {
  Box,
  FlatList,
  Text,
  View
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { SafeAreaView, useSafeArea, useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import CategoriresItem from "../../../components/components/CategoriesItem";
import Course from "../../../components/components/Course";

const { width: screenWidth } = Dimensions.get("window");
export default function Home() {
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
  const renderCategory = ({ item, index }: { item: any; index: number }) => {
    return <Course key={index} data={item} />;
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
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView
      style={{ backgroundColor: "#2E8B57", flex: 1, display: "flex", paddingBottom: -insets.bottom}}
    >
      <DefaultHeader />
      <View
        style={{
          backgroundColor: "#f7f7f7",
          paddingTop: 30,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 10,
          flex: 1,
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
        <View>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
            marginTop={10}
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
          <FlatList
              data={categoryList?.filter((arg: any) => arg.total_courses > 0)}
              renderItem={renderCategory}
              keyExtractor={(item, index) => index.toString()}
              // horizontal
              // showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              contentContainerStyle={{
                marginTop: 10,
              }}
            />
        </View>
      </View>
    </SafeAreaView>
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
