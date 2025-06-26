// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddUser from './add';
import DeleteUser from './delete';
import FindUser from './find';
import EditUser from './edit';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy} from 'firebase/firestore';
import { db, auth, provider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
function App() {
  const [user, setUser] = useState(null); // Firebaseユーザー
  const [dbUsers, setdbUsers] = useState([]); // Firesroreのデータ
  useEffect(() => {
    // Firestoreからusersコレクションを取得
    const fetchUsers = async () => {
      const usersCol = query(collection(db, 'mydata'),orderBy('num'));
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setdbUsers(userList);
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    fetchUsers();
    
    return () => unsubscribe();


  }, []);

  // Googleログイン処理
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("ログインエラー :", error);
    }
  };
  // ログアウト処理
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトエラー :", error);
    }
  };
  return (
    <Router>
      <Navigation /> {/* ← ナビゲーションをここに表示 */}
      <div className="p-4 flex justify-end bg-gray-100">
        {user ? (
          <div>
            <span className="mr-4">こんにちは、 {user.displayName} さん</span>
            <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">ログアウト </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">Googleでログイン </button>
        )}
      </div>
      <Routes>
        <Route path="/" element={
          <div className='max-w-3xl mx-auto p-6'>
            <h1 className='text-2xl font-semibold mb-6 text-center text-gray-700'>今シーズンのF1TOP3</h1>
            <table className='table-auto border-collapse border border-gray-400 w-full text-left mx-auto'>
              <tr>
                <td className=' px-4 py-2 bg-gray-200'>開催</td>
                <td className=' px-4 py-2 bg-gray-200'>開催地</td>
                <td className=' px-4 py-2 bg-gray-200'>１位</td>
                <td className=' px-4 py-2 bg-gray-200'>２位</td>
                <td className=' px-4 py-2 bg-gray-200'>３位</td>
              </tr>
              {user ? (
                <tbody>
                  {dbUsers.map(dbuser => (
                    <tr key={user.id} className='border-b-2 border-gray-400'>
                      <td className='p-4'>第{dbuser.num}戦</td>
                      <td className='p-4'>{dbuser.race}</td>
                      <td className='p-4'>{dbuser.first}</td>
                      <td className='p-4'>{dbuser.second}</td>
                      <td className='p-4'>{dbuser.third}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr><th colSpan={5} className="text-gray-600 mt-4">ログインするとデータが見られます。 </th></tr>
                </tbody>
              )}

            </table>
          </div>
        } />
        {user ? (
          <>
            <Route path="/add" element={<AddUser />} />
            <Route path="/delete" element={<DeleteUser />} />
            <Route path="/find" element={<FindUser />} />
            <Route path="/edit" element={<EditUser />} />
          </>
        ) : (
          <>
            <Route path="/add" element={<p>ログインしてください </p>} />
            <Route path="/delete" element={<p>ログインしてください </p>} />
            <Route path="/find" element={<p>ログインしてください </p>} />
            <Route path="/edit" element={<p>ログインしてください </p>} />
          </>
        )}
      </Routes>
    </Router>
  );
}
export default App;