export const sections = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  { id: 'equipos', label: 'Equipos', icon: 'shield' },
  { id: 'juego', label: 'Juego', icon: 'ball' },
  { id: 'ar', label: 'AR', icon: 'scan' },
  { id: 'trivia', label: 'Trivia', icon: 'bolt' },
  { id: 'galeria', label: 'Galería', icon: 'image' },
];

export const teams = [
  { name: 'Sultanes de Monterrey', city: 'Monterrey, Nuevo León', initials: 'M', color: 'navy', nickname: 'Pasión del norte' },
  { name: 'Diablos Rojos del México', city: 'Ciudad de México', initials: 'D', color: 'red', nickname: 'El diamante capitalino' },
  { name: 'Leones de Yucatán', city: 'Mérida, Yucatán', initials: 'L', color: 'green', nickname: 'Béisbol en la península' },
  { name: 'Toros de Tijuana', city: 'Tijuana, Baja California', initials: 'T', color: 'black', nickname: 'Energía de la frontera' },
];

export function resolveRoute(hash) {
  const id = hash.replace(/^#\/?/, '').replace(/\/$/, '') || 'inicio';
  return sections.some((section) => section.id === id) ? id : '404';
}
