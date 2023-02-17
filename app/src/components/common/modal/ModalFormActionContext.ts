import { createContext } from "react";

export type Action = () => void;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ModalFormActionContext = createContext<Action>(() => {});
