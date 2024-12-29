import React, { useState, useEffect } from "react";
import { getData } from "../../../fetchRoutes/getData";
import WordCloud from 'react-d3-cloud'; 

export default function WordCloudAnalysis() {


  const url = process.env.REACT_APP_GET_PETITIONS;

  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch petitions 
  useEffect(() => {
    const fetchPetitions = async () => {
      if (!url) return;
      try {

        const response = await getData(url);

      if (response.status === 'Success') {
        if (response.data) {
          setPetitions(response.data); 
        }

      } 
      } catch (err) {
        console.error('Error fetching petitions:', err); 
      } finally {
        setLoading(false); 
      }
    };
    fetchPetitions();
  }, [url]);

  // Proccess the data and create a general word file
  const processTextData = () => {
    if (petitions.length === 0) return []; 

    
    const text = petitions.map(petition => petition.title + " " + petition.text).join(" ");

    // Cleaning words
    const words = text.split(/\s+/).map(word => word.toLowerCase().replace(/[^a-zA-Z]/g, ""));

    const wordFrequency = {};

    // Ignore words that have length less than 1
    words.forEach(word => {
      if (word && word.length > 1) { 
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });


    // Final word cloud data file
    const wordData = Object.keys(wordFrequency).map(word => ({
      text: word,
      value: wordFrequency[word]
    }));


    return wordData;
  };

  
  const wordCloudData = processTextData();

  return (
    <>
      {loading ? 'Loading....' : (
        <div className="wordCloud">
          {wordCloudData.length > 0 ? (
            <WordCloud
              data={wordCloudData}
              width={700}
              height={300}
              font="Impact"
              fontSize={(word) => Math.log(word.value) * 12} 
              rotate={function () { return (~~(Math.random() * 2) * 90); }} 
              spiral="rectangular"
            />
          ) : (
            <p>No words available for the Word Cloud.</p>
          )}
        </div>
      )}
    </>
  );
}
