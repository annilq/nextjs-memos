import * as React from "react";
import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";

import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import useloginStore from "@/store/loginStore";
import useSnackbar from "@/store/useSnackbar";

const accountFormSchema = z.object({
    phone_number: z.string().length(11, ""),
    code: z.string().length(6, ""),
    invite_code: z.string().optional(),
});


interface FormValues {
    code: string;
    phone_number: string;
    invite_code?: string;
}

type LoginType = "signin" | "signup";


const LoginForm = () => {
    const { setOpenSnackbar } = useSnackbar();

    const [value, setValue] = useState<LoginType>("signin");

    const { setLoginModalVisible, setLoginState } = useloginStore();

    const handleChange = (newValue: LoginType) => {
        setValue(newValue);
    };

    const {
        control,
        handleSubmit,
    } = useForm<FormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            code: "123456",
            phone_number: "12345678912",
            invite_code: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        // setOpenSnackbar(true, e?.response?.data?.detail || e.message);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="phone_number"
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                error={Boolean(fieldState.error)}
                                startDecorator={(
                                    <LockIcon />
                                )}
                            />

                        )}
                    />
                    <Controller
                        name="code"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                error={Boolean(fieldState.error)}
                                startDecorator={(
                                    <MailOutlineIcon />
                                )}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {value === "signin" ? "login " : "sigup"}
                    </Button>
                </form>
                <div className="flex w-full justify-center gap-4">
                    {value === "signin" ? "no account?" : "have a account?"}
                    <Link onClick={() => handleChange(value === "signin" ? "signup" : "signin")} className="text-primary">
                        {value === "signin" ? "sigup" : "signin"}
                    </Link>
                </div>
            </Box>
        </Container>
    );
};

export default LoginForm;
