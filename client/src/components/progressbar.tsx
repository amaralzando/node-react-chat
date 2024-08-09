import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progressbar = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => (prevPercentage + 1) % 100);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return <CircularProgressbar value={percentage} />;
};

export default Progressbar;
