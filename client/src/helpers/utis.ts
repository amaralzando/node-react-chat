export function getInitials(fullName: string | undefined): string {
  if (!fullName) {
    return ""; // Retorna uma string vazia se fullName for undefined ou vazio
  }

  const names = fullName.trim().split(" ");
  if (names.length === 0) {
    return ""; // Caso o nome esteja vazio após o trim
  }

  if (names.length === 1) {
    return names[0][0].toUpperCase(); // Retorna apenas a inicial do primeiro nome se houver apenas um
  }

  const firstInitial = names[0][0].toUpperCase();
  const lastInitial = names[names.length - 1][0].toUpperCase();
  return `${firstInitial}${lastInitial}`;
}

export function formatChatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    date.toDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toDateString();
  const isThisYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
    // Retorna a hora se for hoje
    return `Hoje às ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else if (isYesterday) {
    // Retorna "Ontem"
    return "Ontem";
  } else if (isThisYear) {
    // Retorna o dia e o mês se for deste ano
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} de ${month}`;
  } else {
    // Retorna dia/mês/ano se for de ano anterior
    const day = date.getDate();
    const month = date.getMonth() + 1; // Meses são baseados em zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
