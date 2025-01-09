import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const REDIRECT_COUNTER = 10;
const COUNT_DWON_INTERVAL = 1000;
const HOME_LINK = "/";
export function ErrorPage() {
  const [counter, setCounter] = useState(REDIRECT_COUNTER);

  const intervalHandler = useRef();
  const navigateToHome = useNavigate();
  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalHandler.current);
      navigateToHome(HOME_LINK);
    }
  }, [counter]);
  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, COUNT_DWON_INTERVAL);
    return () => {
      clearInterval(intervalHandler.current);
    };
  }, []);

  return (
    <>
      <h1>Something went wrong...</h1>
      <p>Redirecting to Home Page in {counter}</p>
      <p>
        Or Click <Link to="/">Home page</Link> to go back
      </p>
    </>
  );
}
