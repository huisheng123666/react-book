import cx from "classnames";

import "./index.scss";
import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  endText,
  endTextClassName,
  numberClassName,
  symbolClassName,
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
    setTimeItems(getTimeItems(format, computeTimeRef.current));

    if (computeTimeRef.current <= 0) {
      setTimeEnd(true);
      return;
    }

    timeRef.current = setTimeout(() => {
      initCountDown();
    }, 1000);
  }, [endTimeMs, format]);

  useLayoutEffect(() => {
    initCountDown();

    return () => {
      clearTimeout(timeRef.current);
    };
  }, [initCountDown]);

  return (
    <div className={classPrefix}>
      {timeEnd && endText ? (
        <div className={endTextClassName}>{endText}</div>
      ) : (
        timeItems.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className={cx(`${classPrefix}-item`, numberClassName)}>
                {item.num}
              </div>
              <div className={symbolClassName}>{item.symbol}</div>
            </Fragment>
          );
        })
      )}
    </div>
  );
};

Countdown.displayName = "Countdown";

export default Countdown;

const DAY_MILL_SECOND = 24 * 60 * 60 * 1000;
const HOUR_MILL_SECOND = 60 * 60 * 1000;
const MINUTE_MILL_SECOND = 60 * 1000;

function getTimeItems(format: string, timeLeft: number) {
  const timeArr: string[] = format.match(/[a-zA-Z]{1,3}/g) || [];
  const symbolArr: string[] = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [];
  let d = timeLeft;
  let [, s, m, h] = [1000, 60, 60, 24].map((unit) => {
    const num = d % unit;
    d = Math.floor(d / unit);
    return num;
  });

  if (timeLeft > DAY_MILL_SECOND && !format.includes("d")) {
    h += d * 24;
  }
  if (timeLeft > HOUR_MILL_SECOND && !format.includes("h")) {
    m += h * 60;
  }
  if (timeLeft > MINUTE_MILL_SECOND && !format.includes("m")) {
    s += m * 60;
  }

  return timeArr.map((item, index) => {
    return {
      num:
        item === "ss"
          ? formatTime(s)
          : item === "mm"
          ? formatTime(m)
          : item === "hh"
          ? formatTime(h)
          : d,
      symbol: symbolArr[index],
    };
  });
}

function formatTime(time: number) {
  return time < 10 ? `0${time}` : time;
}
