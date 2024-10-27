import { atom } from "recoil";

export const resourceAtom = atom({
    key: 'resourceAtom',
    default: {
        uri: ""
    }
})