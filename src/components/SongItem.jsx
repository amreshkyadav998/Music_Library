// import { useContext } from 'react';

// const SongItem = ({ song, role, dispatch }) => {
//   const handleDelete = () => {
//     dispatch({ type: 'DELETE_SONG', payload: song.id });
//   };

//   return (
//     <li className="flex justify-between items-center p-2 border-b dark:border-gray-600">
//       <span>{song.title} - {song.artist} ({song.album})</span>
//       {role === 'admin' && (
//         <button onClick={handleDelete} className="text-red-500">Delete</button>
//       )}
//     </li>
//   );
// };

// export default SongItem;


import { useRef, useState } from "react";
import { Play, Pause, Trash2 } from "lucide-react";


const SongItem = ({ song, role, dispatch }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_SONG", payload: song.id });
  };

  return (
    <li className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition">
      {/* Album Art */}
      {song.image && (
        <img
          src={song.image}
          alt={song.title}
          className="w-14 h-14 object-cover rounded-lg shadow-md"
        />
      )}

      {/* Song Info */}
      <div className="flex-1">
        <p className="text-gray-800 dark:text-gray-200 font-medium">
          {song.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {song.artist} — {song.album}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <audio ref={audioRef} src={song.url} controls className="hidden" />

        {role === "admin" && (
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </li>
  );
};

export default SongItem;

