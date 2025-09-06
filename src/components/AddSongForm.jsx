// import { useState } from 'react';

// const AddSongForm = ({ dispatch }) => {
//   const [title, setTitle] = useState('');
//   const [artist, setArtist] = useState('');
//   const [album, setAlbum] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch({ type: 'ADD_SONG', payload: { title, artist, album } });
//     setTitle('');
//     setArtist('');
//     setAlbum('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-700 rounded mb-4">
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="block mb-2 p-2 border dark:bg-gray-800 dark:text-white"
//         required
//       />
//       <input
//         type="text"
//         placeholder="Artist"
//         value={artist}
//         onChange={(e) => setArtist(e.target.value)}
//         className="block mb-2 p-2 border dark:bg-gray-800 dark:text-white"
//         required
//       />
//       <input
//         type="text"
//         placeholder="Album"
//         value={album}
//         onChange={(e) => setAlbum(e.target.value)}
//         className="block mb-2 p-2 border dark:bg-gray-800 dark:text-white"
//         required
//       />
//       <button type="submit" className="bg-green-500 text-white p-2">Add Song</button>
//     </form>
//   );
// };

// export default AddSongForm;



import { useState } from "react";

const AddSongForm = ({ dispatch }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_SONG",
      payload: { 
        id: Date.now(),
        title,
        artist,
        album,
        url,
        image
      },
    });
    setTitle("");
    setArtist("");
    setAlbum("");
    setUrl("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        ➕ Add a New Song
      </h2>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-red-50 dark:bg-gray-700 dark:text-black"
          required
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-red-50 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="text"
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-red-50 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="url"
          placeholder="Song URL (MP3 link)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-red-50 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="url"
          placeholder="Album Art URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-red-50 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition"
        >
          Add Song
        </button>
      </div>
    </form>
  );
};

export default AddSongForm;
