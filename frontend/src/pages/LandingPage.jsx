import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <p>Welcome to Calorie Track App</p>
      <p>
        to get started ! <Link to="track">Strating track</Link>
      </p>
    </>
  );
}
