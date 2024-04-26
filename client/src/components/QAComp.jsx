import React from 'react'
import { ReactTyped } from 'react-typed';

const QAComp = ({ text,rank,disease }) => {
    let result  = text?.replace(/\*/g,'');
    let list = disease? [
        "How do we prevent any disease affecting the crop",
        "Are there any factors affecting the nutritional value, such as soil composition or environmental pollution?",
        "What efforts are being made to minimize environmental impact and promote sustainability?"
    ]:
    [
       "What is this disease",
       "How to minimize the disease",
       "How to avoid the disease in future" 
    ]
    return (
 
        <div className="lg:w-[1000px] border-2 border-klight rounded-lg p-4 text-klight  max-w-[90%]">
            <div className="font-bold text-2xl mb-2">{list[rank]}</div>
            {/* <div className='font-bold'>{result.split(" ")[0]}</div> */}
            {/* <div>{result}</div> */}
            <ReactTyped strings={[result]} typeSpeed={10}/>
        </div>
    )
}

export default QAComp