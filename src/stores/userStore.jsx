import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
const URL = import.meta.env.VITE_API_URL

const useUserStore = create( persist((set,get) => ({
    user: "null",
    token: '',
    login: async (input) => {
        const result = await axios.post(`${URL}/auth/login`, input)
        set({token : result.data.token, user: result.data.user})
        return result.data
    },
    logout: () =>{
        set({token: '', user: null})
    },
    register: async (input) => {
        const result = await axios.post(`${URL}/auth/register`, input)
        return result.data
    }
    
}),{
    name: 'state',
    storage: createJSONStorage(() => localStorage)
}))



export default useUserStore

// const useRegisterStore = create((get,set) => ({
//     register: async (input) => {
//         const result = await axios.post("http://localhost:8000/auth/register", input)
//         return result.data
//     }
// }))
// export default useRegisterStore