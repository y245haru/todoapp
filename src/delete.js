// src/delete.js
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

function DeleteUser() {
  const [users, setUsers] = useState([]);

  // Firestoreからユーザー一覧を取得
  const fetchUsers = async () => {
    const usersCol = collection(db, 'mydata');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ユーザー削除関数
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('本当に削除しますか？');
    if (!confirmDelete) return;

    try {
        console.log(id);
      await deleteDoc(doc(db, 'mydata', id));
      alert('削除しました');
      fetchUsers(); // 再取得
    } catch (error) {
      alert('削除に失敗しました: ' + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className='text-2xl font-semibold mb-6 text-center text-gray-700'>データ削除ページ</h2>
      <ul className='space-y-4'>
        {users.map(user => (
          <li 
            key={user.id}
            className='flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200'
          >
            {user.num} - {user.race} - {user.first} - {user.second} - {user.third}
            &nbsp;
            <button onClick={() => deleteUser(user.id)}
              className='mt-2 sm:mt-0 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors duration-200'
            >削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteUser;
