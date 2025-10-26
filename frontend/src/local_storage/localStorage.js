export function saveUsers(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function chargerDonnees() {
  return JSON.parse(localStorage.getItem("user")) || null;
}


export function saveSelectedVoitureId(id) {
  if (!id) return;
  localStorage.setItem("selectedVoitureId", String(id));
}

export function getSelectedVoitureId() {
  return localStorage.getItem("selectedVoitureId") || null;
}

export function clearSelectedVoitureId() {
  localStorage.removeItem("selectedVoitureId");
}