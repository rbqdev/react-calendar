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
import { MONTHS } from "./utils";
import { EVENTS, addEvent, updateEvent } from "src/events";
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

const NUMBER_OF_EVENTS_VISIBLE = 2;

export const Calendar = () => {
  const [days, setDays] = useState([...getDaysMonth()]);
  const [selectedDate, setSelectedDate] = useState("");

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

  const handleSaveEvent = (event: Event, eventIndex: number | null) => {
    if (typeof eventIndex === "number") {
      updateEvent(event, eventIndex);
    } else {
      addEvent(event);
    }
  };

  const handleModalOpen = (date: string) => {
    setSelectedDate(date);
    onModalOpen();
  };

  return (
    <Flex flexDirection="column" h="750px">
      <Flex flexDirection="column" mb="12px" gap={4}>
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

          <Text color="gray.500">
            *Click on each day for add a event or see the weather
          </Text>
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
              onClick={() => handleModalOpen(date)}
            >
              <Text
                fontSize={14}
                fontWeight="bold"
                borderRadius="100%"
                width="20px"
                height="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={isToday ? "black" : "transparent"}
                color={isToday ? "white" : "black"}
              >
                {day}
              </Text>

              <Flex flexDirection="column" mt={2} gap={1}>
                {EVENTS[date]
                  ? EVENTS[date]
                      .slice(0, NUMBER_OF_EVENTS_VISIBLE)
                      .map(({ name, startTime, color }, index) => (
                        <Badge
                          key={`event-${index}`}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          textTransform="lowercase"
                          color={color}
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
                          </Text>
                          <Text fontSize={10}>{startTime}</Text>
                        </Badge>
                      ))
                  : null}
                <Box>
                  {EVENTS[date]
                    ? EVENTS[date].length > NUMBER_OF_EVENTS_VISIBLE && (
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
        <ModalEvent
          isOpen={onModalIsOpen}
          onClose={onModalClose}
          onSaveEvent={handleSaveEvent}
          date={selectedDate}
        />
      </SimpleGrid>
    </Flex>
  );
};
