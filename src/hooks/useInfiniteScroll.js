import {useEffect, useRef} from "react";

export default function useInfiniteScroll (callback, isLoading, hasMore) {
    const loaderRef = useRef();
    useEffect(()=>{
        if (isLoading || !hasMore) return;
        
        const observer = new IntersectionObserver(
            (entries)=>{
                if(entries[0].isIntersecting){
                    callback();
                }
            },
            {threshold:1}
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return ()=> observer.disconnect()
    },[callback,isLoading,hasMore]);
    return loaderRef;
}