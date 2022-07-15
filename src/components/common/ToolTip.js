import React from 'react';
import ReactTooltip from 'react-tooltip';

const ToolTip = ({ id, place, title }) => {
  return (
    <ReactTooltip id={id} place={place} effect="solid">
      <p className="-my-1 -mx-2"> {title}</p>
    </ReactTooltip>
  );
};

export default ToolTip;
