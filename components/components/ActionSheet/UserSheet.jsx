import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
  Icon,
} from "@gluestack-ui/themed";
import { BadgeCheck, Ban, CircleX, LogIn, LogOut } from "lucide-react-native";
import React from "react";
const UserSheet = ({ showActionsheet, handleClose, onSubmit, onBan, onReject }) => {
  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$72" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={onSubmit}>
          <ActionsheetIcon>
            <Icon size="sm" as={BadgeCheck} color="green" />
          </ActionsheetIcon>
          <ActionsheetItemText>Cho phép tham gia</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={onReject}>
          <ActionsheetIcon>
            <Icon size="sm" as={CircleX} color="red" />
          </ActionsheetIcon>
          <ActionsheetItemText>Từ chối tham gia</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={onBan}>
          <ActionsheetIcon>
            <Icon size="sm" as={Ban} />
          </ActionsheetIcon>
          <ActionsheetItemText>Chặn người này</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
};
export default UserSheet;
