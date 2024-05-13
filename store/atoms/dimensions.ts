import { atom } from "recoil";

export const dimensionsAtom = atom({
    key: 'dimensionsAtom',
    default: {
        windowHeight: 0,
        windowWidth: 0
    }
})