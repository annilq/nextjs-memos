import { validateRequest } from "@/lib/auth";
import { User } from "lucia";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>()
  const getUser = async () => {
    const { user } = await validateRequest()
    setUser(user)
  };

  useEffect(() => {
    getUser()
  }, [])
  
  return user;
};

export default useCurrentUser;
