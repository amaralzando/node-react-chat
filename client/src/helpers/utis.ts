export function getInitials(fullName: any) {
  const names = fullName.trim().split(" ");
  if (names.length < 2) {
    return names[0][0]; // Retorna apenas a inicial do primeiro nome se houver apenas um
  }

  const firstInitial = names[0][0].toUpperCase();
  const lastInitial = names[1][0].toUpperCase();
  return `${firstInitial}${lastInitial}`;
}
