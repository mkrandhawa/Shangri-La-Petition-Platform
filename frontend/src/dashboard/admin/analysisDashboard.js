import React, {useRef} from "react";
import BarChartSignatures from "./charts/barChart";
import PetitionStatusChart from "./charts/petionStatusChart";
import WordCloudAnalysis from "./charts/wordCloud";
import PetitionActivityOverTime from "./charts/scatterChart";



export default function AnalysisDashboard(){


    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -containerRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: containerRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const containerRef = useRef(null);
    

    return (

        <>
            <div className='arrows'>
                <div className="arrow leftArrow" onClick={scrollLeft}>&#9664;</div>
                <div className="arrow rightArrow" onClick={scrollRight}>&#9654;</div>
            </div>

            <div className='petitionsContainer petitionsToReply ' ref={containerRef}>

            <div className="onePetitionsCard analysisCard analysis">

                <div className="subContainer signatureChart ">
                    <span className="mainName welcomeText">Welcome to Your Dashboard</span>
                    <span className="nameSlogan welcomeSlogan">Your data at a glance, insights just a swipe away.</span>
                   

                </div>

            </div>
                 {/* Petitions Signatures */}
                <div className="onePetitionsCard analysisCard">

                    <div className="subContainer signatureChart">
                        <span className="wordCloudTitle signaturesTitle">Petition vs Signatures</span>
                        <BarChartSignatures />

                    </div>
                
                </div>

                {/* Open vs Closed petitions */}
                <div className="onePetitionsCard analysisCard">

                    <div className="subContainer signatureChart">
                    <span className="wordCloudTitle signaturesTitle">Open vs Closed Petitions</span>
                    <PetitionStatusChart />

                    </div>
                
                </div>

                {/* Word Cloud */}
                <div className="onePetitionsCard analysisCard">

                    <div className="subContainer wordCloudSubcontainer">
                        <span className="wordCloudTitle">Some of the popular words...</span>
                        <WordCloudAnalysis />

                    </div>
                
                </div>

                {/* Petition Activity Chart  */}
                <div className="onePetitionsCard analysisCard">

                    <div className="subContainer wordCloudSubcontainer">
                        <span className="wordCloudTitle">Petition activity over time</span>
                        <PetitionActivityOverTime />

                    </div>
                
                </div>

            </div>
        </>
  
    )
}