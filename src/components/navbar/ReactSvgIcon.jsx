import React from 'react';
import { AnimateKeyframes } from "react-simple-animate";

const ReactSvgIcon = ({ text, icon, iconClass }) => {
  const appHeader = {
    backgroundColor: '#222',
    height: '50px',
    width: 'auto',
    color: 'red',
  };

  const left = { display: 'inline', textAlign: 'left' };
  const middle = { display: 'inline', textAlign: 'center' };
  const right = { display: 'inline', textAlign: 'right' };

  return (
    <div style={appHeader}>
      <div style={left}>
        <AnimateKeyframes
          play
          iterationCount="infinite"
          direction="alternate"
          durationSeconds={10}
          playState="running"
          keyframes={[
            "transform: rotateX(0) rotateY(0) rotateZ(0)",
            "transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg)"
          ]}
          render={({ style }) => {
            return (<img style={{
              ...style,
              width: 50
            }} src="/assets/images/logo.svg" alt="reactLogo"
            />);
          }}
        />
      </div>
      <div style={middle}>{text}</div>
      <div style={right}>
        <img
          src={icon}
          alt={iconClass}
          className={iconClass}
        />
      </div>
    </div>
  );
};

export default ReactSvgIcon;
