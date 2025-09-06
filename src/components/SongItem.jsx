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


// import { useRef, useState } from "react";
// import { Play, Pause, Trash2 } from "lucide-react";


// const SongItem = ({ song, role, dispatch }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlay = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleDelete = () => {
//     dispatch({ type: "DELETE_SONG", payload: song.id });
//   };

//   return (
//     <li className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition">
//       {/* Album Art */}
//       {song.image && (
//         <img
//           src={song.image}
//           alt={song.title}
//           className="w-14 h-14 object-cover rounded-lg shadow-md"
//         />
//       )}

//       {/* Song Info */}
//       <div className="flex-1">
//         <p className="text-gray-800 dark:text-gray-200 font-medium">
//           {song.title}
//         </p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           {song.artist} — {song.album}
//         </p>
//       </div>

//       {/* Controls */}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={togglePlay}
//           className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
//         >
//           {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//         </button>

//         <audio ref={audioRef} src={song.url} controls className="hidden" />

//         {role === "admin" && (
//           <button
//             onClick={handleDelete}
//             className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white"
//           >
//             <Trash2 size={16} />
//           </button>
//         )}
//       </div>
//     </li>
//   );
// };

// export default SongItem;




// import { useState , useRef } from "react";
// import { Play, Pause, Trash2} from "lucide-react";

// // Song reducer
// const songReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_SONG":
//       return [...state, action.payload];
//     case "DELETE_SONG":
//       return state.filter(song => song.id !== action.payload);
//     default:
//       return state;
//   }
// };

// // Initial songs data
// const initialSongs = [
//   {
//     id: 1,
//     title: "Sample Song 1",
//     artist: "Artist One",
//     album: "Album A",
//     url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
//     image: "https://via.placeholder.com/150"
//   },
//   {
//     id: 2,
//     title: "Sample Song 2",
//     artist: "Artist Two",
//     album: "Album B",
//     url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
//     image: "https://via.placeholder.com/150"
//   }
// ];

// // SongItem Component
// const SongItem = ({ song, role, dispatch, isCompact = false }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlay = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleDelete = () => {
//     dispatch({ type: "DELETE_SONG", payload: song.id });
//   };

//   return (
//     <div className={`flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-all ${isCompact ? 'p-3' : ''}`}>
//       {song.image && (
//         <img
//           src={song.image}
//           alt={song.title}
//           className={`object-cover rounded-lg ${isCompact ? 'w-12 h-12' : 'w-16 h-16'}`}
//         />
//       )}

//       <div className="flex-1 min-w-0">
//         <p className={`text-gray-900 font-medium truncate ${isCompact ? 'text-sm' : ''}`}>
//           {song.title}
//         </p>
//         <p className={`text-gray-600 truncate ${isCompact ? 'text-xs' : 'text-sm'}`}>
//           {song.artist} {song.album && `• ${song.album}`}
//         </p>
//       </div>

//       <div className="flex items-center gap-2">
//         <button
//           onClick={togglePlay}
//           className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
//         >
//           {isPlaying ? <Pause size={16} /> : <Play size={16} />}
//         </button>

//         <audio ref={audioRef} src={song.url} className="hidden" />

//         {role === "admin" && (
//           <button
//             onClick={handleDelete}
//             className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
//           >
//             <Trash2 size={14} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export {songReducer, initialSongs, SongItem};


import { useState, useRef } from "react";
import { Play, Pause, Trash2 } from "lucide-react";

// Song reducer
const songReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SONG":
      return [...state, action.payload];
    case "DELETE_SONG":
      return state.filter(song => song.id !== action.payload);
    default:
      return state;
  }
};

// Initial songs data
const initialSongs = [
  {
    id: 1,
    title: "Sample Song 1",
    artist: "Artist One",
    album: "Album A",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    title: "Sample Song 2",
    artist: "Artist Two",
    album: "Album B",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    image: "https://via.placeholder.com/150"
  }
];

// SongItem Component
const SongItem = ({ song, role, dispatch, isCompact = false }) => {
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
    <div className={`flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-all ${isCompact ? 'p-3' : ''}`}>
      {song.image && (
        <img
          src={song.image}
          alt={song.title}
          className={`object-cover rounded-lg ${isCompact ? 'w-12 h-12' : 'w-16 h-16'}`}
        />
      )}

      <div className="flex-1 min-w-0">
        <p className={`text-gray-900 font-medium truncate ${isCompact ? 'text-sm' : ''}`}>
          {song.title}
        </p>
        <p className={`text-gray-600 truncate ${isCompact ? 'text-xs' : 'text-sm'}`}>
          {song.artist} {song.album && `• ${song.album}`}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <audio ref={audioRef} src={song.url} className="hidden" />

        {role === "admin" && (
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export { songReducer, initialSongs, SongItem };