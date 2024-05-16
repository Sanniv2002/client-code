import { atom } from "recoil";


export const fileAtom = atom({
    key: 'fileAtom',
    default:{
        name: 'index.js',
        type: 'file',
        filePath: '/home/sanniv/Cloud IDE/user/index.js'
    }
})