import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";

const Notification = ({ id, title, description = 'Thất bại', color = "warning" }) => {
  return (
    <Toast nativeID={id} action={color} variant="accent">
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
      </VStack>
    </Toast>
  );
};

export default Notification;
