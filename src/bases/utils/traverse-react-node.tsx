import React from "react";
import { isFragment } from "react-is";

export const traverseReactNode = (
  children: React.ReactNode,
  callback: (child: React.ReactNode, index: number) => void
) => {
  const handle = (target: React.ReactNode) => {
    let i = 0;
    React.Children.forEach(target, (child) => {
      if (isFragment(child)) {
        handle(child.props.children);
      } else {
        callback(child, i);
        i++;
      }
      // 递归遍历
    });
  };

  handle(children);
};
