'use client'

import { useSocket } from "@/context/SocketContext"
import { useUser } from "@clerk/nextjs"
import OnlineUser from "./OnlineUser"


function ListOnlineUsers() {
    const {onlineUsers} = useSocket()

    
    return (
        <div className="flex border-b border-b-primary/10 w-full items-center pb-2">
            {onlineUsers && onlineUsers.map(onlineUser => <OnlineUser key={onlineUser.userId} profile={onlineUser.profile}/>)}
        </div>
    )
} 

export default ListOnlineUsers