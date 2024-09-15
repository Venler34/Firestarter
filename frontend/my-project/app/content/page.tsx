"use client"

import Navbar from "@/components/navbar"
import UploadButton from "@/components/uploadbutton"

export default function Page() {
    return (
        <div>
            <Navbar/>
            <div className="text-center">
                <h1 className="text-3xl">RhymthEdu Music Educator</h1>
                <h1>Just drag your lecture slides into the drop box for a cool soundtrack </h1>
            </div>
            <UploadButton/>
        </div>
    )
}