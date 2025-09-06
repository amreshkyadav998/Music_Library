// import { createContext, useReducer } from 'react';

// const initialSongs = [
//   { id: 1, title: 'Song A', artist: 'Artist X', album: 'Album 1' },
//   { id: 2, title: 'Song B', artist: 'Artist Y', album: 'Album 2' },
//   { id: 3, title: 'Song C', artist: 'Artist X', album: 'Album 1' },
//   // Add more hardcoded songs
// ];

// const songsReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_SONG':
//       return [...state, { id: Date.now(), ...action.payload }];
//     case 'DELETE_SONG':
//       return state.filter((song) => song.id !== action.payload);
//     default:
//       return state;
//   }
// };

// export const SongsContext = createContext();

// export const SongsProvider = ({ children }) => {
//   const [songs, dispatch] = useReducer(songsReducer, initialSongs);

//   return (
//     <SongsContext.Provider value={{ songs, dispatch }}>
//       {children}
//     </SongsContext.Provider>
//   );
// };

import { createContext, useReducer, useEffect } from 'react';

const initialSongs = [
  { id: 1, title: 'Song A', artist: 'Artist X', album: 'Album 1' },
  { id: 2, title: 'Song B', artist: 'Artist Y', album: 'Album 2' },
  { id: 3, title: 'Song C', artist: 'Artist X', album: 'Album 1' },
];

const songsReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload;
    case 'ADD_SONG':
      return [...state, { id: Date.now(), ...action.payload }];
    case 'DELETE_SONG':
      return state.filter((song) => song.id !== action.payload);
    default:
      return state;
  }
};

export const SongsContext = createContext();

export const SongsProvider = ({ children, initialSongs: propSongs, dispatch: propDispatch }) => {
  const [songs, dispatch] = useReducer(songsReducer, []);

  useEffect(() => {
    const savedSongs = localStorage.getItem('songs');
    if (savedSongs) {
      try {
        dispatch({ type: 'INITIALIZE', payload: JSON.parse(savedSongs) });
      } catch (e) {
        console.error('Failed to parse saved songs:', e);
        dispatch({ type: 'INITIALIZE', payload: propSongs || initialSongs });
      }
    } else {
      dispatch({ type: 'INITIALIZE', payload: propSongs || initialSongs });
    }
  }, [propSongs]);

  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'songs' && e.newValue) {
        try {
          const updatedSongs = JSON.parse(e.newValue);
          if (JSON.stringify(songs) !== JSON.stringify(updatedSongs)) {
            dispatch({ type: 'INITIALIZE', payload: updatedSongs });
          }
        } catch (e) {
          console.error('Failed to parse storage change:', e);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [songs]);

  const value = { songs, dispatch: propDispatch || dispatch };

  return (
    <SongsContext.Provider value={value}>
      {children}
    </SongsContext.Provider>
  );
};