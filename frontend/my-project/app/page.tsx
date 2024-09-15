"use client"

import Navbar from "@/components/navbar";
import UploadButton from "@/components/uploadbutton";

const api = "http://localhost:8000" // Specify later
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <UploadButton />
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