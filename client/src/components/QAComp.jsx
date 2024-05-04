import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ReactTyped } from 'react-typed';

const QAComp = ({ text, rank, disease, loading,question }) => {
    let result = text?.replace(/\*/g, '');
    const forCrop = disease==="crop"?true:false;
    
    let list = disease ?
    
    disease==="crop"?
    [
        "What is this crop ?",
        "What are some other crops that I can grow ?"
    ]:
    [
        "How do we prevent any disease affecting the crop",
        "Are there any factors affecting the nutritional value, such as soil composition or environmental pollution?",
        "What efforts are being made to minimize environmental impact and promote sustainability?"
    ] 
    :
    [
        "What is this disease",
        "How to minimize the disease",
        "How to avoid the disease in future"
    ]


    // list = [
    //     "Why this crop ?",
    //     "What are some other crops that i can grow ?"
    // ]
    return (

        <div className="mt-4 lg:w-[1000px] border-2 border-klight rounded-lg p-4 text-klight  max-w-[90%]">
            {loading
                ?
                <SkeletonTheme baseColor="#0a210f" highlightColor="#e1e28945">
                    <p>
                        <Skeleton count={4} />
                    </p>
                    
                </SkeletonTheme>
                :
                <div>
                    <div className={`font-bold ${forCrop?"text-2xl":"text-2xl"} mb-2`}>{list[rank]}</div>
                    <ReactTyped strings={[result]} typeSpeed={10} className={`${forCrop?"text-xl":null}`}/>
                </div>
            }
        </div>
    )
}

export default QAComp