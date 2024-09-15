"use client"

import Navbar from "@/components/navbar"
import UploadButton from "@/components/uploadbutton"
import Image from "next/image"
import Skeleton from 'react-loading-skeleton'
import { useState } from "react"

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDownloadVideo = async () => {
        
        setLoading(true);
        setProgress(0);

        try {
            // Simulate video download with progress updates
            const totalSteps = 100;
            for (let i = 0; i <= totalSteps; i++) {
                await new Promise((resolve) => setTimeout(resolve, 30)); // Simulate time delay
                setProgress(i); // Update progress
            }
        } catch (error) {
            console.error("Failed to download video", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="text-center">
                <h1 className="text-3xl">RhymthEdu Music Educator</h1>
                <h1>Just drag your notes about anything into the drop box for a cool soundtrack</h1>
            </div>
            <UploadButton/>
            
        </div>
    )
}
