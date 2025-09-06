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



// import { useState } from "react";

// const AddSongForm = ({ dispatch }) => {
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [album, setAlbum] = useState("");
//   const [url, setUrl] = useState("");
//   const [image, setImage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch({
//       type: "ADD_SONG",
//       payload: {
//         id: Date.now(),
//         title,
//         artist,
//         album,
//         url,
//         image,
//       },
//     });

//     setTitle("");
//     setArtist("");
//     setAlbum("");
//     setUrl("");
//     setImage("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-blue-200 shadow-md p-8 mb-6 max-w-2xl mx-auto"
//     >
//       <h2 className="text-2xl font-semibold text-[#003da5] mb-6 border-b border-gray-300 pb-3">
//         Add New Song
//       </h2>

//       <div className="grid gap-5">
//         <input
//           type="text"
//           placeholder="Song Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="p-3 border border-gray-500 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//         />

//         <input
//           type="text"
//           placeholder="Artist"
//           value={artist}
//           onChange={(e) => setArtist(e.target.value)}
//           className="p-3 border border-gray-500 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//         />

//         <input
//           type="text"
//           placeholder="Album"
//           value={album}
//           onChange={(e) => setAlbum(e.target.value)}
//           className="p-3 border border-gray-500 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />

//         <input
//           type="url"
//           placeholder="Song URL (MP3 link)"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="p-3 border border-gray-500 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//         />

//         <input
//           type="url"
//           placeholder="Album Art URL"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//           className="p-3 border border-gray-500 text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />

//         <button
//           type="submit"
//           className="bg-indigo-600 text-white font-semibold py-3 transition hover:bg-indigo-700"
//         >
//           Add Song
//         </button>
//       </div>
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
    if (!title || !artist || !url) return;

    dispatch({
      type: "ADD_SONG",
      payload: {
        id: Date.now(),
        title,
        artist,
        album,
        url,
        image,
      },
    });

    setTitle("");
    setArtist("");
    setAlbum("");
    setUrl("");
    setImage("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Add New Song
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Fill in the details to add a new song to your playlist
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Song Title *
              </label>
              <input
                type="text"
                placeholder="Enter song title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Artist *
              </label>
              <input
                type="text"
                placeholder="Enter artist name"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Album
            </label>
            <input
              type="text"
              placeholder="Enter album name (optional)"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Song URL *
            </label>
            <input
              type="url"
              placeholder="https://example.com/song.mp3"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
            <p className="text-xs text-gray-500">
              Direct link to the MP3 file
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Album Art URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/album-art.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <p className="text-xs text-gray-500">
              Optional: URL to album artwork image
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
              Add Song
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddSongForm; 