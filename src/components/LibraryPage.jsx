import { useState } from "react";
import { SongItem } from "./SongItem";

const LibraryPage = ({
  songs = [],
  dispatch,
  role,
  setCurrentSong,
  isPlaying,
  onPlayPause,
  currentSong,
}) => {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [groupBy, setGroupBy] = useState("none");

  const filteredSongs = songs.filter((song) =>
    Object.values(song).some((val) =>
      val.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  const groupedSongs =
    groupBy !== "none"
      ? sortedSongs.reduce((acc, song) => {
          const key = song[groupBy] || "Unknown";
          if (!acc[key]) acc[key] = [];
          acc[key].push(song);
          return acc;
        }, {})
      : { "All Songs": sortedSongs };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Library</h1>
        <p className="text-gray-600">
          Organize and filter your music collection
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter
            </label>
            <input
              type="text"
              placeholder="Search in library..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group by
            </label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="none">No Grouping</option>
              <option value="album">Album</option>
              <option value="artist">Artist</option>
            </select>
          </div>
        </div>
        <div className="space-y-6">
          {Object.entries(groupedSongs).map(([group, groupSongs]) => (
            <div key={group}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {group} ({groupSongs.length})
              </h3>
              {/* Scrollable container */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {groupSongs.map((song) => (
                  <SongItem
                    key={song.id}
                    song={song}
                    role={role}
                    dispatch={dispatch}
                    isCompact
                    setCurrentSong={setCurrentSong}
                    isPlaying={isPlaying && currentSong?.id === song.id}
                    onPlayPause={onPlayPause}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
