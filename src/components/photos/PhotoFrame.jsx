import React from 'react';

const PhotoFrame = ({ defaultImage, children }) => {
  return (
    <table
      className="photo-frame"
      style={{
        minHeight: "200px",
        backgroundImage: defaultImage ? 'url("/images/default-image.png")' : undefined,
        backgroundPosition: defaultImage ? 'center' : undefined
      }}>
      <tbody>
        <tr>
          <td className="topx--" />
          <td className="top-x-" />
          <td className="top--x" />
        </tr>
        <tr>
          <td className="midx--" />
          <td>
            {children}
          </td>
          <td className="mid--x" />
        </tr>
        <tr>
          <td className="botx--" />
          <td className="bot-x-" />
          <td className="bot--x" />
        </tr>
      </tbody>
    </table>
  );
};

export default PhotoFrame;
