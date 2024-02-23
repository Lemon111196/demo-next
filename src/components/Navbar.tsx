'use client'
import { Avatar } from "@mui/material"
import { NavbarContainer } from "./styles"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


function Navbar() {
    const router = useRouter();
    const [profile, setProfile] = useState<boolean>(false);
    const logout = () => {
        router.push('/auth/login')
    }

    //!Show profile
    const showProfile = () => {
        setProfile(!profile)
        setTimeout(() => {
            setProfile(false);
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
                        <li>Dashboard</li>
                        <li>Note App</li>
                        <li>Linkcard</li>
                    </ul>
                </div>
                <div className="avatar">
                    <Avatar
                        src="/avatar.jpg"
                        alt="pic"
                        onClick={showProfile}
                    />
                </div>
                {profile && (
                    <div >
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