// import Image from "next/image"
import Link from "next/link"
import {UserButton} from "@clerk/nextjs"


export default function navbar() {
    return (
        <div className="flex p-4">
            {/* <Image width="179" height="40" src="/images/RhymEd.png" alt="Rhymed Logo"/> */}
            <nav className="ml-500">
                <Link href="/" className="m-2 text-[#000]">Home</Link>
                <Link href="/content" className="m-2 text-[#F92581]">Content</Link>
                <Link href="" className="m-2 text-[#000]">Profile</Link>
                <div className="inline">
                    <UserButton showName/>
                </div>
            </nav>
        </div>
    );
}