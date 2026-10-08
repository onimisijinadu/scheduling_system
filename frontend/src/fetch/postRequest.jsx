import { useState } from "react";

export const PostRequest = (dataUrl) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const postData = async (itemsKey, item) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`${dataUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [itemsKey]: item,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setData([result, ...data]);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading, error, data };
};

export const usePutRequest = (baseUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const updateData = async (id, itemKey, item) => {
    try {
      setIsLoading(true);
      setError("");

      const targetUrl = id ? `${baseUrl.replace(/\/+$/, " ")}/${id}` : baseUrl;

      const response = await fetch(`${targetUrl}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [itemKey]: item,
        }),
      });
      if (!response.ok) {
        throw new Error(
          error.message || `HTTP error! status: ${response.status}`,
        );
      }

      const result = await response.json();

      setData(result.data || result);
      return result;
    } catch (error) {
      setError(error.message || "Failed to update record");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateData, data, error, isLoading };
};

export const useDeleteRequest = (baseUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const deleteRecord = async (id, itemKey, secondaryId) => {
    try {
      setIsLoading(true);
      setError("");
      const targetUrl = id ? `${baseUrl.replace(/\/+&/, "")}/${id}` : baseUrl;
      const finalUrl = secondaryId
        ? `${targetUrl}/${itemKey}/${secondaryId}`
        : targetUrl;

      const response = await fetch(`${finalUrl}`, {
        method: "DELETE",
      });

      const result = response.status === 204 ? null : await response.json();

      if (!response.ok) {
        throw new Error(
          error.message || `HTTP Error, status: ${response.status}`,
        );
      }

      setData(result);
      console.log("Delete request successful:", result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteRecord, data, error, isLoading };
};
