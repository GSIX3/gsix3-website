// Shared ease curve used across all animated components
export const EASE = [0.22, 1, 0.36, 1]

// Section header stagger container — used in Services, Portfolio, Blog
export const sectionHeader = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// Standard fade-up child variant — used in section headers
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
}

// Grid stagger container — wraps card grids
export const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// Card entrance variant — child of gridContainer
export const cardEntrance = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}
