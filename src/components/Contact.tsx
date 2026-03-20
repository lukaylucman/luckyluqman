import React, { useState, useEffect } from "react";
import { Share2, MessageSquare, Linkedin, Instagram, Youtube, Github, Music, Send, User, Mail, Trash2, Pin, PinOff, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAdmin } from '../context/AdminContext';
import Swal from 'sweetalert2';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string;
    providerInfo?: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {},
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: any;
  isPinned?: boolean;
}

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

const Contact = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      
      // Sort pinned comments to the top
      commentsData.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0; // Keep the original createdAt desc order for others
      });
      
      setComments(commentsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'comments');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'comments'), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp()
      });
      setName('');
      setMessage('');
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Komentar Anda telah terkirim.',
        background: '#030014',
        color: '#fff',
        confirmButtonColor: '#a855f7'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'comments');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: "Komentar yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
      background: '#030014',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'comments', id));
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Komentar berhasil dihapus.',
          background: '#030014',
          color: '#fff',
          confirmButtonColor: '#a855f7'
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `comments/${id}`);
      }
    }
  };

  const handlePin = async (id: string, currentStatus: boolean) => {
    if (!isAdmin) return;
    try {
      await updateDoc(doc(db, 'comments', id), {
        isPinned: !currentStatus
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `comments/${id}`);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Baru saja';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <section id="Contact" className="pt-10 pb-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Hubungi Saya
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#6366f1]/10 to-transparent rounded-full blur-3xl -z-10"></div>
            
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Contact Info</h3>
              <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
            <p className="text-gray-400 mb-8 text-sm sm:text-base">Silakan hubungi saya melalui email atau nomor telepon di bawah ini.</p>
            
            <div className="flex flex-col gap-5">
              <a href="mailto:luckylukmanulhakim04@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-[#030014]/50 border border-white/5 hover:border-[#a855f7]/50 hover:bg-[#a855f7]/10 transition-all duration-300 group">
                <div className="p-3 rounded-xl bg-[#a855f7]/20 text-[#a855f7] group-hover:scale-110 transition-transform flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h4 className="font-bold text-white">Email</h4>
                  <p className="text-sm text-gray-400 truncate">luckylukmanulhakim04@gmail.com</p>
                </div>
              </a>
              
              <a href="https://wa.me/62859110122200" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#030014]/50 border border-white/5 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all duration-300 group">
                <div className="p-3 rounded-xl bg-[#25D366]/20 text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h4 className="font-bold text-white">Phone / WhatsApp</h4>
                  <p className="text-sm text-gray-400 truncate">+62 859 1101 22200</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#030014]/50 border border-white/5 hover:border-[#6366f1]/50 hover:bg-[#6366f1]/10 transition-all duration-300 group">
                <div className="p-3 rounded-xl bg-[#6366f1]/20 text-[#6366f1] group-hover:scale-110 transition-transform flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h4 className="font-bold text-white">Location</h4>
                  <p className="text-sm text-gray-400 truncate">Subang, Jawa Barat</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full"></div>
              <h3 className="text-xl font-bold text-white">Connect With Me</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                href="https://www.linkedin.com/in/lucky-luqmanul-hakim-16319437b" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#030014]/50 border border-white/5 hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 transition-all duration-300 group">
                <div className="p-3 rounded-xl bg-[#0077b5]/20 text-[#0077b5] group-hover:scale-110 transition-transform">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">LinkedIn</h4>
                  <p className="text-sm text-gray-400">Let's Connect</p>
                </div>
              </motion.a>
              
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                href="https://www.instagram.com/luckyluqmn/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#030014]/50 border border-white/5 hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 transition-all duration-300 group">
                <div className="p-3 rounded-xl bg-[#E1306C]/20 text-[#E1306C] group-hover:scale-110 transition-transform">
                  <Instagram size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Instagram</h4>
                  <p className="text-sm text-gray-400">@luckyluqmn</p>
                </div>
              </motion.a>
              
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                href="https://github.com/lukaylucman" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#030014]/50 border border-white/5 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group">
                <div className="p-3 rounded-xl bg-white/10 text-white group-hover:scale-110 transition-transform">
                  <Github size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Github</h4>
                  <p className="text-sm text-gray-400">@lukaylucman</p>
                </div>
              </motion.a>

              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                href="https://www.tiktok.com/@luckyluqman?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#030014]/50 border border-white/5 hover:border-[#00f2fe]/50 hover:bg-[#00f2fe]/10 transition-all duration-300 group">
                <div className="p-3 rounded-xl bg-[#00f2fe]/20 text-[#00f2fe] group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">TikTok</h4>
                  <p className="text-sm text-gray-400">@luckyluqman</p>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Comments */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col h-full relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#a855f7]/10 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
            <div className="p-2 rounded-full bg-[#a855f7]/20 text-[#a855f7]">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">Comments <span className="text-[#a855f7]">({comments.length})</span></h3>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                required
                className="w-full bg-[#030014]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message <span className="text-red-500">*</span></label>
              <textarea 
                placeholder="Write your message here..." 
                rows={3} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                required
                className="w-full bg-[#030014]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1" style={{maxHeight: '400px'}}>
            <AnimatePresence>
              {comments.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10 text-gray-500 flex flex-col items-center gap-3"
                >
                  <MessageSquare size={30} className="opacity-50" />
                  <p>Belum ada komentar. Jadilah yang pertama!</p>
                </motion.div>
              ) : (
                comments.map((comment, index) => (
                  <motion.div 
                    key={comment.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-4 rounded-2xl border group relative ${
                      comment.isPinned 
                        ? 'bg-[#a855f7]/10 border-[#a855f7]/30' 
                        : 'bg-[#030014]/50 border-white/5'
                    }`}
                  >
                    {comment.isPinned && (
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#a855f7] mb-3 uppercase tracking-wider">
                        <Pin size={14} />
                        Komentar Disematkan
                      </div>
                    )}
                    <div className="flex gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                        style={{ backgroundColor: stringToColor(comment.name) }}
                      >
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-white break-words">
                            {comment.name.length > 6 ? comment.name.slice(0, 6) + '...' : comment.name}
                            {isAdmin && comment.name.toLowerCase() === 'luckyluqman' && (
                              <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-[#a855f7]/20 text-[#a855f7] font-medium">Admin</span>
                            )}
                          </span>
                          <span className="text-xs text-gray-500 flex-shrink-0">{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1 break-words whitespace-pre-wrap">{comment.message}</p>
                      </div>
                    </div>
                    {/* Admin Actions */}
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => handlePin(comment.id, !!comment.isPinned)}
                          className={`p-2 rounded-lg transition-all ${
                            comment.isPinned 
                              ? 'bg-[#a855f7]/20 text-[#a855f7] hover:bg-[#a855f7]/30' 
                              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                          title={comment.isPinned ? "Lepas Sematan" : "Sematkan Komentar"}
                        >
                          {comment.isPinned ? <PinOff size={16} /> : <Pin size={16} />}
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                          title="Hapus Komentar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
