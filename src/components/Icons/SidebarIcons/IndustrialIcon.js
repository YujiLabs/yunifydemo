import React from "react";

class IndustrialIcon extends React.Component {
  render() {
    return (
      <svg
        className={this.props.className}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 15H2V5h3v10zm4-6h3v6H9v-6zm6-2h3v8h-3v-8zm-6 8v-3h3v3H9zm-7 2h16v2H2v-2z"
        />
        <mask
          id="industrial"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="2"
          y="5"
          width="16"
          height="10"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 15H2V5h3v10zm4-6h3v6H9v-6zm6-2h3v8h-3v-8zm-6 8v-3h3v3H9zm-7 2h16v2H2v-2z"
          />
        </mask>
        <g mask="url(#industrial)">
          <rect width="20" height="20" />
        </g>
      </svg>
    );
  }
}

export default IndustrialIcon;
