import { getAuth, signOut as sighOutMethod } from 'firebase/auth';

export const signOut = async () => {
  try {
    const auth = getAuth();
    await sighOutMethod(auth);
    return true;
  } catch (error) {
    console.error(error);
  }
};
