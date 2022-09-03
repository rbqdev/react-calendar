import { Text, Flex, Badge, Button, theme } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, SunIcon } from "@chakra-ui/icons";
import { Event } from "src/types";
import { useState, useEffect } from "react";
import { getWeather } from "src/api";

type EventItemProps = Event & {
  eventIndex: number;
  handleEditEvent: (event: Event, eventIndex: number) => void;
  handleRemoveEvent: (event: Event, eventIndex: number) => void;
};

export const EventItem = ({
  eventIndex,
  handleEditEvent,
  handleRemoveEvent,
  ...event
}: EventItemProps) => {
  const [weather, setWeather] = useState("");
  const { name, startTime, endTime, color, city } = event;

  useEffect(() => {
    const getWeatherFromApi = async () => {
      const { weather } = await getWeather(city);
      setWeather(weather[0].main);
    };

    getWeatherFromApi();
  }, [city]);

  if (!weather) {
    return <Text>Looking for the weather...</Text>;
  }

  return (
    <Badge
      flexGrow={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      gap={4}
      color={color}
      textTransform="initial"
    >
      <Flex
        flexGrow={1}
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <Flex flexDirection="column">
          <Text display="flex" gap={1}>
            {name} - <Text color="gray.600">{city}</Text>
          </Text>

          <Text color="gray.500" fontSize={10}>
            <SunIcon /> {weather}
          </Text>
        </Flex>
        <Text>
          {startTime} - {endTime}
        </Text>
      </Flex>

      <Flex>
        <Button size="xs" onClick={() => handleEditEvent(event, eventIndex)}>
          <EditIcon color={theme.colors.black} />
        </Button>
        <Button size="xs" onClick={() => handleRemoveEvent(event, eventIndex)}>
          <DeleteIcon color={theme.colors.red[500]} />
        </Button>
      </Flex>
    </Badge>
  );
};
