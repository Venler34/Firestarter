"use client"

import { FormEvent } from "react";
import Navbar from "@/components/navbar";

const api = "http://localhost:8000" // Specify later
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <button className="bg-[#F92581] rounded-md content-center w-3/12 p-8">
          <svg className="block m-auto"xmlns="http://www.w3.org/2000/svg" width="91" height="77" viewBox="0 0 91 77" fill="none">
            <path opacity="0.5" d="M66.75 27.8571C75.9937 27.8997 81.0003 28.2441 84.2643 30.9705C88 34.0909 88 39.1106 88 49.15V52.7C88 62.743 88 67.7627 84.2643 70.8831C80.5328 74 74.519 74 62.5 74H28.5C16.481 74 10.4672 74 6.73575 70.8831C3 67.7591 3 62.743 3 52.7V49.15C3 39.1106 3 34.0909 6.73575 30.9705C9.99975 28.2441 15.0063 27.8997 24.25 27.8571" stroke="#F9E9E9" stroke-width="5" stroke-linecap="round"/>
            <path d="M45.5 49.15V3M45.5 3L58.25 15.425M45.5 3L32.75 15.425" stroke="#F9E9E9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p className="text-xl text-[#FFF]">Upload your lyrics</p>
        </button>
      </div>
    </div>
  );
}

<div className="w-[414px] h-[179px] bg-[#f82480] rounded-[15px] border-2 border-[#c41c89]/50" />



/*

async function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const formData = new FormData(event.currentTarget.files[0])
    const response = await fetch(`${api}/uploadfile/`,
      {
        headers: {
          "Content-Type": "multipart/form-data; boundary=" + Math.random().toString().substring(2),
          "Content-Disposition": "form-data"
        },
        method: "POST",
        body: formData
      }
  )
    var data = await response.json()
    console.log(data)
  }
*/
/*
<div className="w-[1280px] h-[832px] relative bg-[#faeeff]">
          <div className="w-[209px] h-[179px] left-[93px] top-[247px] absolute bg-[#f82480] rounded-[15px] shadow border border-[#a01cc4]" />
          <div className="w-[414px] h-[179px] left-[432px] top-[247px] absolute bg-[#f82480] rounded-[15px] border-2 border-[#c41c89]/50" />
          <div className="w-[209px] h-[179px] left-[977px] top-[247px] absolute bg-[#f82480] rounded-[15px] shadow border border-[#a01cc4]" />
          <div className="w-[85px] h-[71px] left-[597px] top-[284px] absolute">
          </div>
          <div className="left-[133px] top-[377px] absolute text-white text-xl font-semibold font-['Inter']">Saved songs</div>
          <div className="left-[1030px] top-[377px] absolute text-white text-xl font-semibold font-['Inter']">Study files</div>
          <div className="left-[552px] top-[377px] absolute text-white text-xl font-semibold font-['Inter']">Upload your lyrics</div>
          <div className="left-[921px] top-[34px] absolute"><span className="text-black text-xl font-semibold font-['Inter']">Home       </span><span className="text-[#f82480] text-xl font-semibold font-['Inter']">Content</span><span className="text-black text-xl font-semibold font-['Inter']">      Profile     </span></div>
          <img className="w-[1192.19px] h-[535.07px] left-[189px] top-[713.27px] absolute origin-top-left rotate-[-23.76deg]" src="/images/musicNotes.png" />
          <div className="w-[75px] h-[71px] left-[158px] top-[284px] absolute">
              <div className="w-[45.31px] h-[53.25px] left-[15.62px] top-[8.88px] absolute">
              </div>
              <div className="w-8 h-8 left-[43px] top-[39px] absolute bg-[#df1818]/0" />
          </div>
          <div className="w-[103px] h-[76px] left-[1030px] top-[285px] absolute">
              <div className="w-[68.67px] h-[63.33px] left-[17.17px] top-[6.33px] absolute">
              </div>
          </div>
          <div className="w-[254px] h-[35px] left-[592px] top-[29px] absolute bg-[#ffd2e8]/80 rounded-[15px]" />
          <div className="w-[32.93px] h-[34.58px] left-[597px] top-[34.70px] absolute origin-top-left rotate-[80.52deg]" />
          <div className="w-[179px] h-10 left-[29px] top-[21px] absolute"><span className="text-black text-[32px] font-normal font-['Krona One']">Rhym</span><span className="text-[#f82480] text-[32px] font-normal font-['Krona One']">E</span><span className="text-black text-[32px] font-normal font-['Krona One']">d</span></div>
      </div>
*/