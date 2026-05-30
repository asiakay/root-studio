import type { Service, Step } from '../types';

export const SERVICES: Service[] = [
  {
    icon: '🌐',
    name: 'Web',
    description:
      'Your site should do work for you. We design, build, or refresh sites that are clear, fast, and built to last — no drag-and-drop bloat.',
    price: 'Starting at $350',
  },
  {
    icon: '✦',
    name: 'Brand',
    description:
      'Identity, visual direction, and messaging that actually reflects what you do and who you serve — not a template someone else filled in.',
    price: '$200 – $600',
  },
  {
    icon: '◎',
    name: 'Strategy',
    description:
      'Positioning, launch planning, and structure to get your idea off the ground or your existing work organized for the next stage.',
    price: '$150 – $400',
  },
];

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Inquire',
    description:
      'Tell us what you\'re building and where you\'re stuck — a short message, no deck required.',
  },
  {
    number: '02',
    title: 'Scope',
    description:
      'One focused conversation, clear deliverables, and a flat-price proposal — no surprises.',
  },
  {
    number: '03',
    title: 'Build & deliver',
    description:
      'We do the work, keep you in the loop, and hand off something you can use on day one.',
  },
];

export const INQUIRY_EMAIL = 'hello@rootstudio.co';
