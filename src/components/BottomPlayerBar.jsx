import { SkipBack, SkipForward, Volume2, Pause, Play } from "lucide-react";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const BottomPlayerBar = ({ 
  currentSong, 
  isPlaying, 
  onPlayPause, 
  currentTime, 
  duration, 
  onSeek, 
  volume, 
  onVolumeChange,
  onPrevious,
  onNext 
}) => {
  if (!currentSong) return null;

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div 
          className="w-full h-1 bg-gray-200 rounded-full cursor-pointer mb-3"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-200"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {currentSong.image && (
              <img
                src={currentSong.image}
                alt={currentSong.title}
                className="w-12 h-12 object-cover rounded-lg"
              />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentSong.title}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SkipBack size={18} />
            </button>
            
            <button
              onClick={onPlayPause}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button
              onClick={onNext}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Time and Volume */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-gray-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-16 accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayerBar;