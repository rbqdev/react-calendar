import {
  Box,
  Text,
  Flex,
  Button,
  theme,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { EVENTS, removeEvent, removeAllEventsFromDate } from "src/events";
import { Event } from "src/types";
import { useForceUpdate } from "src/hooks";
import { AlertRemoveAllEvents, EventItem } from "./components";

type EventListProps = {
  date: string;
  onEditEvent: (event: Event, eventIndex: number) => void;
};

export const EventList = ({ date, onEditEvent }: EventListProps) => {
  const { forceUpdate } = useForceUpdate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const hasEvents = EVENTS[date] && EVENTS[date].length > 0;

  const handleEditEvent = (event: Event, eventIndex: number) => {
    onEditEvent(event, eventIndex);
  };

  const handleRemoveEvent = (event: Event, eventIndex: number) => {
    removeEvent(event, eventIndex);
    forceUpdate();
    toast({
      title: `Event deleted`,
      status: "success",
      isClosable: true,
    });
  };

  const handleRemoveAllEvents = () => {
    removeAllEventsFromDate(date);
    onClose();
    toast({
      title: `All events deleted`,
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Box flexGrow={1}>
      <Flex alignItems="center" justifyContent="space-between" mb={7}>
        <Text fontWeight="bold" mb={2}>
          Events
        </Text>

        {hasEvents ? (
          <Button
            size="xs"
            leftIcon={<DeleteIcon color={theme.colors.red[500]} />}
            onClick={onOpen}
          >
            REMOVE ALL EVENTS
          </Button>
        ) : null}

        <AlertRemoveAllEvents
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleRemoveAllEvents}
          date={date}
        />
      </Flex>

      <Flex flexDirection="column" gap={2}>
        {hasEvents ? (
          EVENTS[date].map((event, index) => (
            <EventItem
              key={`event-${index}`}
              eventIndex={index}
              handleEditEvent={() => handleEditEvent(event, index)}
              handleRemoveEvent={() => handleRemoveEvent(event, index)}
              {...event}
            />
          ))
        ) : (
          <Text>No events registered on this day!</Text>
        )}
      </Flex>
    </Box>
  );
};
