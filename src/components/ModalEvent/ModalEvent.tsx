import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  useToast,
  theme,
  Heading,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Event } from "src/types";
import { EventForm, EventList, InputEvent } from "./components";
import { format, parseISO } from "date-fns";

const DEFAULT_VALUES: Record<InputEvent, any> = {
  [InputEvent.NAME]: "",
  [InputEvent.START_TIME]: "",
  [InputEvent.END_TIME]: "",
  [InputEvent.COLOR]: theme.colors.blue[500],
  [InputEvent.CITY]: "",
};

type ModalEventProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveEvent: (event: Event, eventIndex: number | null) => void;
  date: string;
};

export const ModalEvent = ({
  isOpen,
  onClose,
  onSaveEvent,
  date,
}: ModalEventProps) => {
  const initialRef = useRef(null);
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [innerEventIndex, setInnerEventIndex] = useState<number | null>(null);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleEditEvent = (event: Event, eventIndex: number) => {
    setValues({ ...event });
    setInnerEventIndex(eventIndex);
  };

  const handleModalClose = () => {
    setValues({ ...DEFAULT_VALUES });
    onClose();
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!verifyTime()) {
      return;
    }

    onSaveEvent({ ...values, date }, innerEventIndex);
    setValues({ ...DEFAULT_VALUES });
    setInnerEventIndex(null);
    toast({
      title: `Event saved successfully!`,
      status: "success",
      isClosable: true,
    });
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleModalClose}
        isCentered
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" gap={4} alignItems="center" pr={16}>
            <Heading size="lg" flexGrow={1}>
              {date ? format(parseISO(date), "MMMM dd/yy") : ""}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={6} mb={4}>
              <EventForm
                values={values}
                eventIndex={innerEventIndex}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formIsInvalid={formIsInvalid}
                onClose={onClose}
                ref={initialRef}
              />
              <EventList date={date} onEditEvent={handleEditEvent} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
