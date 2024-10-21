import { atom } from "recoil";

export const userAtom = atom({
    key: 'userAtom',
    default: {
        id: null,
        googleId: null,
        email: '',
        name: '',
        password: null,
        institution_type: null,
        createdAt: '',
        role: 'USER',
        isLoggedIn: false
    }
});
