import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { format } from "date-fns";
import type { Event } from "src/types";

type ModalEventProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveEvent: (event: Event) => void;
};

export enum InputEvent {
  NAME = "name",
  DATE = "date",
  START_TIME = "startTime",
  END_TIME = "endTime",
}

const DEFAULT_VALUES: Record<InputEvent, any> = {
  [InputEvent.NAME]: "",
  [InputEvent.DATE]: format(new Date(), "yyyy-MM-dd"),
  [InputEvent.START_TIME]: "",
  [InputEvent.END_TIME]: "",
};

export const ModalEvent = ({
  isOpen,
  onClose,
  onSaveEvent,
}: ModalEventProps) => {
  const initialRef = useRef(null);
  const [values, setValues] = useState(DEFAULT_VALUES);
  const toast = useToast();

  const formIsInvalid = () => {
    return Object.keys(values).some((key) => !values[key as InputEvent]);
  };

  const verifyTime = () => {
    if (values[InputEvent.START_TIME] > values[InputEvent.END_TIME]) {
      toast({
        title: `The start time can't be bigger than end time`,
        status: "error",
        isClosable: true,
      });

      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!verifyTime()) {
      return;
    }

    onSaveEvent(values);
    setValues({ ...DEFAULT_VALUES });
    onClose();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Event name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Event name"
                maxLength={30}
                name={InputEvent.NAME}
                value={values[InputEvent.NAME]}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                name={InputEvent.DATE}
                defaultValue={values[InputEvent.DATE]}
                onChange={handleChange}
              />
            </FormControl>

            <Flex gap={4}>
              <FormControl mt={4}>
                <FormLabel>Start Time</FormLabel>
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
                <FormLabel>End Time</FormLabel>
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
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="button"
              onClick={handleSubmit}
              disabled={formIsInvalid()}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
