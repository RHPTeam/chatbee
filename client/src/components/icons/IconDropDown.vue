<template>
  <g>
    <path
      d="M12,24 C18.627417,24 24,18.627417 24,12 C24,5.372583 18.627417,0 12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 Z"
      id="path-1"
    ></path>
    <filter
      x="-50%"
      y="-50%"
      width="200%"
      height="200%"
      filterUnits="objectBoundingBox"
      id="filter-2"
    >
      <feOffset
        dx="0"
        dy="2"
        in="SourceAlpha"
        result="shadowOffsetOuter1"
      ></feOffset>
      <feGaussianBlur
        stdDeviation="2"
        in="shadowOffsetOuter1"
        result="shadowBlurOuter1"
      ></feGaussianBlur>
      <feColorMatrix
        values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0"
        type="matrix"
        in="shadowBlurOuter1"
      ></feColorMatrix>
    </filter>
    <g
      id="Symbols"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="ic_dropdown">
        <g id="ic_dropdown_white">
          <g>
            <g id="Oval-1" opacity="0">
              <use
                fill="black"
                fill-opacity="1"
                filter="url(#filter-2)"
                xlink:href="#path-1"
              ></use>
              <use
                fill="#000000"
                fill-rule="evenodd"
                xlink:href="#path-1"
              ></use>
            </g>
            <polyline
              id="Path-2641"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              points="8 11 12 15 16 11"
            ></polyline>
          </g>
        </g>
      </g>
    </g>
  </g>
</template>
