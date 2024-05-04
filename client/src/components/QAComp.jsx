import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ReactTyped } from 'react-typed';

const QAComp = ({ text, rank, disease, loading }) => {
    let result = text?.replace(/\*/g, '');
    let list = disease ? [
        "How do we prevent any disease affecting the crop",
        "Are there any factors affecting the nutritional value, such as soil composition or environmental pollution?",
        "What efforts are being made to minimize environmental impact and promote sustainability?"
    ] :
        [
            "What is this disease",
            "How to minimize the disease",
            "How to avoid the disease in future"
        ]
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
                    <div className="font-bold text-2xl mb-2">{list[rank]}</div>
                    <ReactTyped strings={[result]} typeSpeed={10} />

                </div>



            }


        </div>
    )
}

export default QAComp