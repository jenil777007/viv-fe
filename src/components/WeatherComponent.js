import React, { useState, useEffect } from "react";

import styles from "./WeatherComponent.module.css";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import WeatherChart from "./WeatherChart";
import { API_URL, REQUEST_INTERVAL } from "../constants";

export default function WeatherComponent() {
  const INIT_COUNTER_VALUE = REQUEST_INTERVAL / 1000;

  const [countdown, setCountdown] = useState(INIT_COUNTER_VALUE);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  //   -------------------------------------
  //   Component Helper Methods
  //   -------------------------------------
  const _fetchAndSetData = () => {
    setIsLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);

        const tempData = [
          { time: "current", temp_f: data.current.temp_f },
          ...data.forecast,
        ];

        setData(tempData);
      });
  };

  //   -------------------------------------
  //   Component Hooks
  //   -------------------------------------
  useEffect(() => {
    if (countdown === 0) {
      _fetchAndSetData();
      setCountdown(INIT_COUNTER_VALUE);
    }

    let timer = null;
    if (!isLoading) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown, isLoading]);

  //   -------------------------------------
  //   Component Skeleton
  //   -------------------------------------
  function _renderComponent() {
    return (
      <div className={styles.container}>
        <Typography variant="h4">Weather Chart</Typography>
        <Typography variant="body1" style={{ textAlign: "center" }}>
          Refreshing in
          <Typography variant="h3">{countdown}</Typography>
          seconds
        </Typography>
        <div className={styles.chartContainer}>
          {isLoading ? <CircularProgress /> : <WeatherChart data={data} />}
        </div>
      </div>
    );
  }

  return _renderComponent();
}
