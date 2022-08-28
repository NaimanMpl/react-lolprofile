import { useState } from "react"

const Title = ({ text, color, hoverColor }) => {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  return (
    <div style={{ cursor: 'pointer' }} onMouseOver={ handleMouseOver } onMouseOut={ handleMouseOut }>
      <h4 style={{ color: color }}>{text}</h4>
      {isHovering && <hr style={
        { 
          height: '2px', 
          border: 'none',
          marginTop: '7px',
          backgroundColor: hoverColor
        }}></hr>}
    </div>
  )
}

Title.defaultProps = {
  color: 'white',
  hoverColor: '#4372F1'
}

export default Title;