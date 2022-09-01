import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef } from "react";
import { EVENTS } from "src/events";

type AlertRemoveAllEventsProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  date: string;
};

export const AlertRemoveAllEvents = ({
  isOpen,
  onClose,
  onDelete,
  date,
}: AlertRemoveAllEventsProps) => {
  const cancelRef = useRef(null);
  const eventsCount = EVENTS[date] ? EVENTS[date].length : 0;

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete all events?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete all events? {eventsCount} events
            will be deleted.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
