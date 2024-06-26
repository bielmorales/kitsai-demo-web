"use client";
import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import { fetchItems, postTTSData } from "../services/nestConnector";
import { Pagination } from "./pagination";
import ItemList from "./itemList";
import { toast } from "react-toastify";
import LoadingComponent from "./loading";

const queryClient = new QueryClient();

function DemoContent() {
  const [textInput, setTextInput] = useState("");
  const [page, setPage] = useState(1);
  const [refetchInterval, setRefetchInterval] = useState<number | false>(false);
  const queryKey = ["items", page];
  const {
    data,
    isError,
    isFetching: isLoading,
    refetch,
  } = useQuery<ItemsResponse, Error>(queryKey, fetchItems, {
    keepPreviousData: true,
    refetchInterval,
  });
  useEffect(() => {
    const hasPending = data?.data.some((item) => item.status === "running");
    setRefetchInterval(hasPending ? 1000 : false);
  }, [data]);

  const { mutate: generateTTS, isLoading: isGeneratingTTS } = useMutation(
    postTTSData,
    {
      onSuccess: () => {
        refetch();
        toast("TTS created!", { type: "success" });
        setTextInput("");
      },
      onError: () => {
        toast("There was an error", { type: "error" });
      },
    }
  );

  if (isError)
    return (
      <div className="text-center py-4 text-red-500">An error occurred</div>
    );
  return (
    <div className="w-full max-w-xl mx-auto bg-blue-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-blue-500 mb-2">Create TTS</h2>

      <div className="mb-4">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter TTS text"
          className="w-full p-3 rounded border-2 border-blue-300 outline-none focus:border-blue-500 transition-colors"
        />
        <button
          className={`mt-3 w-full bg-blue-500 disabled:bg-blue-300 hover:bg-blue-600 text-blue-500 font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out ${
            !(isGeneratingTTS || !textInput) && "hover:-translate-y-0.5"
          } ${isGeneratingTTS || !textInput ? "text-blue-500" : "text-white"}`}
          disabled={isGeneratingTTS || !textInput}
          onClick={() => generateTTS(textInput)}
        >
          {isGeneratingTTS ? "Creating..." : "Create"}
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 mb-2">TTS List</h2>

      <div className="container mx-auto px-2 sm:min-h-[320px] min-h-[380px]  rounded">
        <LoadingComponent
          isLoading={
            isLoading && !data?.data.some((item) => item.status === "running")
          }
        >
          <>
            <ItemList items={data?.data || []} />
          </>
        </LoadingComponent>
      </div>
      <hr className="my-2 border-t border-blue-200" />
      <Pagination
        lastPage={data?.lastPage || 1}
        currentPage={data?.currentPage || 1}
        onPageChange={setPage}
        onRefresh={refetch}
      />
    </div>
  );
}
export default function Demo() {
  return (
    <QueryClientProvider client={queryClient}>
      <DemoContent />
    </QueryClientProvider>
  );
}
