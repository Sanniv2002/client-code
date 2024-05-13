import { atom } from "recoil";

export const renderAtom = atom({
    key: 'renderAtom',
    default: true
})

export const pageAtom = atom({
    key: 'pageAtom',
    default: false
})

export const loadingAtom = atom({
    key: 'loadingAtom',
    default: false
})