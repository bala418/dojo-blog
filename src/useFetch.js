import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [isPending, setisPending] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("use effect run");

    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw Error("could not fetch data for that resource!");
          }
          return res.json();
        })

        .then((data) => {
          console.log(data);
          setData(data);
          setisPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            console.log(err.message);
            setError(err.message);
            setisPending(false);
          }
        });
    }, 418);
    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
