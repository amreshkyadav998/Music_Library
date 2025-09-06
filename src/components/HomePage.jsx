import { useState } from "react";
import { Search } from "lucide-react";
import { SongItem } from './SongItem'; // Named import

const HomePage = ({ songs, dispatch, role }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {getGreeting()}
          </h1>
          <p className="text-gray-600 mt-1">Ready to discover some music?</p>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search any song!"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      {filteredSongs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="text-gray-400" size={48} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No songs yet</h3>
          <p className="text-gray-600 mb-6">
            Add your first song using the sidebar to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Music ({filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''})
          </h2>
          <div className="space-y-3">
            {filteredSongs.map((song) => (
              <SongItem key={song.id} song={song} role={role} dispatch={dispatch} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;