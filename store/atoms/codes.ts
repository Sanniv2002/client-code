import { atom } from "recoil";
import axios from 'axios'

const fileBasePath = process.env.FILE_BASE_PATH || '/app/files';


export const codeAtom = atom({
    key: 'codeAtom',
    default: {
        contents:"",
        filePath: ``
    }
})