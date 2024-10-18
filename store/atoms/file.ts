import { atom } from "recoil";

const fileBasePath = process.env.FILE_BASE_PATH || '/app/files';
export const fileAtom = atom({
    key: 'fileAtom',
    default:{
        name: '',
        type: '',
        filePath: ``
    }
})