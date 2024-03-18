import { createContext } from "react";

export const CurrentUserContext = createContext(["", () => {}] as [
  any,
  (user: any) => void,
]);
