import React from 'react';

export default function App() {
  const center = 200;

  const generateShapes = ({ count, radius, shapeFn }) =>
    [...Array(count)].map((_, i) => {
      const angle = (360 / count) * i;
      return shapeFn(i, angle, radius);
    });

  const triangle = (i, angle, radius, color) => {
    const size = 35;
    const points = [
      [center, center - radius],
      [center - size, center - radius + size],
      [center + size, center - radius + size],
    ]
      .map(([x, y]) => `${x},${y}`)
      .join(' ');
    return (
      <polygon
        key={i}
        points={points}
        fill={color}
        transform={`rotate(${angle} ${center} ${center})`}
      />
    );
  };

  const petal = (i, angle, radius, rx, ry, color) => (
    <ellipse
      key={i}
      cx={center}
      cy={center - radius}
      rx={rx}
      ry={ry}
      fill={color}
      transform={`rotate(${angle} ${center} ${center})`}
    />
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-transparent flex flex-col lg:flex-row items-center justify-between">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 leading-snug">
          Glocotrack <br />
          <span className="text-purple-700">Redefining the way you monitor</span>
        </h1>
      </div>

      {/* Mandala Section */}
      <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-full flex items-center justify-center">
        <div className="absolute bottom-0 lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:translate-x-1/2 w-[180vh] h-[180vh] pointer-events-none z-0">
          <svg viewBox="0 0 400 400" className="w-full h-full rotate-90">
            {/* Layer 1 */}
            <g className="fade-in-spin delay-1">
              {generateShapes({
                count: 30,
                radius: 110,
                shapeFn: (i, angle, r) => (
                  <circle
                    key={i}
                    cx={center}
                    cy={center - r}
                    r={6}
                    fill="#6B21A8"
                    transform={`rotate(${angle} ${center} ${center})`}
                  />
                ),
              })}
            </g>

            {/* Layer 2 */}
            <g className="fade-in-spin delay-2">
              {generateShapes({
                count: 20,
                radius: 70,
                shapeFn: (i, angle, r) =>
                  petal(i, angle, r, 8, 30, '#7E22CE'),
              })}
            </g>

            {/* Layer 3 */}
            <g className="fade-in-spin delay-3">
              {generateShapes({
                count: 16,
                radius: 70,
                shapeFn: (i, angle, r) =>
                  triangle(i, angle, r, '#9333EA'),
              })}
            </g>

            {/* Layer 4 */}
            <g className="fade-in-spin delay-4">
              {generateShapes({
                count: 12,
                radius: 38,
                shapeFn: (i, angle, r) =>
                  petal(i, angle, r, 10, 22, '#A855F7'),
              })}
            </g>

            {/* Layer 5 */}
            <g className="fade-in-spin delay-5">
              {generateShapes({
                count: 8,
                radius: 20,
                shapeFn: (i, angle, r) => (
                  <circle
                    key={i}
                    cx={center}
                    cy={center - r}
                    r={10}
                    fill="#C084FC"
                    transform={`rotate(${angle} ${center} ${center})`}
                  />
                ),
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .fade-in-spin {
            animation: fadeIn 0.6s ease-out forwards, spin 35s linear infinite;
            transform-origin: center;
            opacity: 0;
          }

          .delay-1 { animation-delay: 0s, 0s; }
          .delay-2 { animation-delay: 0.3s, 0s; }
          .delay-3 { animation-delay: 0.6s, 0s; }
          .delay-4 { animation-delay: 0.9s, 0s; }
          .delay-5 { animation-delay: 1.2s, 0s; }
        `}
      </style>
    </div>
  );
}
