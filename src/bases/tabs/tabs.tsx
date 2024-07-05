import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Tab from "./tab";
import { traverseReactNode } from "../utils/traverse-react-node";
import cx from "classnames";

export interface TabsProps {
  /** 当前激活tab的key */
  activeKey: string;
  children?: React.ReactNode;
  /** 是否显示tab下滑线 */
  showTabLine?: boolean;
  /** tab样式 */
  type?: "line" | "card";
  /** tab切换事件 */
  onChange?: (key: string) => void;
  /** tab激活样式 */
  tabActiveClassName?: string;
  /** tab列表样式 */
  tabListClassName?: string;
  /** tab内容样式 */
  tabContentClassName?: string;
}

const classPrefix = "ygm-tabs";

const Tabs: React.FC<TabsProps> = ({
  activeKey,
  children,
  showTabLine = true,
  type = "line",
  onChange,
  tabActiveClassName,
  tabListClassName,
  tabContentClassName,
}) => {
  const [activityTab, setActivityTab] = useState(activeKey);

  const keyToIndexRecord: Record<string, number> = useMemo(() => ({}), []);
  const panes: React.ReactElement<React.ComponentProps<typeof Tab>>[] = [];

  const tabListRef = useRef<HTMLDivElement>(null);

  const [activeLineStyle, setActiveLineStyle] = useState({
    width: 0,
    transform: "translate3d(0, 0, 0)",
    transitionDuration: "300ms",
  });

  const isInit = useRef(false);

  const calculateLineWith = useCallback(() => {
    if (!showTabLine) return;
    const tabListEl = tabListRef.current;
    if (!tabListEl) return;
    const activeIndex = keyToIndexRecord[activityTab];
    const activeTabWrapEl = tabListEl.children.item(activeIndex)!;
    const activeTabEl = activeTabWrapEl.children.item(0)! as HTMLDivElement;
    const tabActiveWidth = activeTabEl.offsetWidth;
    const tabActiveLeft = activeTabEl.offsetLeft;
    setActiveLineStyle({
      width: tabActiveWidth,
      transform: `translate3d(${tabActiveLeft}px, 0, 0)`,
      transitionDuration: isInit.current ? "300ms" : "0ms",
    });
  }, [showTabLine, keyToIndexRecord, activityTab]);

  useLayoutEffect(() => {
    calculateLineWith();
    return () => {
      isInit.current = true;
    };
  }, [calculateLineWith]);

  useEffect(() => {
    window.addEventListener("resize", calculateLineWith);
    return () => {
      window.removeEventListener("resize", calculateLineWith);
    };
  }, [calculateLineWith]);

  traverseReactNode(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (!child.key) return;
    const length = panes.push(
      child as React.ReactElement<React.ComponentProps<typeof Tab>>
    );
    keyToIndexRecord[child.key] = length - 1;
  });

  const onTab = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const key = (e.target as HTMLElement).dataset.key;
    if (key === activityTab) return;
    setActivityTab(key!);
    onChange?.(key!);
  };

  return (
    <div className={classPrefix}>
      <div
        className={cx(
          `${classPrefix}-tab-list`,
          tabListClassName,
          `${classPrefix}-tab-list-${type}`
        )}
        ref={tabListRef}
      >
        {panes.map((pane) => {
          return (
            <div
              key={pane.key}
              className={cx(`${classPrefix}-tab`, {
                [`${classPrefix}-tab-active`]: pane.props.name === activityTab,
                [tabActiveClassName || ""]: pane.props.name === activityTab,
              })}
              data-key={pane.props.name}
              onClick={onTab}
            >
              <div
                className={cx(`${classPrefix}-tab-title`)}
                data-key={pane.props.name}
              >
                {pane.props.title}
              </div>
            </div>
          );
        })}

        {showTabLine && (
          <div
            className={`${classPrefix}-tab-line`}
            style={activeLineStyle}
          ></div>
        )}
      </div>

      {panes.map((child) => {
        return child.props.children ? (
          <div
            className={cx(`${classPrefix}-content`, tabContentClassName)}
            key={child.props.name}
            style={{
              display: child.props.name === activityTab ? "block" : "none",
            }}
          >
            {child}
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Tabs;
