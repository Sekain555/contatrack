import { getAuth } from "firebase/auth";

async function obtenerToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  throw new Error("No hay usuario autenticado");
}

export { obtenerToken };
