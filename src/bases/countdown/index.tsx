import cx from "classnames";

import "./index.scss";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

export interface CountdownProps {
  /** 倒计时总时长，单位毫秒 */
  time: number;
  /** 倒计时格式 hh:mm:ss */
  format?: string;
  /** 结束文案 */
  endText?: string;
  /** 数字样式 */
  numberClassName?: string;
  /** 符号样式 */
  symbolClassName?: string;
  /** 结束文案样式 */
  endTextClassName?: string;
}

type timeItemsType = { num: number; symbol: string }[];

const classPrefix = "ygm-countdown";

const Countdown: React.FC<CountdownProps> = ({
  time,
  format = "hh:mm:ss",
  endText = "已结束",
}) => {
  const [timeItems, setTimeItems] = useState<timeItemsType>([]);
  const [timeEnd, setTimeEnd] = useState<boolean>(false);

  const computeTimeRef = useRef<number>(time);
  const timeRef = useRef<number>(0);

  const endTimeMs = useMemo(() => {
    return Date.now() + computeTimeRef.current;
  }, []);

  const initCountDown = useCallback(() => {
    clearTimeout(timeRef.current);
    const now = Date.now();
    computeTimeRef.current = endTimeMs - now;

    if (computeTimeRef.current <= 0) {
      setTimeEnd(true);
      return;
    }

    timeRef.current = setTimeout(() => {
      initCountDown();
    }, 1000);
  }, [endTimeMs]);

  useLayoutEffect(() => {
    initCountDown();

    return () => {
      clearTimeout(timeRef.current);
    };
  }, [initCountDown]);

  return <div className={classPrefix}></div>;
};

Countdown.displayName = "Countdown";

export default Countdown;

function getTimeItems(format: string, timeLeft: number) {
  const timeArr: string[] = format.match(/[a-zA-Z]{1,3}/g) || [];
  const symbolArr: string[] = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [];
  let d = timeLeft;
  const [_, s, m, h] = [1000, 60, 60, 24].map((unit) => {
    d = Math.floor(d / unit);
    return d % unit;
  });
}
