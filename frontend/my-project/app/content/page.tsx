import Navbar from "@/components/navbar"
import UploadButton from "@/components/uploadbutton"

export default function Page() {
    return (
        <div>
            <Navbar/>
            <div className="my-52 flex justify-center">
                <UploadButton/>
            </div>
        </div>
    )
}