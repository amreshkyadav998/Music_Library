import { useState, useReducer } from 'react';
import {Plus , Home , Music , Heart , Settings} from 'lucide-react';
import { songReducer, initialSongs } from './SongItem'; 
const Sidebar = () => {
  const [songs, dispatch] = useReducer(songReducer, initialSongs);
  const [activeTab, setActiveTab] = useState('home');
  const [role] = useState('admin'); // You can change this to 'user' to test different roles

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'library', label: 'Library', icon: Music },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage songs={songs} dispatch={dispatch} role={role} />;
      case 'library':
        return <LibraryPage songs={songs} dispatch={dispatch} role={role} />;
      case 'add-song':
        return <AddSongForm dispatch={dispatch} />;
      case 'favorites':
        return (
          <div className="text-center py-16">
            <Heart className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Favorites</h2>
            <p className="text-gray-600">Your favorite songs will appear here</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-16">
            <Settings className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Settings</h2>
            <p className="text-gray-600">App settings and preferences</p>
          </div>
        );
      default:
        return <HomePage songs={songs} dispatch={dispatch} role={role} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Music className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Music Library</h1>
          </div>
        </div>

        {/* Navigation */}
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
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Add Song Button */}
          {role === 'admin' && (
            <button
              onClick={() => setActiveTab('add-song')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mt-6 ${
                activeTab === 'add-song'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <Plus size={20} />
              Add Song
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;