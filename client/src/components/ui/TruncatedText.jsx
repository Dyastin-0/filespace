import Tooltip from "./Tooltip";

const TruncatedText = ({ text, tooltip = true }) => {
  return tooltip ? (
    <Tooltip text={text}>
      <span className="block truncate">{text}</span>
    </Tooltip>
  ) : (
    <span className="block truncate">{text}</span>
  );
};

export default TruncatedText;
