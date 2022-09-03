const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL;

type WeatherResponse = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
};

export const getWeather = async (city: string): Promise<WeatherResponse> => {
  const fetchResponse = await fetch(
    `${WEATHER_API_BASE_URL}/weather?q=${city}&APPID=${WEATHER_API_KEY}`
  );

  const response = (await fetchResponse.json()) as WeatherResponse;

  return response;
};
