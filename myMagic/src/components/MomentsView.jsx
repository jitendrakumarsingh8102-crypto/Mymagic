import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Sub-component for a single post card with carousel
const PostCard = ({ post, onLike, onDelete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Normalize and filter images array (handle old single-image posts and prevent broken cards)
  const rawImages = post.imageUrls && post.imageUrls.length > 0 
    ? post.imageUrls 
    : [post.imageUrl];
  
  const images = rawImages.filter(url => url && typeof url === 'string' && url.trim() !== "");

  // If no valid images, don't render the card at all
  if (images.length === 0) return null;

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[var(--blush-pink)] hover:shadow-2xl transition-shadow duration-300 relative group animate-fade-in">
      {/* Delete Button (Visible on hover) */}
      <button 
        onClick={() => { if(window.confirm('Delete this memory?')) onDelete(post._id); }}
        className="absolute top-4 right-4 z-30 bg-white/90 hover:bg-red-500 hover:text-white text-gray-600 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border-none cursor-pointer scale-90 hover:scale-100"
        title="Delete Post"
      >
        🗑️
      </button>

      {/* Image Section / Carousel */}
      <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {/* Image Counter (Instagram style) */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 z-20 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
            {currentIdx + 1}/{images.length}
          </div>
        )}

        {images.map((url, idx) => (
          <img 
            key={idx}
            src={url} 
            alt={`Moment ${idx + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
              idx === currentIdx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
            }`}
          />
        ))}

        {/* Carousel Arrows (More prominent) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImg}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white p-2.5 rounded-full shadow-lg transition-all border-none cursor-pointer hover:scale-110 ${currentIdx === 0 ? "opacity-30" : "opacity-100"}`}
              disabled={currentIdx === 0 && images.length > 2} // Optional: circular or limit?
            >
              <span className="text-[var(--rose-gold)] font-bold">❮</span>
            </button>
            <button 
              onClick={nextImg}
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white p-2.5 rounded-full shadow-lg transition-all border-none cursor-pointer hover:scale-110 ${currentIdx === images.length - 1 ? "opacity-30" : "opacity-100"}`}
            >
               <span className="text-[var(--rose-gold)] font-bold">❯</span>
            </button>
            
            {/* Dots (Instagram indicators) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 px-2 py-1.5 rounded-full bg-black/10 backdrop-blur-[2px]">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIdx ? "bg-white scale-125 shadow-sm" : "bg-white/40 scale-75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Interaction & Caption Section */}
      <div className="p-5 bg-white relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onLike(post._id)}
            className="text-3xl text-[var(--rose-gold)] hover:scale-125 transition-transform bg-transparent border-none cursor-pointer p-0 active:scale-95"
          >
            {post.likes > 0 ? '❤️' : '🤍'}
          </button>
          <span className="font-bold text-gray-800 tracking-tight">{post.likes} likes</span>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-900 leading-relaxed text-sm md:text-base">
            <span className="font-bold mr-2 text-[var(--rose-gold)] hover:underline cursor-pointer">rishabh_magic</span> 
            {post.caption}
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">
            {new Date(post.createdAt).toLocaleDateString(undefined, { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

const MomentsView = ({ onNavigate }) => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const bgContainerRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const heartContainer = bgContainerRef.current;
    if (!heartContainer) return;

    const createBubble = () => {
      const bubble = document.createElement("span");
      bubble.textContent = "Radhe Radhe";
      bubble.style.left = Math.random() * 100 + "%";
      bubble.style.fontSize = `${Math.random() * 0.5 + 0.8}rem`;
      bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
      heartContainer.appendChild(bubble);

      setTimeout(() => {
        if (heartContainer.contains(bubble)) bubble.remove();
      }, 15000);
    };

    const bubbleInterval = setInterval(createBubble, 800);

    for (let i = 0; i < 30; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${15 + Math.random() * 10}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heartContainer.appendChild(heart);
    }

    return () => clearInterval(bubbleInterval);
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://mymagic-backend.onrender.com';
      const response = await axios.get(`${apiBaseUrl}/api/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://mymagic-backend.onrender.com';
      const response = await axios.put(`${apiBaseUrl}/api/posts/${postId}/like`);
      setPosts((prev) => prev.map(p => p._id === postId ? { ...p, likes: response.data.likes } : p));
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (postId) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://mymagic-backend.onrender.com';
      await axios.delete(`${apiBaseUrl}/api/posts/${postId}`);
      setPosts((prev) => prev.filter(p => p._id !== postId));
    } catch (error) { console.error(error); }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 20); // Max 20
    setImageFiles(files);
    
    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    imageFiles.forEach(file => formData.append('images', file));
    formData.append('caption', caption);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://mymagic-backend.onrender.com';
      await axios.post(`${apiBaseUrl}/api/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchPosts();
      setIsModalOpen(false);
      setImageFiles([]);
      setPreviews([]);
      setCaption('');
    } catch (error) {
      console.error('Upload failed:', error);
      const serverMessage = error.response?.data?.message || error.message || 'Unknown error occurred.';
      alert(`Upload failed: ${serverMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden font-poppins"
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/placeholder.svg?height=1080&width=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="floating-hearts pointer-events-none" ref={bgContainerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>
      <nav className="fixed top-0 w-full bg-[var(--blush-pink)] shadow-md z-50 p-4 flex justify-between items-center">
        <button onClick={onNavigate} className="btn-small bg-[var(--ivory)] text-[var(--dark-text)] px-4 py-2 rounded-full border border-[var(--rose-gold)] font-medium hover:bg-[var(--rose-gold)] hover:text-white transition-all shadow-md">
          ❮ Home
        </button>
        <h1 className="text-2xl md:text-4xl text-[var(--rose-gold)] m-0 font-['Great_Vibes'] drop-shadow-md">Moments Gallery</h1>
        <div className="w-10 md:w-20"></div>
      </nav>

      <div className="pt-28 pb-10 max-w-[600px] mx-auto px-4 flex flex-col gap-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <div className="text-4xl animate-bounce">❤️</div>
            <div className="text-xl text-[var(--rose-gold)] font-['Great_Vibes'] animate-pulse">Loading Memories...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 italic mt-20">No moments yet. Add the first one!</div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} onLike={handleLike} onDelete={handleDelete} />
          ))
        )}
      </div>

      <button onClick={() => setIsModalOpen(true)} className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-tr from-[var(--rose-gold)] to-[var(--soft-gold)] text-white text-3xl rounded-full shadow-2xl hover:scale-110 transition-transform flex justify-center items-center z-40">
        +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setIsModalOpen(false); setPreviews([]); }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold border-none bg-transparent cursor-pointer">✕</button>
            <h2 className="text-3xl text-center text-[var(--rose-gold)] font-['Great_Vibes'] mb-6">Create New Memory</h2>
            
            <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--blush-pink)] rounded-xl p-6 hover:bg-[var(--ivory)] cursor-pointer transition-colors min-h-[150px] relative overflow-hidden">
                {previews.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto w-full p-2">
                    {previews.map((src, i) => (
                      <img key={i} src={src} alt="preview" className="w-20 h-20 object-cover rounded-lg flex-shrink-0 border-2 border-white shadow-sm" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-4xl block mb-2">📸</span>
                    <span className="text-[var(--rose-gold)] font-medium">Select up to 20 photos</span>
                  </div>
                )}
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>

              <textarea placeholder="Write a sweet caption..." value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[var(--rose-gold)] focus:outline-none min-h-[100px] resize-none" />

              <button type="submit" disabled={isUploading || imageFiles.length === 0} className="w-full bg-gradient-to-r from-[var(--rose-gold)] to-[var(--soft-gold)] text-white font-semibold py-3 rounded-xl disabled:opacity-50 transition-all hover:shadow-lg">
                {isUploading ? `Uploading ${imageFiles.length} photos...` : 'Share Moment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentsView;
