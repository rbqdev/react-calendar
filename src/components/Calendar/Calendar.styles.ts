import styled from "@emotion/styled";
import { theme } from "@chakra-ui/react";

export const Day = styled.div<{
  isDayFromCurrentMonth?: boolean;
  isWeekendInCurrentMonth?: boolean;
}>`
  border-top: 1px solid;
  border-left: 1px solid;
  border-color: black;
  min-height: 100px;
  min-width: 150px;
  padding: 4px 8px;
  background: ${({ isDayFromCurrentMonth }) =>
    isDayFromCurrentMonth ? "white" : theme.colors.gray[100]};

  color: ${({ isDayFromCurrentMonth, isWeekendInCurrentMonth }) =>
    isDayFromCurrentMonth
      ? isWeekendInCurrentMonth
        ? "blue"
        : "black"
      : theme.colors.gray[400]};
`;

export const DayEventsWrapper = styled.div`
  border: 1px solid;
`;

export const DayEvent = styled.div`
  border: 1px solid;
`;
