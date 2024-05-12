import { atom } from "recoil";

export const codeAtom = atom({
    key: 'codeAtom',
    default: {
        contents:'',
        filePath: '../user/index.js'
    }
})
