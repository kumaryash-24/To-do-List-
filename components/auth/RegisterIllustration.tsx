import React from 'react';
import { motion } from 'framer-motion';

const Node = ({ cx, cy, delay }: { cx: number, cy: number, delay: number }) => (
  <motion.circle
    cx={cx}
    cy={cy}
    r="10"
    fill="url(#reg-grad)"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1.2, 1], opacity: 1 }}
    transition={{ duration: 0.5, delay: delay, ease: 'easeOut' }}
  >
    <animate
      attributeName="r"
      values="10;12;10"
      dur="3s"
      repeatCount="indefinite"
      begin={`${delay}s`}
    />
  </motion.circle>
);

const Line = ({ x1, y1, x2, y2, delay }: { x1: number, y1: number, x2: number, y2: number, delay: number }) => (
    <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="url(#reg-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay, ease: 'easeInOut' }}
    />
);

const RegisterIllustration: React.FC = () => {
    const nodes = [
        { cx: 150, cy: 150, delay: 0.1 },
        { cx: 350, cy: 120, delay: 0.2 },
        { cx: 250, cy: 250, delay: 0.3 },
        { cx: 180, cy: 350, delay: 0.4 },
        { cx: 380, cy: 380, delay: 0.5 },
        { cx: 300, cy: 220, delay: 0.6 },
    ];
    const lines = [
        { from: 0, to: 2, delay: 0.6 },
        { from: 0, to: 3, delay: 0.7 },
        { from: 1, to: 5, delay: 0.8 },
        { from: 1, to: 2, delay: 0.9 },
        { from: 2, to: 3, delay: 1.0 },
        { from: 2, to: 5, delay: 1.1 },
        { from: 3, to: 4, delay: 1.2 },
        { from: 5, to: 4, delay: 1.3 },
    ];

    return (
        <svg width="100%" height="100%" viewBox="0 0 500 500" className="w-full h-auto max-w-sm md:max-w-md">
            <defs>
                <linearGradient id="reg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
            </defs>
            <g>
                {lines.map((line, i) => (
                    <Line key={i} x1={nodes[line.from].cx} y1={nodes[line.from].cy} x2={nodes[line.to].cx} y2={nodes[line.to].cy} delay={line.delay} />
                ))}
                {nodes.map((node, i) => (
                    <Node key={i} {...node} />
                ))}
            </g>
        </svg>
    );
};

export default RegisterIllustration;