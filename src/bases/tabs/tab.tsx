import "./styles/index.scss";

export interface TabProps {
  title: string;
  children?: React.ReactNode;
  name: string | number;
}

const Tab = ({ name, title, children }: TabProps) => {
  return children ? children : null;
};

export default Tab;
