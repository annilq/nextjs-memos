import { create } from "zustand";

interface Store {
    loginModalvisible: boolean;
    isLogin: boolean;
    setLoginModalVisible: (visible: boolean) => void;
    setLoginState: (isLogin: boolean) => void;
}

const useStore = create<Store>()((set) => ({
    loginModalvisible: false,
    isLogin: false,
    setLoginModalVisible: (loginModalvisible) => set(() => ({ loginModalvisible })),
    setLoginState: (isLogin) => set(() => ({ isLogin })),
}));

export default useStore;
