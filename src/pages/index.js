import { FaSearch } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);

  const searchWord = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      setResult(res.data[0])
    } catch(err) {
      console.error(err);
      setResult(null);
    }
  }

  const playAudio = () => {
    const audioUrl = result?.phonetics?.find(p => p.audio)?.audio;
    if(audioUrl) {
      new Audio(audioUrl).play();
    } else {
      alert("Audio not available for this word")
    }
  }
  return (
    <>
      <div className="relative h-screen w-full bg-amber-700 px-10">
        <div className=" max-w-sm mx-auto pt-12 px-12 mb-6">
          <form className="relative" onSubmit={searchWord}>
            <input type="text" 
              placeholder="search word"
              className="bg-slate-100 w-full block rounded-3xl p-3"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <button className='absolute mx-2 right-3 top-1/2 -translate-y-1/2'>
              <FaSearch className='text-amber-500 hover:text-gray-800 cursor-pointer'/>
            </button>
          </form>
        </div>
        {result && (
        <div className="bg-slate-200 h-64 max-w-sm relative mx-auto rounded-3xl shadow-lg p-5">
          <div className="bg-slate-200 border h-full w-full rounded-3xl shadow-lg mx-auto max-h-64 pr-2 overflow-y-auto hide-scrollbar">
            <div className="container p-4">
              <h3>word : {result.word}</h3>
              <h3 className='flex gap-2 items-center'>Latin : {result.phonetics?.[0]?.text} 
                <FaVolumeUp 
                  onClick={playAudio}
                  className='cursor-pointer text-amber-700 hover:text-gray-800'/>
              </h3>
              <p>
                <strong>part of speech: {result.meanings[0]?.partOfSpeech}</strong>
                </p>
              <p>definiton : {result.meanings[0]?.definitions[0]?.definition}</p>
              <p>example : {result.meanings[0]?.definitions[0]?.example}</p>
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  )
}