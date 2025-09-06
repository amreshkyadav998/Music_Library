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
    title: "Bulleya",
    artist: "Artist One",
    album: "Album A",
    url: "/bulleya.mp3",
    image: "https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg?w=300"
  },
  {
    id: 2,
    title: "I will be there 4 u",
    artist: "Artist Two",
    album: "Album B",
    url: "/i_will_be_there_4_u.mp3",
    image: "https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg?w=300"
  }
];

// SongItem Component
const SongItem = ({ song, role, dispatch, isCompact = false, setCurrentSong, isPlaying, onPlayPause }) => {
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setCurrentSong(song); // Set this song as the current one
    onPlayPause(); // Toggle play/pause state
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
          {isPlaying && song.id === (setCurrentSong && setCurrentSong.id) ? <Pause size={16} /> : <Play size={16} />}
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

