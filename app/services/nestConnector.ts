import { QueryFunctionContext } from "react-query";

export const fetchItems = async (
  context: QueryFunctionContext
): Promise<ItemsResponse> => {
  const page = context.queryKey[1] as number;
  const response = await fetch(`http://localhost:3000?page=${page}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const MALE_ROCK_VOICE_ID = "1118452";
export const postTTSData = async (inputTtsText: string) => {
  const response = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputTtsText, voiceModelId: MALE_ROCK_VOICE_ID }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
