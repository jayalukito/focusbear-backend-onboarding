import { useEffect, useRef, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function AxiosExample() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef(null);

  const createPost = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(
        "/posts",
        {
          title: "Axios Onboarding",
          body: "Learning how to use Axios",
          userId: 1,
        },
        {
          params: {
            source: "react-onboarding",
          },
          signal: controller.signal,
        }
      );

      console.log("API Response:", response.data);

      setData(response.data);

      if (response.data.redirectTo) {
        window.location.href = response.data.redirectTo;
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("Request cancelled");
        setError("Request was cancelled.");
      } else if (error.code === "ECONNABORTED") {
        console.log("Request timed out");
        setError("Request timed out.");
      } else {
        console.error("Request failed:", error);
        setError("Failed to create post.");
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div>
      <h1>Axios Example</h1>

      <button onClick={createPost} disabled={loading}>
        {loading ? "Loading..." : "Create Post"}
      </button>

      <button onClick={cancelRequest}>
        Cancel Request
      </button>

      {error && <p>{error}</p>}

      {data && (
        <div>
          <h2>Response</h2>

          <p>ID: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Body: {data.body}</p>
          <p>User ID: {data.userId}</p>
        </div>
      )}
    </div>
  );
}

export default AxiosExample;