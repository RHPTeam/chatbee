<template>
  <div class="loading">
    <!--  Loading Main-->
    <div class="loading--main">
      <!-- Clock -->
      <div class="loading--main-clock">
        <div class="center"></div>
        <div class="hand hour-hand"></div>
        <div class="hand minute-hand"></div>
        <div class="hand second-hand"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="101.629"
          height="103.74"
          viewBox="0 0 101.629 103.74"
        >
          <g id="clock" transform="translate(101.761 -61.234)">
            <g
              id="Group_235"
              data-name="Group 235"
              transform="translate(-98.964 68.935)"
              opacity="0.2"
            >
              <circle
                id="Ellipse_834"
                data-name="Ellipse 834"
                cx="48.019"
                cy="48.019"
                r="48.019"
              />
            </g>
            <circle
              id="Ellipse_835"
              data-name="Ellipse 835"
              cx="48.019"
              cy="48.019"
              r="48.019"
              transform="translate(-98.964 64.038)"
              fill="#182632"
            />
            <circle
              id="Ellipse_836"
              data-name="Ellipse 836"
              cx="44.234"
              cy="44.234"
              r="44.234"
              transform="translate(-101.76 148.535) rotate(-80.68)"
              fill="#fff"
            />
            <rect
              id="Rectangle_1699"
              data-name="Rectangle 1699"
              width="1.661"
              height="9.219"
              transform="translate(-52.481 71.846)"
              fill="#182632"
            />
            <rect
              id="Rectangle_1700"
              data-name="Rectangle 1700"
              width="1.661"
              height="9.219"
              transform="translate(-52.481 142.801)"
              fill="#182632"
            />
            <rect
              id="Rectangle_1701"
              data-name="Rectangle 1701"
              width="9.219"
              height="1.661"
              transform="translate(-91.756 111.108)"
              fill="#182632"
            />
            <rect
              id="Rectangle_1702"
              data-name="Rectangle 1702"
              width="9.219"
              height="1.661"
              transform="translate(-20.789 111.108)"
              fill="#182632"
            />
            <rect
              id="Rectangle_1703"
              data-name="Rectangle 1703"
              width="9.219"
              height="1.661"
              transform="translate(-30.405 89.521) rotate(-45)"
              fill="#182632"
            />
            <rect
              id="Rectangle_1704"
              data-name="Rectangle 1704"
              width="9.219"
              height="1.661"
              transform="translate(-80.595 139.704) rotate(-45)"
              fill="#182632"
            />
            <rect
              id="Rectangle_1705"
              data-name="Rectangle 1705"
              width="1.661"
              height="9.219"
              transform="translate(-80.592 84.174) rotate(-45)"
              fill="#182632"
            />
            <rect
              id="Rectangle_1706"
              data-name="Rectangle 1706"
              width="1.661"
              height="9.219"
              transform="translate(-30.421 134.333) rotate(-45)"
              fill="#182632"
            />
            <circle
              data-v-2f394ea2=""
              id="Ellipse_837"
              data-name="Ellipse 837"
              cx="1.781"
              cy="1.781"
              r="2"
              transform="translate(-53.5 110)"
              fill="#182632"
            ></circle>
            <g
              id="Group_236"
              data-name="Group 236"
              transform="translate(-95.116 67.823)"
              opacity="0.2"
            >
              <path
                id="Path_1553"
                data-name="Path 1553"
                d="M141.886,104.964c0,.837,0,1.686-.075,2.5a44.234,44.234,0,0,0-88.331,0c0-.837,0-1.686,0-2.5a44.234,44.234,0,1,1,88.469,0Z"
                transform="translate(-53.48 -60.73)"
              />
            </g>
          </g>
        </svg>
      </div>
      <!-- End Clock -->

      <!-- Calendar -->
      <div class="loading--main-calendar">
        <div class="calendar--content">
          <div class="month">Tháng {{ new Date().getMonth() + 1 }}</div>
          <div class="date">{{ new Date().getDate() }}</div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70.531"
          height="83.659"
          viewBox="0 0 70.531 83.659"
        >
          <g id="calendar" transform="translate(-343.292 -254.43)">
            <rect
              id="Rectangle_1697"
              data-name="Rectangle 1697"
              width="70"
              height="56.277"
              transform="translate(343.293 281.812)"
              opacity="0.2"
            />
            <rect
              id="Rectangle_1698"
              data-name="Rectangle 1698"
              width="70.53"
              height="56.277"
              transform="translate(343.293 276.503)"
              fill="#fff"
            />
            <path
              id="Path_1547"
              data-name="Path 1547"
              d="M404.43,216.36V230.8h70.53V216.36Zm9.631,10.418a3.485,3.485,0,0,1-3.485-3.46h0a3.473,3.473,0,0,1,6.946,0h0a3.46,3.46,0,0,1-3.46,3.46Zm51.28,0a3.46,3.46,0,0,1-3.473-3.46h0a3.473,3.473,0,1,1,6.946,0h0a3.473,3.473,0,0,1-3.473,3.46Z"
              transform="translate(-61.137 45.877)"
              fill="#ffc15e"
            />
            <path
              id="Path_1548"
              data-name="Path 1548"
              d="M474.96,221.93v7.5H404.43v-7.5h6.146a3.473,3.473,0,0,0,6.946,0h44.347a3.473,3.473,0,1,0,6.946,0Z"
              transform="translate(-61.137 47.265)"
              fill="#ffb94a"
            />
            <path
              id="Path_1549"
              data-name="Path 1549"
              d="M411.6,210.11h1.949a1.249,1.249,0,0,1,1.249,1.249v13.329a.187.187,0,0,1-.187.187h-4.072a.187.187,0,0,1-.187-.187V211.359A1.249,1.249,0,0,1,411.6,210.11Z"
              transform="translate(-59.662 44.32)"
              fill="#fff"
            />
            <path
              id="Path_1550"
              data-name="Path 1550"
              d="M452.652,210.11h1.986a1.249,1.249,0,0,1,1.249,1.249v13.329a.187.187,0,0,1-.187.187h-4.072a.187.187,0,0,1-.187-.187V211.359A1.249,1.249,0,0,1,452.652,210.11Z"
              transform="translate(-49.422 44.32)"
              fill="#fff"
            />
          </g>
        </svg>
      </div>
      <!-- End Calendar -->

      <!-- Static BG -->
      <div class="loading--main-static">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="240"
          height="270"
          viewBox="0 0 516.003 579.748"
        >
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="0.5"
              y1="-1.677"
              x2="0.5"
              y2="1.145"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#ffb94a" />
              <stop offset="0.22" stop-color="#ffb94a" stop-opacity="0.761" />
              <stop offset="0.6" stop-color="#ffb94a" stop-opacity="0.361" />
              <stop offset="0.87" stop-color="#ffb94a" stop-opacity="0.102" />
              <stop offset="1" stop-color="#ffb94a" stop-opacity="0.102" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="0.836"
              y1="0.94"
              x2="-0.327"
              y2="-0.584"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#2f3136" />
              <stop offset="1" stop-color="#666" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-3"
              x1="1.165"
              y1="1.193"
              x2="-0.55"
              y2="-0.419"
              xlink:href="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-4"
              x1="0.501"
              y1="1.488"
              x2="0.501"
              y2="0.153"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#fff" />
              <stop offset="0.22" stop-color="#fff" stop-opacity="0.761" />
              <stop offset="0.6" stop-color="#fff" stop-opacity="0.361" />
              <stop offset="0.87" stop-color="#fff" stop-opacity="0.102" />
              <stop offset="1" stop-color="#fff" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g id="loading" transform="translate(101.761 -35.982)">
            <path
              id="Intersection_3"
              data-name="Intersection 3"
              d="M-12314.812,1900.428a206.433,206.433,0,0,1,44.736-225.039c80.593-80.593,211.258-80.593,291.851,0a206.433,206.433,0,0,1,44.736,225.039Z"
              transform="translate(12273.118 -1497.198)"
              opacity="0.8"
              fill="url(#linear-gradient)"
            />
            <!-- <path id="Path_1578" data-name="Path 1578" d="M0,0H516V212H0Z" transform="translate(-101.758 403.73)" fill="#ffb94a"/> -->
            <g id="computer">
              <path
                id="Path_1458"
                data-name="Path 1458"
                d="M475.4,364.267c0,7.333-81.91,13.279-182.946,13.279S109.5,371.6,109.5,364.267,191.41,351,292.509,351,475.4,356.934,475.4,364.267Z"
                transform="translate(-134.636 79.43)"
                opacity="0.15"
              />
              <path
                id="Path_1459"
                data-name="Path 1459"
                d="M143.983,141H422.818a17.489,17.489,0,0,1,17.489,17.489V327.132H125.22V159.738A18.738,18.738,0,0,1,143.983,141Z"
                transform="translate(-130.718 27.097)"
                fill="#27292d"
              />
              <path
                id="Path_1460"
                data-name="Path 1460"
                d="M412.08,318.335H153.495A28.245,28.245,0,0,1,125.25,290.09H440.337a28.245,28.245,0,0,1-28.257,28.245Z"
                transform="translate(-130.711 64.251)"
                fill="#f7f7f7"
              />
              <rect
                id="Rectangle_1691"
                data-name="Rectangle 1691"
                width="57.176"
                height="47.582"
                transform="translate(123.27 382.586)"
                fill="#e1e1e1"
              />
              <rect
                id="Rectangle_1692"
                data-name="Rectangle 1692"
                width="57.176"
                height="15.078"
                transform="translate(123.27 382.586)"
                fill="#bbb"
              />
              <path
                id="Path_1461"
                data-name="Path 1461"
                d="M213.26,350.79h102.21a14.991,14.991,0,0,1,14.99,14.991v3.11H198.27V365.78a14.99,14.99,0,0,1,14.99-14.99Z"
                transform="translate(-112.514 79.378)"
                fill="#fff"
              />
              <path
                id="Path_1462"
                data-name="Path 1462"
                d="M140.734,151.89a5,5,0,0,0-4.934,5v3.548L304.892,306.592h28.944l-178.9-154.7Z"
                transform="translate(-128.082 29.811)"
                fill="#2f3136"
              />
              <path
                id="Path_1463"
                data-name="Path 1463"
                d="M135.8,208.467v87.245a5,5,0,0,0,4.934,4.934H280.371L135.8,175.65Z"
                transform="translate(-128.082 35.732)"
                fill="#2f3136"
              />
              <path
                id="Path_1464"
                data-name="Path 1464"
                d="M401.277,151.89H207.5L386.4,306.567h14.878a5,5,0,0,0,4.934-4.934V156.824a5,5,0,0,0-4.934-4.934Z"
                transform="translate(-110.214 29.811)"
                fill="#2f3136"
              />
              <path
                id="Path_1465"
                data-name="Path 1465"
                d="M208.583,151.89H151.12l178.9,154.677h70.43L221.55,151.89Z"
                transform="translate(-124.264 29.811)"
                opacity="0.57"
                fill="url(#linear-gradient-2)"
              />
              <path
                id="Path_1466"
                data-name="Path 1466"
                d="M135.79,179.879l144.583,125h24.522L135.79,158.68Z"
                transform="translate(-128.084 31.503)"
                opacity="0.57"
                fill="url(#linear-gradient-3)"
              />
              <path
                id="Path_1467"
                data-name="Path 1467"
                d="M260.974,302.417a8.907,8.907,0,1,1-8.907-8.907A8.907,8.907,0,0,1,260.974,302.417Z"
                transform="translate(-101.327 65.104)"
                fill="#bbb"
              />
              <path
                id="Path_1468"
                data-name="Path 1468"
                d="M238.633,185.885c-19.588,40.087-4.8,72.042-4.8,72.042l-20.05,1.749-13.067,1.149c-15.053-63.709,45.471-106.595,45.9-106.895-31.08,38.925-25.659,77.263-25.659,77.263C220.582,211.881,238.358,186.284,238.633,185.885Z"
                transform="translate(-112.503 30.319)"
                fill="#fff"
              />
              <path
                id="Path_1469"
                data-name="Path 1469"
                d="M213.786,259.675l-13.067,1.149c-15.053-63.709,45.471-106.595,45.9-106.895-.312.337-39.975,43.9-40.4,73.7C205.941,244.885,210.151,254.566,213.786,259.675Z"
                transform="translate(-112.503 30.319)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1470"
                data-name="Path 1470"
                d="M398.73,276.1a25.757,25.757,0,0,0-7.4,1.087A32.68,32.68,0,0,0,370.8,258.932l-.587-.175-.337-.1a33.142,33.142,0,0,0-8.47-1.1,32.337,32.337,0,0,0-4.822.35,20.112,20.112,0,0,0-18.064-11.243,19.578,19.578,0,0,0-3.223.262,20.137,20.137,0,0,0-12.617,7.5,34.7,34.7,0,0,0-8.27-1h-1.087a34.728,34.728,0,0,0-58.475,4.122,34.086,34.086,0,0,0-6.833-2.786,32.472,32.472,0,0,0-4.135-.924,34.853,34.853,0,0,0-17.277,1.611c-.874.312-1.736.662-2.573,1.049A34.765,34.765,0,0,0,213.948,244.1a34.162,34.162,0,0,0-4.06-2.7v-.162a34.427,34.427,0,0,0-1.462-9.994h0a1.936,1.936,0,0,1-.087-.287h0a34.665,34.665,0,0,0-28.295-24.06h0a34.728,34.728,0,0,0-19.45,2.873,24.534,24.534,0,0,0-12.242-6.946c.525-.887,1.024-1.8,1.462-2.736.225-.475.425-.949.625-1.424s.262-.65.387-.974.35-.987.512-1.487c.1-.312.187-.612.275-.937a31.23,31.23,0,0,0-2.274-22.935l-.225-.425h0l-.562-1-.287-.487-.612-.962a30.893,30.893,0,0,0-3.947-4.872c-.375-.375-.762-.75-1.149-1.1h0a16.877,16.877,0,0,0,2.861-9.444,16.624,16.624,0,0,0-.125-2.1h-4.547a5,5,0,0,0-4.934,5V301.617a5,5,0,0,0,4.934,4.934h278.4a5,5,0,0,0,4.872-4.11v-4.135A25.5,25.5,0,0,0,398.73,276.1Z"
                transform="translate(-128.079 29.826)"
                fill="#fff"
              />
              <path
                id="Path_1471"
                data-name="Path 1471"
                d="M398.745,276.109a25.757,25.757,0,0,0-7.4,1.087,32.68,32.68,0,0,0-20.537-18.251c9.494,3,9.169,14.7.325,18.963a16.64,16.64,0,0,1-6.471,1.537c-15.078.637-17.489-5-17.489-5a21.586,21.586,0,0,1-18.463,15.315,36.752,36.752,0,0,1-15.94-1.537h0a29.581,29.581,0,0,1-11.243-6.421,44.647,44.647,0,0,1-34.466,10.556c-1.249-.15-2.5-.35-3.673-.55-19.9-3.623-22.186-14.128-22.186-14.128-4.222,7.283-12.792,12.155-26.6,9.282s-15.952-11.83-15.952-11.83c-6.059,9.831-24.31,11.505-29.744,0s0-19.837,0-19.837c-8.957.637-18.051-14.466-11.817-30.056a22.873,22.873,0,0,1,13.741-13.317h0c9.581-3.573,19.925-1.611,20.15-1.574a34.678,34.678,0,0,0-11.005-3.485h0a34.728,34.728,0,0,0-19.45,2.873,24.534,24.534,0,0,0-12.242-6.946c.525-.887,1.024-1.8,1.462-2.736.225-.475.425-.949.625-1.424s.262-.65.387-.974.35-.987.512-1.487c.1-.312.187-.612.275-.937a31.23,31.23,0,0,0-2.274-22.935l-.225-.425h0l-.562-1-.287-.487c-.2-.325-.4-.65-.612-.962a30.892,30.892,0,0,0-3.947-4.872l-1.149-1.112A16.877,16.877,0,0,0,145.356,154a16.612,16.612,0,0,0-.125-2.1h-4.547a5,5,0,0,0-4.934,5V301.63a5,5,0,0,0,4.934,4.934H419.157a5,5,0,0,0,4.872-4.11v-4.135a25.5,25.5,0,0,0-25.284-22.211Z"
                transform="translate(-128.094 29.814)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1472"
                data-name="Path 1472"
                d="M181.516,182.127a5.059,5.059,0,1,1-3.016-2.437A5.059,5.059,0,0,1,181.516,182.127Z"
                transform="translate(-119.058 36.688)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1473"
                data-name="Path 1473"
                d="M180.807,181.634a3.673,3.673,0,1,1-2.192-1.776A3.673,3.673,0,0,1,180.807,181.634Z"
                transform="translate(-118.586 36.743)"
                fill="#fff"
              />
              <path
                id="Path_1474"
                data-name="Path 1474"
                d="M257.5,212.907a3.185,3.185,0,1,1-4.31-1.249,3.185,3.185,0,0,1,4.31,1.249Z"
                transform="translate(-99.241 44.608)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1475"
                data-name="Path 1475"
                d="M257.056,212.6a2.311,2.311,0,1,1-3.135-.924A2.311,2.311,0,0,1,257.056,212.6Z"
                transform="translate(-98.946 44.64)"
                fill="#fff"
              />
              <path
                id="Path_1476"
                data-name="Path 1476"
                d="M207.717,174.708a1.7,1.7,0,1,1-2.3-.687,1.7,1.7,0,0,1,2.3.687Z"
                transform="translate(-110.955 35.275)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1477"
                data-name="Path 1477"
                d="M207.448,174.509a1.249,1.249,0,1,1-1.592-.348A1.249,1.249,0,0,1,207.448,174.509Z"
                transform="translate(-110.787 35.324)"
                fill="#fff"
              />
              <path
                id="Path_1478"
                data-name="Path 1478"
                d="M195.052,221.062l2.661-27.582-4.822,12.8,2.461-44.834-4.872,53.591,4.7-9.481Z"
                transform="translate(-114.455 32.193)"
                fill="#fff"
              />
              <path
                id="Path_1479"
                data-name="Path 1479"
                d="M227.43,234.056l19.9-19.275L235.35,221.4l30.943-32.542-38.438,37.651,9.719-4.185Z"
                transform="translate(-105.247 39.024)"
                fill="#fff"
              />
            </g>
            <g id="note">
              <rect
                id="Rectangle_1693"
                data-name="Rectangle 1693"
                width="31.278"
                height="33.134"
                transform="translate(225.934 346.103) rotate(0.17)"
                opacity="0.2"
              />
              <rect
                id="Rectangle_1694"
                data-name="Rectangle 1694"
                width="31.273"
                height="31.273"
                transform="translate(224.255 345.336) rotate(0.17)"
                fill="#ffcd7d"
              />
              <rect
                id="Rectangle_1695"
                data-name="Rectangle 1695"
                width="5.209"
                height="10.618"
                transform="matrix(1, -0.014, 0.014, 1, 236.935, 337.871)"
                fill="#fff"
                opacity="0.5"
              />
            </g>
            <g id="keyboard">
              <path
                id="Path_1480"
                data-name="Path 1480"
                d="M436.346,445.254H127.03l40.849-64.834H395.5Z"
                transform="translate(-130.267 86.762)"
                opacity="0.2"
              />
              <path
                id="Path_1481"
                data-name="Path 1481"
                d="M424.031,425.254H134.79l28.17-44.834h232.9Z"
                transform="translate(-128.333 86.762)"
                fill="#e1e1e1"
              />
              <rect
                id="Rectangle_1696"
                data-name="Rectangle 1696"
                width="289.229"
                height="10.156"
                transform="translate(6.457 512.016)"
                fill="#bbb"
              />
              <path
                id="Path_1482"
                data-name="Path 1482"
                d="M172.626,387.667H158.01l2.149-4.6H174.3Z"
                transform="translate(-122.547 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1483"
                data-name="Path 1483"
                d="M171.23,387.667l1.849-4.6H187.22l-1.374,4.6Z"
                transform="translate(-119.252 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1484"
                data-name="Path 1484"
                d="M184.44,387.667l1.561-4.6h14.141l-1.087,4.6Z"
                transform="translate(-115.96 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1485"
                data-name="Path 1485"
                d="M197.7,387.667l1.262-4.6h14.153l-.8,4.6Z"
                transform="translate(-112.656 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1486"
                data-name="Path 1486"
                d="M210.93,387.667l.962-4.6h14.154l-.5,4.6Z"
                transform="translate(-109.359 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1487"
                data-name="Path 1487"
                d="M224.16,387.667l.675-4.6h14.154l-.212,4.6Z"
                transform="translate(-106.062 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1488"
                data-name="Path 1488"
                d="M237.35,387.667l.387-4.6h14.154l.087,4.6Z"
                transform="translate(-102.775 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1489"
                data-name="Path 1489"
                d="M250.47,387.667l.075-4.6H264.7l.387,4.6Z"
                transform="translate(-99.505 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1490"
                data-name="Path 1490"
                d="M263.7,387.667l-.2-4.6h14.141l.675,4.6Z"
                transform="translate(-96.258 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1491"
                data-name="Path 1491"
                d="M276.99,387.667l-.5-4.6h14.154l.962,4.6Z"
                transform="translate(-93.021 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1492"
                data-name="Path 1492"
                d="M290.28,387.667l-.8-4.6h14.153l1.262,4.6Z"
                transform="translate(-89.784 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1493"
                data-name="Path 1493"
                d="M303.6,387.667l-1.087-4.6h14.141l1.562,4.6Z"
                transform="translate(-86.536 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1494"
                data-name="Path 1494"
                d="M316.864,387.667l-1.374-4.6h14.141l1.861,4.6Z"
                transform="translate(-83.302 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1495"
                data-name="Path 1495"
                d="M330.144,387.667H344.76l-2.136-4.6H328.47Z"
                transform="translate(-80.067 87.422)"
                fill="#fff"
              />
              <path
                id="Path_1496"
                data-name="Path 1496"
                d="M170.3,394.582H155.15l2.224-4.772h14.678Z"
                transform="translate(-123.259 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1497"
                data-name="Path 1497"
                d="M168.85,394.582l1.924-4.772h14.666L184,394.582Z"
                transform="translate(-119.845 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1498"
                data-name="Path 1498"
                d="M182.55,394.582l1.611-4.772H198.84l-1.124,4.772Z"
                transform="translate(-116.431 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1499"
                data-name="Path 1499"
                d="M196.3,394.582l1.312-4.772h14.666l-.824,4.772Z"
                transform="translate(-113.005 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1500"
                data-name="Path 1500"
                d="M210.02,394.582l1-4.772h14.666l-.512,4.772Z"
                transform="translate(-109.586 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1501"
                data-name="Path 1501"
                d="M223.73,394.582l.7-4.772H239.1l-.212,4.772Z"
                transform="translate(-106.169 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1502"
                data-name="Path 1502"
                d="M237.41,394.582l.4-4.772h14.666l.087,4.772Z"
                transform="translate(-102.76 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1503"
                data-name="Path 1503"
                d="M251.01,394.582l.087-4.772h14.666l.4,4.772Z"
                transform="translate(-99.371 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1504"
                data-name="Path 1504"
                d="M264.735,394.582l-.225-4.772h14.678l.7,4.772Z"
                transform="translate(-96.006 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1505"
                data-name="Path 1505"
                d="M278.5,394.582l-.512-4.772h14.666l1,4.772Z"
                transform="translate(-92.647 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1506"
                data-name="Path 1506"
                d="M292.284,394.582l-.824-4.772h14.666l1.312,4.772Z"
                transform="translate(-89.29 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1507"
                data-name="Path 1507"
                d="M306.084,394.582l-1.124-4.772h14.666l1.624,4.772Z"
                transform="translate(-85.926 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1508"
                data-name="Path 1508"
                d="M319.844,394.582l-1.424-4.772h14.666l1.924,4.772Z"
                transform="translate(-82.572 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1509"
                data-name="Path 1509"
                d="M333.619,394.582h15.153l-2.224-4.772H331.87Z"
                transform="translate(-79.22 89.102)"
                fill="#fff"
              />
              <path
                id="Path_1510"
                data-name="Path 1510"
                d="M168.213,401.359h-15.6l2.286-4.909h15.115Z"
                transform="translate(-123.892 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1511"
                data-name="Path 1511"
                d="M166.72,401.359l1.974-4.909h15.115l-1.474,4.909Z"
                transform="translate(-120.376 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1512"
                data-name="Path 1512"
                d="M180.83,401.359l1.661-4.909h15.115l-1.162,4.909Z"
                transform="translate(-116.86 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1513"
                data-name="Path 1513"
                d="M194.99,401.359l1.349-4.909h15.115l-.849,4.909Z"
                transform="translate(-113.331 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1514"
                data-name="Path 1514"
                d="M209.12,401.359l1.024-4.909H225.26l-.537,4.909Z"
                transform="translate(-109.81 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1515"
                data-name="Path 1515"
                d="M223.25,401.359l.712-4.909h15.115l-.225,4.909Z"
                transform="translate(-106.289 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1516"
                data-name="Path 1516"
                d="M237.34,401.359l.4-4.909h15.115l.087,4.909Z"
                transform="translate(-102.777 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1517"
                data-name="Path 1517"
                d="M251.34,401.359l.087-4.909h15.115l.4,4.909Z"
                transform="translate(-99.288 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1518"
                data-name="Path 1518"
                d="M265.475,401.359l-.225-4.909h15.115l.712,4.909Z"
                transform="translate(-95.822 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1519"
                data-name="Path 1519"
                d="M279.667,401.359l-.537-4.909h15.1l1.037,4.909Z"
                transform="translate(-92.363 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1520"
                data-name="Path 1520"
                d="M293.849,401.359,293,396.45h15.115l1.349,4.909Z"
                transform="translate(-88.906 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1521"
                data-name="Path 1521"
                d="M308.072,401.359l-1.162-4.909h15.1l1.661,4.909Z"
                transform="translate(-85.44 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1522"
                data-name="Path 1522"
                d="M322.244,401.359l-1.474-4.909h15.115l1.974,4.909Z"
                transform="translate(-81.986 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1523"
                data-name="Path 1523"
                d="M336.416,401.359h15.615l-2.286-4.909H334.63Z"
                transform="translate(-78.532 90.757)"
                fill="#fff"
              />
              <path
                id="Path_1524"
                data-name="Path 1524"
                d="M165.29,408.282H149.15l2.361-5.072h15.64Z"
                transform="translate(-124.755 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1525"
                data-name="Path 1525"
                d="M163.75,408.282l2.036-5.072h15.64l-1.524,5.072Z"
                transform="translate(-121.116 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1526"
                data-name="Path 1526"
                d="M178.35,408.282l1.711-5.072H195.7l-1.2,5.072Z"
                transform="translate(-117.478 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1527"
                data-name="Path 1527"
                d="M193,408.282l1.4-5.072h15.628l-.874,5.072Z"
                transform="translate(-113.827 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1528"
                data-name="Path 1528"
                d="M207.62,408.282l1.062-5.072h15.64l-.55,5.072Z"
                transform="translate(-110.184 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1529"
                data-name="Path 1529"
                d="M292.171,403.21H222.977l-.737,5.072h70.68Z"
                transform="translate(-106.54 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1530"
                data-name="Path 1530"
                d="M280.61,408.282l-.55-5.072H295.7l1.062,5.072Z"
                transform="translate(-92.131 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1531"
                data-name="Path 1531"
                d="M295.294,408.282l-.874-5.072h15.64l1.387,5.072Z"
                transform="translate(-88.553 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1532"
                data-name="Path 1532"
                d="M310.009,408.282l-1.2-5.072h15.64l1.711,5.072Z"
                transform="translate(-84.966 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1533"
                data-name="Path 1533"
                d="M324.687,408.282l-1.537-5.072h15.64l2.049,5.072Z"
                transform="translate(-81.393 92.441)"
                fill="#fff"
              />
              <path
                id="Path_1534"
                data-name="Path 1534"
                d="M339.349,408.282H355.5l-2.374-5.072H337.5Z"
                transform="translate(-77.817 92.441)"
                fill="#fff"
              />
            </g>
            <g id="mouse">
              <path
                id="Path_1535"
                data-name="Path 1535"
                d="M388.337,396.232c5.259-9.119,21.237-9.756,35.64-1.424s21.861,22.486,16.6,31.58-21.236,9.756-35.652,1.424S383.078,405.339,388.337,396.232Z"
                transform="translate(-65.569 88.889)"
                opacity="0.2"
              />
              <path
                id="Path_1536"
                data-name="Path 1536"
                d="M440.628,418.926h0a3.747,3.747,0,0,1-.475,1.249h0c-5.471,8.844-34.616,3.748-37.863-4.022-.275-.687-.562-1.312-.825-1.9-4.047-8.744-6.621-6.246-13.741-12.155a7.143,7.143,0,0,1-.824-.787l-.088-.1c-4-4.56.912-10.368.912-10.368l.9-.675h0a22.875,22.875,0,0,1,7.345-3.585,22.49,22.49,0,0,1,3.473-.674C420.254,383.561,442.54,409.932,440.628,418.926Z"
                transform="translate(-65.918 88.093)"
                fill="#fff"
              />
              <path
                id="Path_1537"
                data-name="Path 1537"
                d="M440.154,419.266c-5.472,8.844-34.616,3.748-37.863-4.022-.275-.687-.562-1.312-.825-1.9-4.072-8.645-6.833-6.021-13.741-12.155a10.69,10.69,0,0,1-.824-.787l-.087-.1c-4-4.56.912-10.368.912-10.368l.9-.675c-.575,1.674-1.137,5.472,3.473,9.169a15.851,15.851,0,0,0,3.6,2.074c1,.437,3.036,1.974,6.646,7.021,5.8,8.057,5,9.094,17.839,12.6C432.759,423.576,439.9,419.453,440.154,419.266Z"
                transform="translate(-65.918 88.965)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1538"
                data-name="Path 1538"
                d="M406.539,392.911c-7.5-6.159-12.729-6.4-12.729-6.4a22.482,22.482,0,0,1,3.473-.675,18.651,18.651,0,0,1,9.257,7.071Z"
                transform="translate(-63.784 88.113)"
                fill="#e1e1e1"
              />
            </g>
            <g id="cup">
              <path
                id="Path_1539"
                data-name="Path 1539"
                d="M143.355,387.5c0,3.748-20.35,6.8-45.446,6.8s-45.459-3.036-45.459-6.8,20.35-6.8,45.459-6.8S143.355,383.736,143.355,387.5Z"
                transform="translate(-148.853 86.832)"
                opacity="0.2"
              />
              <path
                id="Path_1540"
                data-name="Path 1540"
                d="M124.366,340.039a19.275,19.275,0,1,0-5.859,37.651h.587a19.275,19.275,0,0,0,5.272-37.6Zm-.175,27.907a11.243,11.243,0,1,1,5.4-9.631,11.243,11.243,0,0,1-5.4,9.631Z"
                transform="translate(-137.185 76.475)"
                fill="#fff"
              />
              <path
                id="Path_1541"
                data-name="Path 1541"
                d="M118.493,369.568a11.168,11.168,0,0,0,5.721-1.612c-.962,3.973-2.5,7.5-5.1,9.694h-.587a19.275,19.275,0,1,1,5.859-37.614c.3,2.086.737,5.534.974,9.556a11.243,11.243,0,1,0-6.871,19.987Z"
                transform="translate(-137.208 76.465)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1542"
                data-name="Path 1542"
                d="M130.416,333l.15,27.233a34.9,34.9,0,1,1-69.806.362l-.15-27.233Z"
                transform="translate(-146.819 74.945)"
                fill="#fff"
              />
              <path
                id="Path_1543"
                data-name="Path 1543"
                d="M118.492,388.154l-47.72.262a4.859,4.859,0,0,1-4.872-4.822h0a4.859,4.859,0,0,1,4.822-4.884l47.707-.25a4.86,4.86,0,0,1,4.884,4.822h0a4.859,4.859,0,0,1-4.822,4.872Z"
                transform="translate(-145.501 86.274)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1544"
                data-name="Path 1544"
                d="M123.21,381.779a34.977,34.977,0,0,1-8.744,7.982l-37.264.2a35.238,35.238,0,0,1-8.832-7.883,34.728,34.728,0,0,1-7.57-21.524l-.15-27.233,20.774-.112v7.27a41.524,41.524,0,0,0,41.748,41.3Z"
                transform="translate(-146.809 74.997)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1545"
                data-name="Path 1545"
                d="M79.689,343.862a17.027,17.027,0,0,1-5.671-17.152c2.324-11.343,11.668-13.017,9.007-30.705s-4.01-33.729,3.673-43.035h24.984s-8.744,23.735-2.748,39.787.712,22.611-4.61,31.617,2.686,19.475,2.686,19.475Z"
                transform="translate(-143.6 55.001)"
                fill="url(#linear-gradient-4)"
              />
            </g>

            <circle
              class="circle-transf"
              id="Ellipse_833"
              data-name="Ellipse 833"
              cx="14.778"
              cy="14.778"
              r="14.778"
              transform="translate(-65.61 192.519)"
              fill="#ffcd7d"
            />

            <path
              class="twinkle-transf"
              id="Path_1546"
              data-name="Path 1546"
              d="M420.124,310.6c-12.492,1.249-13.491,2.311-14.766,14.778-1.249-12.492-2.311-13.5-14.778-14.778,12.492-1.249,13.5-2.3,14.778-14.778C406.632,308.3,407.657,309.324,420.124,310.6Z"
              transform="translate(-64.589 65.679)"
              fill="#ffcd7d"
            />

            <g id="rocket" transform="translate(-73.983 35.982)">
              <!-- <rect id="Rectangle_1707" data-name="Rectangle 1707" width="1.069" height="16.814" transform="translate(39.007 76.224) rotate(90)" fill="#182632"/> -->
              <!-- <path id="Path_1554" data-name="Path 1554" d="M103.251,97.965H102.4V79.44h.855Z" transform="translate(-80.096 -21.376)" fill="#182632"/> -->
              <path
                id="Path_1555"
                data-name="Path 1555"
                d="M286.565,168.369c-12.242,5.309-20.624,7.283-42.8,23.91l-.137.112.087-.15c14.8-23.448,16.09-31.955,20.4-44.584s18.438-19.987,18.438-19.987l11.98,9.481h0l10.418,11.18S298.87,163.06,286.565,168.369Z"
                transform="translate(-26.514 -12.207)"
                fill="#f68e37"
              />
              <path
                id="Path_1556"
                data-name="Path 1556"
                d="M257,173.476a137.237,137.237,0,0,0,7.233-19.013c.612-1.9,1.249-3.873,1.924-5.9,2.274-6.658,11.518-14.99,15.3-17.576l7.62,7.021,7.82,7.22c-2.324,3.985-9.319,14.316-15.8,17.127-1.961.849-3.873,1.624-5.709,2.386A139.787,139.787,0,0,0,257,173.476Z"
                transform="translate(-23.182 -11.379)"
                fill="#f1bc03"
              />
              <path
                id="Path_1557"
                data-name="Path 1557"
                d="M264.64,162.571c1.249-2.961,2.323-5.746,3.385-8.495h0c.812-2.1,1.661-4.272,2.561-6.5,1.711-4.172,7.5-10.306,11.98-14.391l9.519,8.744c-3.86,5.384-9.194,11.58-12.967,13.491-2.136,1.074-4.247,2.1-6.246,3.086h0C270.174,159.8,267.488,161.1,264.64,162.571Z"
                transform="translate(-21.279 -10.831)"
                fill="#faf8a8"
              />
              <path
                id="Path_1558"
                data-name="Path 1558"
                d="M293.672,108.845a23.485,23.485,0,0,0-8.744,1.249c-14.666,4.8-29.369,20.949-29.369,20.949h0c-.225-.337-9.082-14.866.837-34.216,5.2-10.156,14.216-16.327,21.7-19.9a3.086,3.086,0,0,1,3.548.512,3.335,3.335,0,0,1,1.1,2.311,3.173,3.173,0,0,1-.887,2.286l21.674-6.983,16.24-5.284h0C312.4,88.458,293.672,108.845,293.672,108.845Z"
                transform="translate(-24.502 -26.636)"
                fill="#ffb94a"
              />
              <path
                id="Path_1559"
                data-name="Path 1559"
                d="M255.559,129.714c-.225-.337-9.082-14.866.837-34.216,5.2-10.156,14.216-16.327,21.7-19.9a3.086,3.086,0,0,1,3.548.512,3.335,3.335,0,0,1,1.1,2.311c-.262.737-.562,1.5-.887,2.286,0,0-15.765,8.744-22.611,24.509C252.511,120.732,255.459,129.452,255.559,129.714Z"
                transform="translate(-24.502 -25.269)"
                fill="#ffcd7d"
              />
              <path
                id="Path_1560"
                data-name="Path 1560"
                d="M287.044,108.845a23.485,23.485,0,0,0-8.744,1.249c3.373-13.317,11.318-25.784,18.6-35.04l16.24-5.284h0C305.77,88.458,287.044,108.845,287.044,108.845Z"
                transform="translate(-17.874 -26.636)"
                fill="#ff9e4a"
              />
              <path
                id="Path_1561"
                data-name="Path 1561"
                d="M322.26,137.451a23.51,23.51,0,0,1-.575,8.832c-3.61,14.99-18.526,30.955-18.526,30.955h0c.362.187,15.553,7.845,34.053-3.585,9.694-6.009,15.115-15.478,18.089-23.223a3.123,3.123,0,0,0-.8-3.51,3.373,3.373,0,0,0-2.4-.9,3.173,3.173,0,0,0-2.211,1.062l5.309-22.173,3.972-16.589h0C341.086,117.152,322.26,137.451,322.26,137.451Z"
                transform="translate(-11.679 -17.029)"
                fill="#ffb94a"
              />
              <path
                id="Path_1562"
                data-name="Path 1562"
                d="M303.16,169.718c.362.187,15.553,7.845,34.053-3.585,9.694-6.009,15.115-15.478,18.089-23.223a3.123,3.123,0,0,0-.8-3.51,3.373,3.373,0,0,0-2.4-.9c-.7.325-1.437.675-2.211,1.062,0,0-7.5,16.415-22.611,24.509C312.367,172.029,303.435,169.793,303.16,169.718Z"
                transform="translate(-11.679 -9.508)"
                fill="#ffcd7d"
              />
              <path
                id="Path_1563"
                data-name="Path 1563"
                d="M318.565,137.451a23.511,23.511,0,0,1-.575,8.832c13.042-4.447,24.834-13.354,33.516-21.374l3.973-16.589h0C337.39,117.152,318.565,137.451,318.565,137.451Z"
                transform="translate(-7.983 -17.029)"
                fill="#ff9e4a"
              />
              <path
                id="Path_1564"
                data-name="Path 1564"
                d="M364.919,128.018A169.985,169.985,0,0,1,352.1,140.86a100.666,100.666,0,0,1-14.316,10.356l-.562.325-9.656,5L316.9,162.084,296.563,172.7,273.69,151.6l1.012-2.4,7.907-18.738,4.672-11.08a135.654,135.654,0,0,1,24.572-38.55q.437-.487.9-.974a148.918,148.918,0,0,1,42-32.379c.924-.475,1.849-.937,2.773-1.374q3.3-1.574,6.446-2.861c.9-.375,1.8-.725,2.673-1.062l1.349-.512a114.445,114.445,0,0,1,15.515-4.485A92.982,92.982,0,0,1,396.5,35.277a5.609,5.609,0,0,1,6.246,5.746,104.558,104.558,0,0,1-4.2,28.894c-.137.512-.287,1.012-.437,1.524-.262.9-.55,1.811-.849,2.736q-1.037,3.235-2.336,6.646c-.35.924-.725,1.849-1.112,2.8a149.081,149.081,0,0,1-28.894,44.4Z"
                transform="translate(-19.023 -35.241)"
                fill="#fff"
              />
              <path
                id="Path_1566"
                data-name="Path 1566"
                d="M281.013,160.871a49.967,49.967,0,0,1-7.283-9.656l4.66-11.018,4.26-9.994,4.672-11.08a135.651,135.651,0,0,1,24.572-38.55q.437-.487.9-.974c19.425-21.062,39.213-32.254,55.24-38.188A114.448,114.448,0,0,1,383.5,36.8c.874,4.085,2.623,4.5-2.261,11.48,0,0-45.8,14.016-67.57,47.2-19.987,30.381-6.4,31.8-6.4,31.8l-19.463,24.884Z"
                transform="translate(-19.013 -34.852)"
                fill="#e1e1e1"
              />
              <path
                id="Path_1567"
                data-name="Path 1567"
                d="M276.148,161.367a1.811,1.811,0,0,1-2.049-.3,1.786,1.786,0,0,1-.462-2.024c11.418-28.957,49.219-59,65.084-70.68a1.831,1.831,0,0,1,2.648,2.436C331,107.564,304.106,147.651,276.148,161.367Z"
                transform="translate(-19.071 -22.094)"
                fill="#ffb94a"
              />
              <path
                id="Path_1568"
                data-name="Path 1568"
                d="M341.052,88.486,274.12,161.065a1.786,1.786,0,0,1-.462-2.024c11.418-28.957,49.219-59,65.084-70.68a1.811,1.811,0,0,1,2.311.125Z"
                transform="translate(-19.066 -22.092)"
                fill="#ff9e4a"
              />
              <path
                id="Path_1569"
                data-name="Path 1569"
                d="M357.967,88.38a17.414,17.414,0,1,1-.987-24.609A17.414,17.414,0,0,1,357.967,88.38Z"
                transform="translate(-5.549 -29.281)"
                fill="#27292d"
              />
              <path
                id="Path_1570"
                data-name="Path 1570"
                d="M354.554,85.19a1.175,1.175,0,0,1-.125.125,13.741,13.741,0,0,1-19.2.775l-.137-.125a13.772,13.772,0,1,1,19.463-.725Z"
                transform="translate(-4.823 -28.552)"
                fill="#525660"
              />
              <path
                id="Path_1571"
                data-name="Path 1571"
                d="M356.135,82.1a13.764,13.764,0,0,0-22.4-15.578c-.262.287-.5.562-.737.862a13.8,13.8,0,0,1,21.661,16.39,14.668,14.668,0,0,1-1.424,2.236,8.6,8.6,0,0,0,.675-.675,1.178,1.178,0,0,0,.125-.125A13.855,13.855,0,0,0,356.135,82.1Z"
                transform="translate(-4.243 -28.56)"
                fill="#4b4f57"
              />
              <path
                id="Path_1572"
                data-name="Path 1572"
                d="M353.147,70.13s.287,7.87-5.284,11.43c-6.109,3.91-11.243.737-14.7-4.872,0,0,.437,6.383,7.907,8.744C348.863,88.006,356.283,79.711,353.147,70.13Z"
                transform="translate(-4.203 -26.546)"
                fill="#737a8a"
              />
              <path
                id="Path_1573"
                data-name="Path 1573"
                d="M379.726,69.917A119.923,119.923,0,0,1,349.22,41.772a104.52,104.52,0,0,1,28.457-6.5,5.684,5.684,0,0,1,5.072,2.161A6,6,0,0,1,383.886,41a104.56,104.56,0,0,1-4.16,28.919Z"
                transform="translate(-0.201 -35.239)"
                fill="#ffb94a"
              />
              <path
                id="Path_1574"
                data-name="Path 1574"
                d="M376.177,47.223c.087-1.162.275-1.949.487-3.748.325-2.8-.2-3.96-2.1-3.935-3.46.075-7.045,14.241-3.136,19.5C374.465,63.125,375.752,52.257,376.177,47.223Z"
                transform="translate(4.91 -34.169)"
                fill="#ffcd7d"
              />
              <path
                id="Path_1575"
                data-name="Path 1575"
                d="M379.726,69.917A119.923,119.923,0,0,1,349.22,41.772a104.52,104.52,0,0,1,28.457-6.5,5.684,5.684,0,0,1,5.072,2.161c-1.249,0-9.994,0-14.728,5.184C362.861,48.23,365.56,59.761,379.726,69.917Z"
                transform="translate(-0.201 -35.239)"
                opacity="0.2"
              />
              <!-- <path id="Path_1576" data-name="Path 1576" d="M.57,22.8H0V0H.57Z" transform="translate(0 76.895) rotate(-90)" fill="#dc3645"/> -->
              <!-- <circle id="Ellipse_837" data-name="Ellipse 837" cx="1.781" cy="1.781" r="1.781" transform="translate(20.875 74.99)" fill="#182632"/> -->
            </g>
          </g>
        </svg>
      </div>
      <!-- End Static BG -->
    </div>
    <!-- End Loading Main -->

    <div class="bg-white"></div>

    <!-- Loading Progress Bar -->
    <div class="loading--progressbar m_auto">
      <div class="loading--progressbar-block my_auto">
        <span data-text="Đang tải dữ liệu ..." class="block--text"
          >Đang tải dữ liệu ...</span
        >
        <div class="block--bg"></div>
      </div>
    </div>
    <!-- End Loading Progress Bar -->
  </div>
