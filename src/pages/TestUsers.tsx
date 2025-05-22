import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const TestUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        setError(error.message);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">ユーザー一覧</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="bg-white rounded shadow p-4">
            <div>名前: {user.name}</div>
            <div>リベネーム: {user.livename}</div>
            <div>URL: {user.profile_url}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestUsers; 