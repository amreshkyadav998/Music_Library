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
    <div className="max-w-xl mx-auto space-y-6 mt-[-15px]">
      <h2 className="text-2xl font-bold text-gray-800">Add New Song</h2>
      <form className="bg-white shadow-lg border border-gray-800 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Song Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Artist *"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Album (optional)"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="url"
          placeholder="Song URL *"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="url"
          placeholder="Album Art URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;
