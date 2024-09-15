"use client"
import { FormEvent } from "react";
import {useState} from "react"
export default function UploadButton() {
    const [selectedFile, setSelectedFile] = useState<File|null>(null)
    const api = "http://127.0.0.1:5000"
    async function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        if(selectedFile) {
            const file = document.getElementById('myfile')
            const formData = new FormData()
            formData.append("file", selectedFile)

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
            const data = await response.json()
            console.log(data.content)
        }
      }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    }
    return (
        <form className="bg-[#F92581] rounded-md content-center w-3/12 p-8" encType="multipart/form-data" onSubmit={onSubmit}>
            <input type="file" onChange={handleFileChange}/>
            <input type="submit"/>
        </form>
    )
}

{/* <svg className="block m-auto"xmlns="http://www.w3.org/2000/svg" width="91" height="77" viewBox="0 0 91 77" fill="none">
                    <path opacity="0.5" d="M66.75 27.8571C75.9937 27.8997 81.0003 28.2441 84.2643 30.9705C88 34.0909 88 39.1106 88 49.15V52.7C88 62.743 88 67.7627 84.2643 70.8831C80.5328 74 74.519 74 62.5 74H28.5C16.481 74 10.4672 74 6.73575 70.8831C3 67.7591 3 62.743 3 52.7V49.15C3 39.1106 3 34.0909 6.73575 30.9705C9.99975 28.2441 15.0063 27.8997 24.25 27.8571" stroke="#F9E9E9" stroke-width="5" stroke-linecap="round"/>
                    <path d="M45.5 49.15V3M45.5 3L58.25 15.425M45.5 3L32.75 15.425" stroke="#F9E9E9" strokeWidth="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p className="text-xl text-[#FFF]">Upload your lyrics</p> */}