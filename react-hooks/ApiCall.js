import { useEffect, useRef, useState } from "react";

function UseEffectExample() {
  const [data, setData] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    console.log("Component mounted");

    return () => {
      console.log("Component unmounted");

      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const fetchData = async () => {
    controllerRef.current = new AbortController();

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
        {
          signal: controllerRef.current.signal,
        }
      );

      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request cancelled");
      } else {
        console.error("Failed to fetch data:", error);
      }
    }
  };

  return (
    <div>
      <h1>useEffect Example</h1>

      <button onClick={fetchData}>
        Fetch Data
      </button>

      {data && (
        <div>
          <p>Title: {data.title}</p>
          <p>Completed: {data.completed ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

export default UseEffectExample;