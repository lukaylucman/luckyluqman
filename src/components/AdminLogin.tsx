import React, { useState } from 'react';
import { Lock, Unlock, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin = () => {
  const { isAdmin, login, logout } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setIsOpen(false);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-gray-400 hover:text-white hover:bg-white/20 transition-all shadow-lg"
        title="Admin Login"
      >
        {isAdmin ? <Unlock size={20} /> : <Lock size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0f0c29] border border-white/10 p-6 rounded-2xl w-full max-w-md relative shadow-2xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {isAdmin ? 'Admin Panel' : 'Admin Login'}
              </h2>

              {isAdmin ? (
                <div className="text-center">
                  <p className="text-green-400 mb-6">Anda sudah login sebagai Admin.</p>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 transition-all font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#a855f7] transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#a855f7] transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                  >
                    Login
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminLogin;
