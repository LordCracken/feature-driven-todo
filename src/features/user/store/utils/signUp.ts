import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const signUp = async (email: Email, password: Password) => {
  try {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return await response.user;
  } catch (error) {
    console.error(error);
  }
};
