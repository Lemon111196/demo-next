'use client'
import { Avatar } from "@mui/material"
import { NavbarContainer } from "./styles"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";



function Navbar() {
    const router = useRouter();
    const [profiles, setProfiles] = useState<boolean>(false);

    //! Log out
    const logout = () => {
        router.push('/auth/login')
        localStorage.removeItem('accessToken')

    }

    //!Navigation
    const gotoDashboard = () => {
        router.push('/dashboard')
    }
    const gotoNote = () => {
        router.push('/dashboard/noteapp')
    }
    const gotoLinkcard = () => {
        router.push('dashboard/linkcard')
    }

    //!Show profile
    const showProfile = () => {
        setProfiles(!profiles)
        setTimeout(() => {
            setProfiles(false);
        }, 3000)
    }


    return (
        <NavbarContainer>
            <div className="wrapper">
                <div className="first-part">
                    <Image
                        className="img"
                        src="/avatar.jpg"
                        alt="image"
                        width={50}
                        height={30}></Image>
                    {/* <p>12</p> */}
                    <ul className="list-item">
                        <li onClick={gotoDashboard}>Dashboard</li>
                        <li onClick={gotoNote}>Note App</li>
                        <li onClick={gotoLinkcard}>Linkcard</li>
                    </ul>
                </div>
                <div className="avatar">
                    <Avatar
                        src="/avatar.jpg"
                        alt="pic"
                        onClick={showProfile}
                    />
                </div>
                {profiles && (
                    <div className="list-container">
                        <ul className="list">
                            <li className="profile">Profile</li>
                            <li onClick={logout} className="profile">Log out</li>
                        </ul>
                    </div>
                )}
            </div>
        </NavbarContainer>
    )
}

export default Navbar