module.exports = {
  email: 'nitinbhatti1907@gmail.com',

  socialMedia: [
    { name: 'GitHub', url: 'https://github.com/nitinbhatti1907' },
    { name: 'Linkedin', url: 'https://www.linkedin.com/in/bhattinitin/' }
  ],

  navLinks: [
  { name: 'Profile',        url: '/#profile' },
  { name: 'Industry Exp.',  url: '/#experience' },
  { name: 'Projects',       url: '/#projects' },
  { name: 'Certifications', url: '/#certificates' },
  { name: 'Dashboards',     url: '/#dashboard' },
  { name: 'Contact',        url: '/#contact' },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