</template>

<script>
export default {
  mounted() {
    const secondHand = document.querySelector(".second-hand");
    const minuteHand = document.querySelector(".minute-hand");
    const hourHand = document.querySelector(".hour-hand");

    function setDate() {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = (seconds / 60) * 360 + 90;
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

      const minutes = now.getMinutes();
      const minutesDegrees = (minutes / 60) * 360 + 90;
      minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

      const hours = now.getHours();
      const hoursDegrees = (hours / 12) * 360 + 90;
      hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

      console.log("mobile");
    }

    setInterval(setDate, 1000);
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffb94a;
  opacity: 1;
  color: #fff;
  z-index: 90;

  .bg-white {
    width: 100%;
    height: 50%;
    background-color: #fff;
  }

  &--main {
    &-clock {
      position: absolute;
      z-index: 100;
      left: 16%;
      top: 15%;

      .center {
        height: 4px;
        width: 4px;
        position: absolute;
        left: -2px;
        right: 0;
        top: -3px;
        bottom: 0;
        margin: auto;
        background: black;
        border-radius: 100%;
        z-index: 100;
      }
      .hand {
        height: 1.5px;
        width: 22%;
        position: absolute;
        top: 48%;
        left: 27%;
        background-color: black;
        transform-origin: 100%;
        transform: rotate(90deg);
        transition: all 0.05s;
        transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);

        & + .minute-hand {
          height: 1px;
          width: 26%;
          position: absolute;
          top: 48%;
          left: 23%;
        }

        & + .second-hand {
          width: 30%;
          height: 0.5px;
          background-color: red;
          position: absolute;
          top: 48%;
          left: 19%;
        }
      }
    }

    &-calendar {
      position: absolute;
      z-index: 100;
      right: 11%;
      top: 40%;

      .calendar--content {
        color: #444;
        position: absolute;

        .date {
          font-size: 30px;
          font-weight: 700;
          position: absolute;
          width: 70px;
          top: 36px;
        }

        .month {
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          width: 70px;
          top: 25px;
        }
      }
    }

    &-static {
      position: absolute;
      z-index: 99;
      left: 50%;
      margin-left: -120px;
      top: 27%;

      svg {
        .circle-transf {
          animation: twinkle 1s infinite linear;
        }

        .twinkle-transf {
          animation-name: twinkle;
          animation-duration: 1s;
          animation-iteration-count: infinite;
        }

        @keyframes arctransf {
          50% {
            opacity: 0.5;
          }
        }

        @keyframes twinkle {
          50% {
            // transform: scale(0.5);
            opacity: 0.5;
          }
        }
      }
    }
  }

  &--progressbar {
    display: flex;
    justify-content: center;
    margin-top: 8rem !important;
    width: 240px;
    height: 36px;
    font-size: 12px;
    font-weight: 600;
    color: #ffb94a;
    border-radius: 10px;
    background-color: #ffffff;

    &-block {
      position: relative;
      width: 230px;
      /* height: 32px; */
      padding: 5px;
      border-radius: 7px;

      .block--text {
        position: relative;
        color: #ffb94a;
        z-index: 100;

        &::before {
          content: attr(data-text);
          position: absolute;
          overflow: hidden;
          max-width: 10em;
          white-space: nowrap;
          color: #fff;
          // animation: textloading 3s linear;
        }
      }

      .block--bg {
        position: absolute;
        width: 230px;
        height: 28px;
        border-radius: 7px;
        top: 0;
        left: 0;
        background: #ffb94a;
        z-index: 99;
        animation: bgloading 5s linear;
      }

      @keyframes textloading {
        0% {
          max-width: 0;
        }
      }

      @keyframes bgloading {
        0% {
          width: 0;
        }
      }
    }
  }
}
</style>
