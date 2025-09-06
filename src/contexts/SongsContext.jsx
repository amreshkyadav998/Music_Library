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

// import { createContext, useReducer, useEffect } from 'react';

// const initialSongs = [
//   { id: 1, title: 'Song A', artist: 'Artist X', album: 'Album 1' },
//   { id: 2, title: 'Song B', artist: 'Artist Y', album: 'Album 2' },
//   { id: 3, title: 'Song C', artist: 'Artist X', album: 'Album 1' },
// ];

// const songsReducer = (state, action) => {
//   switch (action.type) {
//     case 'INITIALIZE':
//       return action.payload;
//     case 'ADD_SONG':
//       return [...state, { id: Date.now(), ...action.payload }];
//     case 'DELETE_SONG':
//       return state.filter((song) => song.id !== action.payload);
//     default:
//       return state;
//   }
// };

// export const SongsContext = createContext();

// export const SongsProvider = ({ children, initialSongs: propSongs, dispatch: propDispatch }) => {
//   const [songs, dispatch] = useReducer(songsReducer, []);

//   useEffect(() => {
//     const savedSongs = localStorage.getItem('songs');
//     if (savedSongs) {
//       try {
//         dispatch({ type: 'INITIALIZE', payload: JSON.parse(savedSongs) });
//       } catch (e) {
//         console.error('Failed to parse saved songs:', e);
//         dispatch({ type: 'INITIALIZE', payload: propSongs || initialSongs });
//       }
//     } else {
//       dispatch({ type: 'INITIALIZE', payload: propSongs || initialSongs });
//     }
//   }, [propSongs]);

//   useEffect(() => {
//     localStorage.setItem('songs', JSON.stringify(songs));
//   }, [songs]);

//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'songs' && e.newValue) {
//         try {
//           const updatedSongs = JSON.parse(e.newValue);
//           if (JSON.stringify(songs) !== JSON.stringify(updatedSongs)) {
//             dispatch({ type: 'INITIALIZE', payload: updatedSongs });
//           }
//         } catch (e) {
//           console.error('Failed to parse storage change:', e);
//         }
//       }
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [songs]);

//   const value = { songs, dispatch: propDispatch || dispatch };

//   return (
//     <SongsContext.Provider value={value}>
//       {children}
//     </SongsContext.Provider>
//   );
// };




import { createContext, useReducer, useEffect } from 'react';

const initialSongs = [
  { id: 1, title: "Song One", artist: "Artist A", album: "Album X", url: "/i_will_be_there_4_u.mp3", image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFpbnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 2, title: "Song Two", artist: "Artist B", album: "Album Y", url: "/bulleya.mp3", image: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 3, title: "Song Three", artist: "Artist C", album: "Album Z", url: "/i_will_be_there_4_u.mp3", image: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 4, title: "Song Four", artist: "Artist D", album: "Album X", url: "/bulleya.mp3", image: "https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg?w=300" },
  { id: 5, title: "Song Five", artist: "Artist E", album: "Album Y", url: "/i_will_be_there_4_u.mp3", image: "https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg?w=300" },
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