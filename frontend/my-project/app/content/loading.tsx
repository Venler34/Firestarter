import Skeleton, {SkeletonTheme} from "react-loading-skeleton"

export default function Loading() {
    return(
        <SkeletonTheme baseColor="#990" highlightColor="#550">
            {" "}
            Loading......
            <Skeleton
                style={{borderRadius: 10}}
                count={9}
                height={10}
                width={40}
                duration={200}
            ></Skeleton>
        </SkeletonTheme>
    )
}