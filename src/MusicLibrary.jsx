// // import SongList from './components/SongList';
// // import AddSongForm from './components/AddSongForm';
// // import { SongsProvider } from './contexts/SongsContext';

// // const MusicLibrary = ({ role }) => {
// //   return (
// //     <SongsProvider>
// //       <div className="text-gray-900 dark:text-white">
// //         {role === 'admin' && <AddSongForm />}
// //         <SongList role={role} />
// //       </div>
// //     </SongsProvider>
// //   );
// // };

// // export default MusicLibrary;

// import SongList from './components/SongList';
// import AddSongForm from './components/AddSongForm';

// const MusicLibrary = ({ role, songs, dispatch }) => {
//   return (
//     <div className="text-gray-900 dark:text-white">
//       {role === 'admin' && <AddSongForm dispatch={dispatch} />}
//       <SongList role={role} songs={songs} dispatch={dispatch} />
//     </div>
//   );
// };

// export default MusicLibrary;


import SongList from './components/SongList';
import AddSongForm from './components/AddSongForm';

const MusicLibrary = ({ role, songs, dispatch }) => {
  return (
    <div className="text-gray-900 dark:text-white">
      {role === 'admin' && <AddSongForm dispatch={dispatch} />}
      <SongList role={role} songs={songs} dispatch={dispatch} />
    </div>
  );
};

export default MusicLibrary;