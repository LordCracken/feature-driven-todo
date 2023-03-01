import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const signIn = async (email: Email, password: Password) => {
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    return await response.user;
  } catch (error) {
    console.error(error);
  }
};
