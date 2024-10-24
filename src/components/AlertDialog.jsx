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


export default function Modal(props) {
    const { from, txtTitle, isOpen, txtDetail, body } = props
    const [open, setOpen] = useState(isOpen)
    const navigate = useNavigate()

    const user = useUserStore(state => state.user)
    const token = useUserStore(state => state.token)
    const createActivity = useActivityStore(state => state.createActivity)


    async function hdlOnClick() {
        setOpen(false)
        if (from === "REGISTER") {
            navigate("/login")
        }
        else if (from === "CREATE") {
            navigate("/activity")
        }
    }

    function hdlCanCel() {
        setOpen(false)
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <p className='items-center text-center'>
                            {txtTitle}
                        </p>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {txtDetail}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* {
                        from == 'CREATE' && <button onClick={hdlCanCel} className='mr-2 px-2 py-1 rounded-3xl hover:text-[#b0cbcb] hover:underline  '>cancel</button>
                    } */}
                    <button className='rounded-3xl bg-[#005657] text-white px-4 py-2 font-medium hover:bg-[#004d4e]' onClick={hdlOnClick}> OK </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

}
