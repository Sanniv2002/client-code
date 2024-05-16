import { atom } from "recoil";
import axios from 'axios'

let initialData;
const init = async () => {
    initialData = await axios.get('http://172.28.118.153:8000/file?filePath=/home/sanniv/Cloud IDE/user/index.js') //These needs to be updated
    return
}

init()

export const codeAtom = atom({
    key: 'codeAtom',
    default: {
        contents:initialData || "",
        filePath: '/home/sanniv/Cloud IDE/user/index.js'
    }
})