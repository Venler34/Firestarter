import Image from "next/image"

export default function navbar() {
    return (
        <div className="flex p-4">
            {/* <Image width="179" height="40" src="/images/RhymEd.png" alt="Rhymed Logo"/> */}
            <nav className="ml-500">
                <button className="m-2 text-[#000]">Home</button>
                <button className="m-2 text-[#F92581]">Content</button>
                <button className="m-2 text-[#000]">Profile</button>
            </nav>
        </div>
    );
}