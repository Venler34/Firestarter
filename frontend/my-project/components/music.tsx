

interface Info {
    videoLink: string,
    summary: string
}
export default function Music({ videoLink, summary }: Info) {
    return (
        <div className="text-center w-6/12">
            <h1 className="my-4">Music video: {videoLink}</h1>
            <h1>Summary: {summary}</h1>
        </div>
    )
}