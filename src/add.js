// src/add.js
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';



function AddUser() {
  const [num, setNum] = useState('');
  const [race, setRace] = useState('');
  const [first, setFirst] = useState('');
  const [second, setSec] = useState('');
  const [third, setThi] = useState('');
  const navigate = useNavigate(); // ページ遷移用

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'mydata'), {
        num: parseInt(num),
        race,
        first,
        second,
        third
      });
      alert('データを追加しました');
      navigate('/'); // 追加後トップページへ戻る
    } catch (error) {
      alert('追加に失敗しました: ' + error.message);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md'>
      <h1 className='text-2xl font-bold mb-6 text-center text-gray-700'>データ追加</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label>開催</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='block mb-1 text-gray-600'>開催地：</label>
          <input 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={race} 
            onChange={(e) => setRace(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>１位：</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            required
          />
        </div>
        <div>
          <label>２位：</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={second}
            onChange={(e) => setSec(e.target.value)}
            required
          />
        </div>
        <div>
          <label>３位：</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={third}
            onChange={(e) => setThi(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit"
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200'
          >追加</button>
      </form>
    </div>
  );
}

export default AddUser;
