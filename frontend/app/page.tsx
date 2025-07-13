"use client";
import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generatedShortUrl, setGeneratedShortUrl] = useState("");
  const [retrievedLongUrl, setRetrievedLongUrl] = useState("");
  const [error, setError] = useState<any>("");

  async function handleGenerateShortUrl(original_url: any) {
    try {
      const response = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify({originalUrl:longUrl}),
      });

      const data=await response.json();
      if(response.ok){
        setGeneratedShortUrl(data.data);
      }else{
        setError('short Url not generated ')
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  async function handleRetrieveLongUrl(short_url: any) {
    try {
      console.log('short url',shortUrl);
      const response=await fetch(`http://localhost:3000/get-og-url/${shortUrl}`);
      const data=await response.json();
      if(response.ok&&data.data){
        // setRetrievedLongUrl(data.data);
        window.location.href=data.data
      }
      else{
        setError('Long url not retrieved.')
      }
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 font-serif">
        Generate and Retrieve Shorten URL 👋
      </h1>

      {/* Generate short url */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Short URL</h2>
        <input
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
          type="text"
          placeholder="Enter your Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 text-white py-2 mt-4"
          onClick={handleGenerateShortUrl}
        >
          Shorten
        </button>
        {generatedShortUrl && (
          <p className="mt-4 text-green-400 max-w-full">
            Short Url: <a href={`/${generatedShortUrl}`} target="_blank">{generatedShortUrl}</a>
          </p>
        )}
      </div>

      {/* Get Long url  */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Get Original URL</h2>
        <input
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
          type="text"
          placeholder="Enter your Short URL"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
        />
        <button
          className="w-full bg-red-600 rounded-lg hover:bg-blue-700 text-white py-2 mt-4"
          onClick={handleRetrieveLongUrl}
        >
          Get Original
        </button>

        {retrievedLongUrl && (
          <p className="mt-4 text-green-400 max-w-full">
            Long Url: <a href={`/${retrievedLongUrl}`} target="_blank">{retrievedLongUrl}</a>
          </p>
        )}
      </div>
    </div>
  );
}
