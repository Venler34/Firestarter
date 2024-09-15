"use client"
import { FormEvent } from "react";
import {useState} from "react"
import Music from "@/components/music"
export default function UploadButton() {
    const [videoLink, setVideoLink] = useState<string>("")
    const [summary, setSummary] = useState<string>("")
    const [showMusic, setShowMusic] = useState(false)
    const [uploadFile, setUploadfile] = useState(true)
    const [selectedFile, setSelectedFile] = useState<File|null>(null)
    const [isVideoReady, setIsVideoReady] = useState(false); // Tracks if the video is ready after 40 seconds

    const api = "http://127.0.0.1:5000"
    
    async function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        if(selectedFile) {
            const formData = new FormData()
            formData.append("file", selectedFile)

            setUploadfile(false)

            const response = await fetch(`${api}/upload`,
                {
                //     headers: {
                //       "Content-Type": "multipart/form-data; boundary=" + Math.random().toString().substring(2),
                //       "Content-Disposition": "form-data"
                //     },
                    method: "POST",
                    body: formData
                }
            )
            console.log("Response has been recieved!!!")
            const data = await response.json()
            console.log(data)
            setUploadfile(true)
            setVideoLink(data.song_link)
            setSummary(data.summary)
            setTimeout(() => {
                setVideoLink(data.song_link); // Set video link after delay
                setIsVideoReady(true); // Indicate that the video is ready after 40 seconds
                setShowMusic(true);
              }, 40000); // 40-second delay
            setShowMusic(true)
        }
      }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    }
    return (
        <div className="my-52 flex flex-col justify-center items-center">
            {
                showMusic && (<Music videoLink={videoLink} summary={summary}/>)
            }
            {(!showMusic) && ((uploadFile) ? (
                <form className="w-3/12" encType="multipart/form-data" onSubmit={onSubmit}>
                    <div className="bg-[#F92581] hover:bg-sky-700 hover:cursor-grab rounded-md">
                        <label className="w-max" htmlFor="fileInput">
                            <svg className="block m-auto"xmlns="http://www.w3.org/2000/svg" width="91" height="77" viewBox="0 0 91 77" fill="none">
                                <path opacity="0.5" d="M66.75 27.8571C75.9937 27.8997 81.0003 28.2441 84.2643 30.9705C88 34.0909 88 39.1106 88 49.15V52.7C88 62.743 88 67.7627 84.2643 70.8831C80.5328 74 74.519 74 62.5 74H28.5C16.481 74 10.4672 74 6.73575 70.8831C3 67.7591 3 62.743 3 52.7V49.15C3 39.1106 3 34.0909 6.73575 30.9705C9.99975 28.2441 15.0063 27.8997 24.25 27.8571" stroke="#F9E9E9" stroke-width="5" stroke-linecap="round"/>
                                <path d="M45.5 49.15V3M45.5 3L58.25 15.425M45.5 3L32.75 15.425" stroke="#F9E9E9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="text-xl text-center text-[#FFF]">Upload your Lecture</p>
                        </label>
                        <input id="fileInput" className="text-[#F92581] hidden"type="file" onChange={handleFileChange}/>
                    </div>
                    <div className="text-center my-4">
                        {selectedFile?.name || "No file selected"}
                    </div>
                    <div className="flex justify-center">
                        <input className="bg-[#25F99D] py-2 px-8 text-[#FFF] hover:bg-sky-700"type="submit"/>
                    </div>
                </form>
            ) : (<h1 className="text-4xl text-center">Loading....</h1>))}
           {showMusic && (
            <div className="my-10">
            {isVideoReady ? (
                <a
                href={videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#25F99D] text-[#FFF] hover:bg-sky-700 rounded-md"
                >
                Open Video
                </a>
            ) : (
                <button
                disabled
                className="p-4 bg-gray-500 text-[#FFF] rounded-md"
                >
                Video is not ready
                </button>
            )}
            <button className="p-4 mx-8 bg-[#25F99D] text-[#FFF]">Save Song!</button>
            <button
                className="p-4 bg-[#F92581] text-[#FFF]"
                onClick={() => setShowMusic(false)}
            >
                Load Lecture
            </button>
            </div>
      )}
        </div>
    )
}

{/* <svg className="block m-auto"xmlns="http://www.w3.org/2000/svg" width="91" height="77" viewBox="0 0 91 77" fill="none">
                    <path opacity="0.5" d="M66.75 27.8571C75.9937 27.8997 81.0003 28.2441 84.2643 30.9705C88 34.0909 88 39.1106 88 49.15V52.7C88 62.743 88 67.7627 84.2643 70.8831C80.5328 74 74.519 74 62.5 74H28.5C16.481 74 10.4672 74 6.73575 70.8831C3 67.7591 3 62.743 3 52.7V49.15C3 39.1106 3 34.0909 6.73575 30.9705C9.99975 28.2441 15.0063 27.8997 24.25 27.8571" stroke="#F9E9E9" stroke-width="5" stroke-linecap="round"/>
                    <path d="M45.5 49.15V3M45.5 3L58.25 15.425M45.5 3L32.75 15.425" stroke="#F9E9E9" strokeWidth="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p className="text-xl text-[#FFF]">Upload your lyrics</p> */}