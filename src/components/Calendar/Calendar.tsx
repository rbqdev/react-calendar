import { Box, Flex, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import * as Styles from "./Calendar.styles";
import { useState, useEffect } from "react";
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

type Day = {
  day: string | number;
  date: string;
  isDayFromCurrentMonth?: boolean;
  isWeekendInCurrentMonth?: boolean;
  isToday?: boolean;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let countTotalMonths = 0;
let countCalendarMonth = 0;

const addMonth = () => countTotalMonths++;
const subMonth = () => countTotalMonths--;

const getDaysFromMonth = (): Day[] => {
  const daysMonth = [];
  const currentDate = add(new Date(), { months: countTotalMonths });
  const firstDayOfMonth = Number(format(startOfMonth(currentDate), "d")) - 1;
  const lastDayOfMonth = Number(format(endOfMonth(currentDate), "d"));
  const countDaysInCurrentMonth = getDay(startOfMonth(currentDate));
  const countWeeks = getWeeksInMonth(currentDate);
  countCalendarMonth = currentDate.getMonth();

  for (
    let i = -countDaysInCurrentMonth;
    i < countWeeks * 7 - countDaysInCurrentMonth;
    i++
  ) {
    const dateDay = add(startOfMonth(currentDate), { days: i });
    const formmattedDay = format(dateDay, "d");

    if (i < firstDayOfMonth) {
      daysMonth.push({
        day: formmattedDay,
        date: format(dateDay, "yyyy-MM-dd"),
      });
    } else if (i >= lastDayOfMonth) {
      daysMonth.push({
        day: formmattedDay,
        date: format(dateDay, "yyyy-MM-dd"),
      });
    } else {
      daysMonth.push({
        day: formmattedDay,
        date: format(dateDay, "yyyy-MM-dd"),
        isDayFromCurrentMonth: true,
        isWeekendInCurrentMonth: isWeekend(dateDay),
        isToday: isToday(dateDay),
      });
    }
  }
  return daysMonth;
};

export const Calendar = () => {
  const [currentMonth, setCurrenMonth] = useState(countCalendarMonth);
  const [currentMonthName, setCurrentMonthName] = useState(
    MONTHS[currentMonth]
  );
  const [days, setDays] = useState([...getDaysFromMonth()]);

  const handleSubMonth = () => {
    subMonth();
    setDays([...getDaysFromMonth()]);
    setCurrenMonth(countCalendarMonth);
  };

  const handleAddMonth = async () => {
    addMonth();
    setDays([...getDaysFromMonth()]);
    setCurrenMonth(countCalendarMonth);
  };

  useEffect(() => {
    setCurrentMonthName(MONTHS[currentMonth]);
  }, [currentMonth]);

  return (
    <Flex flexDirection="column" h="750px">
      <Flex flexDirection="column" mb="12px">
        <Text fontWeight="bold" fontSize="32px">
          {currentMonthName}
        </Text>

        <Flex justifyContent="space-between">
          <Flex alignItems="center" gap={2}>
            <Button
              size="xs"
              type="button"
              onClick={handleSubMonth}
              leftIcon={<ArrowBackIcon />}
            >
              Prev
            </Button>
            <Button
              size="xs"
              type="button"
              onClick={handleAddMonth}
              rightIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Flex>

          <Box>
            <Button type="button" colorScheme="blue">
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
            { day, isDayFromCurrentMonth, isWeekendInCurrentMonth, isToday },
            index
          ) => (
            <Styles.Day
              key={`day-${index}`}
              isDayFromCurrentMonth={isDayFromCurrentMonth}
              isWeekendInCurrentMonth={isWeekendInCurrentMonth}
            >
              <Text
                fontWeight="bold"
                borderRadius="100%"
                width="30px"
                height="30px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={isToday ? "black" : "transparent"}
                color={isToday ? "white" : "black"}
              >
                {day}
              </Text>
            </Styles.Day>
          )
        )}
      </SimpleGrid>
    </Flex>
  );
};
