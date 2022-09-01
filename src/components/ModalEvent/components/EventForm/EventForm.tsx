import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Button,
  Text,
  theme,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export enum InputEvent {
  NAME = "name",
  START_TIME = "startTime",
  END_TIME = "endTime",
  COLOR = "color",
}

type EventFormProps = {
  values: Record<InputEvent, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
  formIsInvalid: () => boolean;
  onClose: () => void;
  eventIndex: number | null;
};

export const EventForm = forwardRef<HTMLInputElement, EventFormProps>(
  (
    { values, handleChange, handleSubmit, formIsInvalid, onClose, eventIndex },
    ref
  ) => {
    const hasEventIndex = eventIndex !== null;

    return (
      <Box flexGrow={1}>
        <Text fontWeight="bold" mb={2}>
          {hasEventIndex ? "Update event" : "Add Event"}
        </Text>

        <FormControl>
          <FormLabel fontSize={14}>Name</FormLabel>
          <Input
            ref={ref}
            placeholder="Event name"
            maxLength={30}
            name={InputEvent.NAME}
            value={values[InputEvent.NAME]}
            onChange={handleChange}
          />
        </FormControl>

        <Flex gap={4}>
          <FormControl mt={4}>
            <FormLabel fontSize={14}>Start Time</FormLabel>
            <Input
              placeholder="Start Time"
              size="md"
              type="time"
              name={InputEvent.START_TIME}
              value={values[InputEvent.START_TIME]}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel fontSize={14}>End Time</FormLabel>
            <Input
              placeholder="End Time"
              size="md"
              type="time"
              name={InputEvent.END_TIME}
              value={values[InputEvent.END_TIME]}
              onChange={handleChange}
            />
          </FormControl>
        </Flex>

        <FormControl mt={4} maxW="120px">
          <FormLabel fontSize={14}>Color</FormLabel>
          <Input
            placeholder="Color"
            size="md"
            type="color"
            name={InputEvent.COLOR}
            defaultValue={theme.colors.blue[500]}
            onChange={handleChange}
          />
        </FormControl>

        <Flex mt={8}>
          <Button
            colorScheme="blue"
            mr={3}
            type="button"
            onClick={handleSubmit}
            disabled={formIsInvalid()}
            flexGrow={1}
          >
            Save
          </Button>
          <Button flexGrow={1} onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      </Box>
    );
  }
);
