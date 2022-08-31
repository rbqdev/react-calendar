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
} from "@chakra-ui/react";
import { useRef } from "react";
import { format } from "date-fns";

type ModalEventProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalEvent = ({ isOpen, onClose }: ModalEventProps) => {
  const initialRef = useRef(null);

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
              <Input ref={initialRef} placeholder="Event name" maxLength={30} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
              />
            </FormControl>

            <Flex gap={4}>
              <FormControl mt={4}>
                <FormLabel>Start Time</FormLabel>
                <Input placeholder="Start Time" size="md" type="time" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>End Time</FormLabel>
                <Input placeholder="End Time" size="md" type="time" />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
