"use client"

import { FormEvent } from "react";

const api = "http://localhost:8000"
export default function Home() {
  async function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch(`${api}/uploadfile/`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Disposition": "form-data" 
        },
        method: "POST",
        body: formData
      }
  )
    var data = await response.json()
    console.log(data)
  }
  
  return (
    <div>
      <h1>Hello, World!</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="upload">File:&nbsp;</label>
        <input type="file" name="upload" accept="application/pdf"/>
        <input type="submit"/>
      </form>
    </div>
  );
}
