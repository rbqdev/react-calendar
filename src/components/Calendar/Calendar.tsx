import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Button,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import * as Styles from "./Calendar.styles";
import { useState } from "react";
import {
  format,
  endOfMonth,
  startOfMonth,
  add,
  getDay,
  isWeekend,
  isToday,
  getWeeksInMonth,
} from "date-fns";
import { MONTHS, EVENTS, addEvent } from "./utils";
import { ModalEvent } from "src/components";
import type { Event } from "src/types";

type Day = {
  day: string | number;
  date: string;
  isDayFromCurrentMonth?: boolean;
  isWeekendInCurrentMonth?: boolean;
  isToday?: boolean;
};

let countTotalMonths = 0;
let fullCalendarTitle = "";

const goToNextMonth = () => countTotalMonths++;
const goToPreviousMonth = () => countTotalMonths--;
const goToday = () => (countTotalMonths = 0);

const getDaysMonth = (): Day[] => {
  const daysMonth = [];
  const currentDate = add(new Date(), { months: countTotalMonths });
  const firstDayOfMonth = Number(format(startOfMonth(currentDate), "d")) - 1;
  const lastDayOfMonth = Number(format(endOfMonth(currentDate), "d"));
  const startDayOfWeek = getDay(startOfMonth(currentDate));
  const countWeeks = getWeeksInMonth(currentDate);
  fullCalendarTitle = `${
    MONTHS[currentDate.getMonth()]
  } - ${currentDate.getFullYear()}`;

  for (let i = -startDayOfWeek; i < countWeeks * 7 - startDayOfWeek; i++) {
    const dateDay = add(startOfMonth(currentDate), { days: i });
    const formmattedDay = format(dateDay, "d");
    const dayMonth = {
      day: formmattedDay,
      date: format(dateDay, "yyyy-MM-dd"),
    };

    if (i < firstDayOfMonth || i >= lastDayOfMonth) {
      daysMonth.push({ ...dayMonth });
    } else {
      daysMonth.push({
        ...dayMonth,
        isDayFromCurrentMonth: true,
        isWeekendInCurrentMonth: isWeekend(dateDay),
        isToday: isToday(dateDay),
      });
    }
  }
  return daysMonth;
};

export const Calendar = () => {
  const [days, setDays] = useState([...getDaysMonth()]);

  const {
    onOpen: onModalOpen,
    onClose: onModalClose,
    isOpen: onModalIsOpen,
  } = useDisclosure();

  const handlePreviousMonth = () => {
    goToPreviousMonth();
    setDays([...getDaysMonth()]);
  };

  const handleNextMonth = async () => {
    goToNextMonth();
    setDays([...getDaysMonth()]);
  };

  const handleGoToday = () => {
    goToday();
    setDays([...getDaysMonth()]);
  };

  const handleSaveEvent = (event: Event) => {
    addEvent(event);
    setDays([...getDaysMonth()]);
  };

  return (
    <Flex flexDirection="column" h="750px">
      <Flex flexDirection="column" mb="12px">
        <Text fontWeight="bold" fontSize="32px">
          {fullCalendarTitle}
        </Text>

        <Flex justifyContent="space-between">
          <Flex alignItems="center" gap={2}>
            <Button
              size="xs"
              type="button"
              onClick={handlePreviousMonth}
              leftIcon={<ArrowBackIcon />}
            >
              Prev
            </Button>

            <Button size="xs" type="button" onClick={handleGoToday}>
              Today
            </Button>

            <Button
              size="xs"
              type="button"
              onClick={handleNextMonth}
              rightIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Flex>

          <Box>
            <Button type="button" colorScheme="blue" onClick={onModalOpen}>
              Add Event
            </Button>
          </Box>
        </Flex>
      </Flex>

      <SimpleGrid
        columns={7}
        px={4}
        gap={8}
        fontWeight="bold"
        textAlign="center"
        color="white"
        bg="blue.600"
        border="1px solid"
        borderColor="blue.500"
      >
        <Box>Sunday</Box>
        <Box>Monday</Box>
        <Box>Tuesday</Box>
        <Box>Wednesday</Box>
        <Box>Thursday</Box>
        <Box>Friday</Box>
        <Box>Saturday</Box>
      </SimpleGrid>

      <SimpleGrid
        columns={7}
        borderRight="1px solid"
        borderBottom="1px solid"
        borderColor="black"
      >
        {days.map(
          (
            {
              day,
              isDayFromCurrentMonth,
              isWeekendInCurrentMonth,
              isToday,
              date,
            },
            index
          ) => (
            <Styles.Day
              key={`day-${index}`}
              isDayFromCurrentMonth={isDayFromCurrentMonth}
              isWeekendInCurrentMonth={isWeekendInCurrentMonth}
              onClick={onModalOpen}
            >
              <Text
                fontWeight="bold"
                borderRadius="100%"
                width="25px"
                height="25px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={isToday ? "black" : "transparent"}
                color={isToday ? "white" : "black"}
              >
                {day}
              </Text>

              <Flex flexDirection="column" mt={2} gap={2}>
                {EVENTS[date]
                  ? EVENTS[date]
                      .slice(0, 2)
                      .map(({ name, startTime, endTime }, index) => (
                        <Flex
                          key={`event-${index}`}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text
                            fontWeight="bold"
                            maxW="100px"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            fontSize={12}
                          >
                            {name}
                          </Text>{" "}
                          <Text fontSize={12}>{startTime}</Text>
                        </Flex>
                      ))
                  : null}
                <Box>
                  {EVENTS[date]
                    ? EVENTS[date].length > 2 && (
                        <Text display="flex" gap={2} fontSize={10}>
                          <span>+ {EVENTS[date].length - 2}</span>
                          <span>
                            more{" "}
                            {EVENTS[date].length - 2 === 1 ? "event" : "events"}
                          </span>
                        </Text>
                      )
                    : null}
                </Box>
              </Flex>
            </Styles.Day>
          )
        )}
      </SimpleGrid>

      <ModalEvent
        isOpen={onModalIsOpen}
        onClose={onModalClose}
        onSaveEvent={handleSaveEvent}
      />
    </Flex>
  );
};
