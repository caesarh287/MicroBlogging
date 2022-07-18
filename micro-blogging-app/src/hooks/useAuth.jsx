import { useCallback, useEffect, useState } from "react";
import APIController from "../config/FirebaseController";

export default function useAuth() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    displayName: 'DEFAULT',
  });

  const signup = useCallback(async (email, password) => {
    const user = await APIController.signup(email, password);
    return user;
  }, []);

  const login = useCallback(async (email, password) => {
    const user = await APIController.login(email, password);
    return user;
  }, [])

  const signout = useCallback(async () => {
    await APIController.signOut();
  }, [])

  const updateDisplayName = useCallback(async (newName) => {
    await APIController.updateDisplayName(newName);
    setUserInfo((cur) => ({ ...cur, displayName: newName }));
  }, []);

  useEffect(() => {
    APIController.startObservingAuthCheck((user) => {
      if (user) {
        console.log(`User`, user);
        setLoggedIn(true);
        setUserInfo(user);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return {
    isLoggedIn,
    displayName: userInfo.displayName || 'DEFAULT',
    userInfo,
    updateDisplayName,
    signup,
    login,
    signout,
  }
}