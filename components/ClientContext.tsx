"use client";

import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/joy";
import useSnackbar from "@/store/useSnackbar";
import LoginModal from "@/components/LoginModal";
import { SWRConfig } from "swr";
import axios from "axios";
import useloginStore from "@/store/loginStore";

axios.interceptors.request.use(async (config: any) => {
    let headers = {};
    if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("token");

        headers = {
            "Authorization": token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
        };
    }
    return { ...config, headers: { ...config.headers, ...headers } };
}, (error) => Promise.reject(error));

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ClientContext = ({ children }: { children: React.ReactNode }) => {
    const { message, openSnackbar, setOpenSnackbar } = useSnackbar();
    const { setLoginState } = useloginStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // setLoginState(!!token);
        setIsMounted(true); // 页面挂载完成
        return () => {
            setIsMounted(false); // 页面卸载
        };
    }, []);

    if (!isMounted) {
        return false;
    }

    return (
        isMounted ? (
            <SWRConfig
                value={{
                    fetcher,
                    onError: (error) => {
                        if (error.status === 401) {
                            // 全局处理过期
                            setLoginState(false);
                        }
                    },
                }}
            >
                {children}
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => { setOpenSnackbar(false, ""); }}
                    className="top-32"
                >
                    {message}
                </Snackbar>
                <LoginModal />
            </SWRConfig>
        ) : <div>isMounting</div>
    );
};

export default ClientContext;
