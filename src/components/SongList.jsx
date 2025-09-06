import { useState } from 'react';
// import SongItem from './SongItem';

const SongList = ({ role, songs = [], dispatch }) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [groupBy, setGroupBy] = useState('none');

  // Safely filter with default empty array
  const filteredSongs = (songs || []).filter((song) =>
    Object.values(song).some((val) => val.toString().toLowerCase().includes(filter.toLowerCase()))
  );

  // Rest of the code remains the same
  const sortedSongs = [...filteredSongs].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  const groupedSongs = groupBy !== 'none'
    ? sortedSongs.reduce((acc, song) => {
        const key = song[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(song);
        return acc;
      }, {})
    : { all: sortedSongs };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border dark:bg-gray-800 dark:text-white"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border dark:bg-gray-800 dark:text-white">
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="album">Sort by Album</option>
        </select>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="p-2 border dark:bg-gray-800 dark:text-white">
          <option value="none">No Grouping</option>
          <option value="album">Group by Album</option>
          <option value="artist">Group by Artist</option>
        </select>
      </div>
      {Object.entries(groupedSongs).map(([group, groupSongs]) => (
        <div key={group}>
          {group !== 'all' && <h3 className="text-lg font-bold mb-2">{group}</h3>}
          <ul className="space-y-2">
            {groupSongs.map((song) => (
              <SongItem key={song.id} song={song} role={role} dispatch={dispatch} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SongList;