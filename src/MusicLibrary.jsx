import { useState, useRef, useEffect } from "react";
import { Plus, Home, Music, Heart, Settings, Menu, X } from "lucide-react";
import AddSongForm from "./components/AddSongForm";
import HomePage from "./components/HomePage";
import LibraryPage from "./components/LibraryPage";
import { SongItem } from "./components/SongItem";
import BottomPlayerBar from "./components/BottomPlayerBar";

const MusicLibrary = ({ songs, dispatch, role }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "library", label: "Library", icon: Music },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    console.log("Audio ref initialized:", audio);

    const updateTime = () => {
      console.log("Time update triggered, currentTime:", audio.currentTime);
      setCurrentTime(audio.currentTime);
    };
    const setDur = () => {
      console.log("Duration loaded:", audio.duration);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setDur);
    audio.addEventListener("ended", () => {
      console.log("Song ended");
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setDur);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [currentSong]);

  // Effect 1: Load new song only when currentSong changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    console.log("Setting audio source to:", currentSong.url);
    audioRef.current.src = currentSong.url;
    audioRef.current.currentTime = 0; // reset to start when new song loads
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback failed:", err));
    }
  }, [currentSong]);

  // Effect 2: Play/Pause toggle
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback failed:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Effect 3: Volume control (independent)
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const onPlayPause = () => {
    if (!audioRef.current) return;
    setIsPlaying(!isPlaying);
  };

  const onSeek = (time) => {
    if (audioRef.current) {
      console.log("Seeking to:", time);
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const onVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const onPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex > 0) {
      console.log("Going to previous song, index:", currentIndex - 1);
      setCurrentSong(songs[currentIndex - 1]);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const onNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    if (currentIndex < songs.length - 1) {
      console.log("Going to next song, index:", currentIndex + 1);
      setCurrentSong(songs[currentIndex + 1]);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomePage
            songs={songs}
            dispatch={dispatch}
            role={role}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            currentSong={currentSong}
          />
        );
      case "library":
        return (
          <LibraryPage
            songs={songs}
            dispatch={dispatch}
            role={role}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            currentSong={currentSong}
          />
        );
      case "add-song":
        return <AddSongForm dispatch={dispatch} />;
      case "favorites":
        return (
          <div className="text-center py-16">
            <Heart className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Favorites
            </h2>
            <p className="text-gray-600">
              Your favorite songs will appear here
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-16">
            <Settings className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Settings
            </h2>
            <p className="text-gray-600">App settings and preferences</p>
          </div>
        );
      default:
        return (
          <HomePage
            songs={songs}
            dispatch={dispatch}
            role={role}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            currentSong={currentSong}
          />
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Music className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Music Library</h1>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </div>
          {role === "admin" && (
            <button
              onClick={() => setActiveTab("add-song")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mt-6 bg-gray-800 text-white hover:bg-gray-700"
            >
              <Plus size={20} />
              Add Song
            </button>
          )}
        </div>
      </div>

      {/* Top Navbar for Mobile */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Music className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Music Library</h1>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-gray-100"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown menu on Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex flex-col space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
            {role === "admin" && (
              <button
                onClick={() => {
                  setActiveTab("add-song");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-left bg-gray-800 text-white hover:bg-gray-700"
              >
                <Plus size={20} />
                Add Song
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 md:p-8">{renderContent()}</div>

      {/* Bottom Player Bar */}
      <audio ref={audioRef} className="hidden" />
      <BottomPlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={onPlayPause}
        currentTime={currentTime}
        duration={duration}
        onSeek={onSeek}
        volume={volume}
        onVolumeChange={onVolumeChange}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
};

export default MusicLibrary;
