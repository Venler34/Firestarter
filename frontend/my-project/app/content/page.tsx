"use client"

import Navbar from "@/components/navbar"
import UploadButton from "@/components/uploadbutton"
import Image from "next/image"
import Skeleton from 'react-loading-skeleton'
import {useState} from "react"

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