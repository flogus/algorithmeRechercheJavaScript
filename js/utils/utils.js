function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
function searchableWords(string) {
  const str = string
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return str;
}
