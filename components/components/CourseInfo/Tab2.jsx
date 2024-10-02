import React from "react";
import ReviewItem from "../ReviewItem";
import Transition from "../Transition";
import { Box, Button, ButtonText, Text } from "@gluestack-ui/themed";

const Tab2 = ({listReview, onSubmit}) => {
  return (
    <Transition>
      <Box
        marginBottom={20}
      >
        <Button
          onPress={onSubmit}
          size="md"
          variant="solid"
          action="primary"
          isFocusVisible={false}
          style={{
            borderRadius: 20,
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 10,
          }}
          bg="#61bc84"
          $hover-bg="#61bc84"
          $active-bg="#61bc84"
          $_text-hover-color="$white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ButtonText textTransform="uppercase">Đánh giá của bạn</ButtonText>
        </Button>
        <Text style={{ marginBottom: 10 }}>Tất cả đánh giá:</Text>
        <Box paddingHorizontal={20}>
          {listReview.map((item) => (
            <ReviewItem
              userName={item?.user_name}
              content={item?.content}
              avatar={item?.avatar_user}
              isComment={false}
              data={item}
              key={item.id}
            />
          ))}
        </Box>
      </Box>
    </Transition>
  );
};

export default Tab2;
