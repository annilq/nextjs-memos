import { create } from "zustand";

interface Store {
    openSnackbar: boolean;
    message: string;
    setOpenSnackbar: (visible: boolean, message: string) => void;
}

const useSnackbarStore = create<Store>()((set) => ({
    openSnackbar: false,
    message: "",
    setOpenSnackbar: (openSnackbar, message) => set(() => ({ openSnackbar, message })),
}));

export default useSnackbarStore;
