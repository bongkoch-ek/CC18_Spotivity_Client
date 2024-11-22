import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useNavigate } from 'react-router-dom'
import useUserStore from '../stores/userStore'
import useActivityStore from '../stores/activityStore'
import { Success } from '../icons'


export default function Modal(props) {
    const { from, txtTitle, isOpen, txtDetail, body, setJoin ,activityId} = props
    const [open, setOpen] = useState(isOpen)
    const navigate = useNavigate()

    const user = useUserStore(state => state.user)
    const token = useUserStore(state => state.token)
    const createActivity = useActivityStore(state => state.createActivity)


    async function hdlOnClick() {
        try {
            setOpen(false)
            if (from === "REGISTER") {
                navigate("/login")
            }
            else if (from === "CREATE") {
                navigate("/activity")
            }
            
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            console.log(errMsg)
            toast.error(errMsg)
        }

    }

    function hdlCanCel() {
        setOpen(false)
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl text-center">
                        <p className='items-center text-center'>
                            {txtTitle}
                        </p>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-center align-middle items-center flex flex-col justify-center">
                        <Success className='w-32 h-32 p-5'/>
                        {txtDetail}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    
                    <button className='rounded-3xl bg-[#005657] text-white px-4 py-2 font-medium hover:bg-[#004d4e]' onClick={hdlOnClick}> OK </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

}
