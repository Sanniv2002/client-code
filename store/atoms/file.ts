import { atom } from "recoil";


export const fileAtom = atom({
    key: 'fileAtom',
    default:{
        name: 'index.js',
        type: 'file',
        filePath: '../user/index.js'
    }
})