export const site = {
  name: 'Sidecar',
  description:
    'Make your business easier to run. Practical workflows, connected systems, automation, and AI for established businesses.',
  email: 'brett@heysidecar.com',
  // Public form routing key, intended for browser use (not an account API token).
  challengeFormKey: 'c099ca40-73b2-48ed-b6a2-6197a95edd20',
  linkedin: 'https://www.linkedin.com/in/brettmichaelwagner/',
  calendlyUrl:
    'https://calendly.com/sidecardesign/30-minute-meeting-with-brett',
};

export const helpAreas = [
  {
    icon: 'quote',
    title: 'Quoting & Estimating',
    description:
      'Make complex quotes easier to prepare, manage, and follow up on.',
  },
  {
    icon: 'clock',
    title: 'Manual Workflows',
    description:
      'Reduce repetitive tasks, data entry, and unnecessary administrative work.',
  },
  {
    icon: 'connect',
    title: 'Disconnected Systems',
    description: 'Get your existing software and information working together.',
  },
  {
    icon: 'growth',
    title: 'Customer & Sales Operations',
    description:
      'Improve response times, follow-ups, and the way opportunities move through your business.',
  },
] as const;

export const steps = [
  { title: 'Discover', description: 'Find the opportunities worth pursuing.' },
  {
    title: 'Implement',
    description: 'Recommend, connect, automate, or build.',
  },
  {
    title: 'Improve',
    description: 'Measure results and keep making things better.',
  },
];
