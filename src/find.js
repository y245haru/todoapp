// src/find.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';


function FindUserPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCol = collection(db, 'mydata');
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
      setFilteredUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const kw = e.target.value;
    setKeyword(kw);

    const filtered = users.filter(user =>
      (user.first.toLowerCase().includes(kw.toLowerCase())) ||
      (user.second.toLowerCase().includes(kw.toLowerCase())) ||
      (user.third.toLowerCase().includes(kw.toLowerCase()))
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className='min-h-screen bg-gray-100 py-10 px-4'>
      <h2 className='text-2xl font-semibold mb-6 text-center text-gray-700'>TOP3検索ページ</h2>
      <input
        type="text"
        placeholder="名前で検索"
        value={keyword}
        onChange={handleSearch}
        style={{ marginBottom: '10px', padding: '5px' }}
        className='w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      <ul className='space-y-4'>
        {filteredUsers.map(user => (
          <li 
            key={user.id}
            className='bg-gray-50 p-4 rounded-md border border-gray-200'
          >
            {user.race} - {user.first} - {user.second} - {user.third}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FindUserPage;
