import {
  useCallback,
  useEffect,
  useState,
} from 'react';

export const useFetch = (dataUrl, itemKey) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetchData = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!dataUrl) {
      return;
    }

    // Use AbortController to prevent race conditions & memory leaks
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);

        setError("");

        const res = await fetch(`${dataUrl}`, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();

        setData(Array.isArray(result) ? result : result?.data?.[itemKey] || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch Error:", error.message);
          setError(error.message || "Failed to fetch data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup on unmount or URL change
    return () => controller.abort();
  }, [dataUrl, itemKey, refetchIndex]);

  return { data, error, isLoading, setData, refetchData };
};
