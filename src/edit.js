import { useState } from 'react';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

function EditByNum() {
  const [num, setNum] = useState('');
  const [formData, setFormData] = useState({
    race: '',
    first: '',
    second: '',
    third: ''
  });

  const handleSearch = async () => {
    const q = query(collection(db, 'mydata'), where('num', '==', Number(num)));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      alert('該当データが見つかりません');
      return;
    }

    const docData = snapshot.docs[0]; // 最初の一致データのみ
    setFormData({
      race: docData.data().race,
      first: docData.data().first,
      second: docData.data().second,
      third: docData.data().third,
    });
  };

  const handleUpdate = async () => {
    const q = query(collection(db, 'mydata'), where('num', '==', Number(num)));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      alert('更新対象が見つかりません');
      return;
    }

    const targetDoc = snapshot.docs[0];
    const docRef = targetDoc.ref;

    await updateDoc(docRef, {
      race: formData.race,
      first: formData.first,
      second: formData.second,
      third: formData.third
    });

    alert('更新完了！');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className='max-w-xl mx-auto p-6 bg-white shadow rounded mt-10'>
      <h2 className='text-xl font-bold mb-4'>戦数を指定してデータ編集</h2>
      <input
        type="number"
        placeholder="第◯戦（数字）を入力"
        value={num}
        onChange={(e) => setNum(e.target.value)}
        className='w-full mb-4 p-2 border'
      />
      <button onClick={handleSearch} className='bg-gray-500 text-white px-4 py-2 rounded mb-6'>検索</button>

      <input name="race" placeholder="開催地" value={formData.race} onChange={handleChange} className='w-full mb-2 p-2 border' />
      <input name="first" placeholder="1位" value={formData.first} onChange={handleChange} className='w-full mb-2 p-2 border' />
      <input name="second" placeholder="2位" value={formData.second} onChange={handleChange} className='w-full mb-2 p-2 border' />
      <input name="third" placeholder="3位" value={formData.third} onChange={handleChange} className='w-full mb-4 p-2 border' />

      <button onClick={handleUpdate} className='bg-blue-600 text-white px-4 py-2 rounded'>更新する</button>
    </div>
  );
}

export default EditByNum;
