'use client'
import { useRouter } from "next/navigation"
import Container from "./Container"
import {Video} from 'lucide-react'
import { UserButton, useAuth } from "@clerk/nextjs"
import { Button } from "../ui/button"

function Navbar() {
    const router = useRouter()
    const {userId} = useAuth()
    return (
        <div className="sticky top-0 border border-b-primary/10">
            <Container>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push('/')}>
                        <Video />
                        <div className="font-bold text-xl">FaceFlow</div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <UserButton />
                        {!userId && <>
                            <Button size='sm' variant='outline' onClick={() => router.push('/sign-in')}>Sign in</Button>
                            <Button size='sm' onClick={() => router.push('/sign-up')}>Sign up</Button>
                        </> }
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default Navbar