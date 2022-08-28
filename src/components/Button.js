import PropTypes from "prop-types";

const Button = ({ img, imgWidth, color, text, width, height, border }) => {
  const borderStyle = border ? border : "none";
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    backgroundColor: color,
    padding: `${height}px ${width}px`,
    color: "white",
    fontWeight: "bold",
    borderRadius: "5px",
    border: borderStyle,
  };
  if (img)
    return (
      <button style={style}>
        <img style={{ width: `${imgWidth}px` }} src={img} alt={img}></img>{" "}
        {text}
      </button>
    );
  return <button style={style}>{text}</button>;
};

Button.defaultProps = {
  color: "#4372F1",
  width: "100px",
  height: "20px",
};

Button.propTypes = {
  img: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Button;
