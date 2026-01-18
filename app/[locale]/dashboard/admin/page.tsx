'use client';

// Mark this page as dynamic to prevent static pre-rendering at build time
// This is an interactive dashboard that requires client-side rendering
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storageService } from '@/lib/services/storageService';
import { supabaseService } from '@/lib/services/supabaseService';
import { cloudinaryService } from '@/lib/services/cloudinaryService';
import StyleManager from '@/app/components/StyleManager';
import AssetSelector from '@/app/components/AssetSelector';
import ImageUploadManager from '@/app/components/ImageUploadManager';
import RichTextEditor from '@/app/dashboard/components/RichTextEditor';
import ImagePreviewModal from '@/app/components/ImagePreviewModal';
import { Post, PortfolioItem, SiteSettings, Asset } from '@/lib/types';

const BACKEND_URL = '';

// Mock Folders for initial UI experience
const INITIAL_FOLDERS = [
  { id: 'f1', name: 'Hotel Ritz Campaign', count: 1 },
  { id: 'f2', name: 'Food Styling CDMX', count: 1 },
  { id: 'f3', name: 'Social Reels 2024', count: 1 }
];

export default function Admin() {
  const [tab, setTab] = useState<'posts' | 'portfolio' | 'assets' | 'style'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [settings, setSettings] = useState<SiteSettings>(storageService.getSettings());
  
  // Editor State
  const [postTitle, setPostTitle] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('Marketing');
  const [postLanguage, setPostLanguage] = useState<'es' | 'en'>('es');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
  // Asset Manager State
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [showImageUploadManager, setShowImageUploadManager] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  
  // Helpers
  const [showAssetSelectorForPost, setShowAssetSelectorForPost] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({ clientName: '', category: 'Hotel' as any, imageUrl: '', description: '' });
  const [showAssetSelectorForPortfolio, setShowAssetSelectorForPortfolio] = useState(false);

  useEffect(() => {
    loadPosts();
    setPortfolio(storageService.getPortfolio());
    fetchAssets();
  }, []);

  const loadPosts = async () => {
    const supabasePosts = await supabaseService.getPosts();
    if (supabasePosts.length > 0) {
      setPosts(supabasePosts);
    } else {
      // Fallback to localStorage if Supabase is unavailable
      const cachedPosts = storageService.getPosts();
      if (cachedPosts.length > 0) {
        console.info('Using cached posts from localStorage');
        setPosts(cachedPosts);
      } else {
        setPosts([]);
      }
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/assets`);
      if (response.ok) {
        const cloudData = await response.json();
        const localAssets = storageService.getAssets();
        // If empty, add some high-end placeholders with folder associations
        const placeholders: (Asset & { folderId?: string })[] = localAssets.length === 0 ? [
          { id: 'a1', name: 'Ritz Lobby.jpg', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', type: 'image', createdAt: 'Oct 2024', folderId: 'f1' },
          { id: 'a2', name: 'Artisan Mezcal.png', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', type: 'image', createdAt: 'Oct 2024', folderId: 'f2' },
          { id: 'a3', name: 'Fine Dining Detail.jpg', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', type: 'image', createdAt: 'Oct 2024', folderId: 'f3' }
        ] : [];

        const merged = [...cloudData, ...localAssets, ...placeholders].filter((v, i, a) => 
            a.findIndex(t => t.url === v.url) === i
        );
        setAssets(merged);
      } else {
        setAssets(storageService.getAssets());
      }
    } catch (e) {
      setAssets(storageService.getAssets());
    }
  };

  const handleAssetUpload = (newAsset: Asset) => {
    // Add to local state
    setAssets([newAsset, ...assets]);
    
    // Persist to local storage
    const allAssets = [newAsset, ...assets];
    storageService.saveAssets(allAssets);
    
    // Close upload manager
    setShowImageUploadManager(false);
  };

  const handleSavePost = async () => {
    const htmlContent = postContent || '';
    if (!postTitle || !htmlContent) {
      console.log('Save blocked: missing title or content', { postTitle, htmlContent: htmlContent?.length });
      return;
    }

    const excerpt = stripHtml(htmlContent).substring(0, 100) + '...';

    if (editingPostId) {
      console.log('Updating post:', { editingPostId, postTitle });
      const updated = await supabaseService.updatePost(editingPostId, {
        title: postTitle,
        content: htmlContent,
        image: postImage,
        category: postCategory,
        excerpt,
        published: true,
        language: postLanguage,
      });
      
      console.log('Update result:', updated);
      if (updated) {
        setPosts(posts.map(p => p.id === editingPostId ? updated : p));
        setEditingPostId(null);
      } else {
        console.log('Update failed - updated is null');
      }
    } else {
      console.log('Creating new post:', { postTitle });
      const newPost = await supabaseService.createPost({
        title: postTitle,
        content: htmlContent,
        image: postImage,
        category: postCategory,
        excerpt,
        published: true,
        language: postLanguage,
      });
      
      console.log('Create result:', newPost);
      if (newPost) {
        setPosts([newPost, ...posts]);
      }
    }
    
    setPostTitle('');
    setPostImage('');
    setPostContent('');
    setPostCategory('Marketing');
    setPostLanguage('es');
  };

  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id || null);
    setPostTitle(post.title);
    setPostImage(post.image);
    setPostContent(post.content);
    setPostCategory(post.category);
    setPostLanguage(post.language || 'es');
    setTab('posts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const toggleAssetSelection = (id: string) => {
    setSelectedAssetIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (confirm(`Return ${selectedAssetIds.length} artifacts to the void?`)) {
      setAssets(prev => prev.filter(a => !selectedAssetIds.includes(a.id || (a as any)._id)));
      setSelectedAssetIds([]);
    }
  };

  const handleDeleteAsset = async (assetId: string, cloudinaryId?: string) => {
    if (!confirm('Vanish this artifact?')) return;

    try {
      setIsLoadingDelete(true);
      
      // Delete from Cloudinary if it has a cloudinary ID
      if (cloudinaryId) {
        const success = await cloudinaryService.deleteImage(cloudinaryId);
        if (!success) {
          console.error('Failed to delete from Cloudinary');
          alert('Failed to delete from Cloudinary. Please try again.');
          return;
        }
      }

      // Remove from local state
      setAssets(prev => prev.filter(a => (a.id || (a as any)._id) !== assetId));
      
      // Persist to storage
      const updated = assets.filter(a => (a.id || (a as any)._id) !== assetId);
      storageService.saveAssets(updated);
    } catch (error) {
      console.error('Error deleting asset:', error);
      alert('Error deleting asset. Please try again.');
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleCreateFolder = async () => {
    const folderPath = prompt('Enter folder path (e.g., my_folder or parent/child):');
    if (!folderPath?.trim()) return;

    try {
      setIsLoadingFolders(true);
      const response = await fetch('/api/cloudinary/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderPath: folderPath.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create folder');
      }

      const newFolder = await response.json();
      
      // Add to local folders state
      setFolders([...folders, {
        id: newFolder.path || folderPath.trim(),
        name: newFolder.name || folderPath.trim().split('/').pop() || 'New Folder',
        count: 0,
      }]);
    } catch (error) {
      console.error('Error creating folder:', error);
      alert(`Error creating folder: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingFolders(false);
    }
  };

  const handleRenameFolder = async (folderId: string, newName: string) => {
    if (!newName?.trim() || newName === folders.find(f => f.id === folderId)?.name) {
      setEditingFolderId(null);
      setEditingFolderName('');
      return;
    }

    try {
      setIsLoadingFolders(true);
      const response = await fetch('/api/cloudinary/folders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: folderId, toPath: newName.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to rename folder');
      }

      // Update local state
      setFolders(prev => 
        prev.map(f => f.id === folderId ? { ...f, id: newName.trim(), name: newName.trim().split('/').pop() || newName.trim() } : f)
      );

      setEditingFolderId(null);
      setEditingFolderName('');
    } catch (error) {
      console.error('Error renaming folder:', error);
      alert(`Error renaming folder: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingFolders(false);
    }
  };

  const handleDeleteFolder = async (folderId: string, folderName: string) => {
    if (!confirm(`Delete folder "${folderName}"? Assets in this folder will not be deleted.`)) return;

    try {
      setIsLoadingFolders(true);
      const response = await fetch('/api/cloudinary/folders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: folderId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete folder');
      }

      // Remove from local state
      setFolders(prev => prev.filter(f => f.id !== folderId));
      if (currentFolderId === folderId) {
        setCurrentFolderId(null);
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
      alert(`Error deleting folder: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingFolders(false);
    }
  };

  // Logic to filter assets based on current folder or search
  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(assetSearchQuery.toLowerCase());
    const matchesFolder = currentFolderId ? (a as any).folderId === currentFolderId : !(a as any).folderId;
    return matchesSearch && matchesFolder;
  });

  const currentFolder = folders.find(f => f.id === currentFolderId);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-serif mb-2 text-white">Alchemy Dashboard</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500">Refining the Sassy Studio Brand Identity</p>
        </div>
        <div className="flex bg-neutral-900 border border-white/5 p-1 rounded-sm shadow-2xl">
          {['posts', 'portfolio', 'assets', 'style'].map((t: any) => (
            <button 
              key={t}
              onClick={() => setTab(t)} 
              className={`px-8 py-3 text-[9px] uppercase tracking-[0.3em] transition-all duration-500 whitespace-nowrap ${tab === t ? 'text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`} 
              style={tab === t ? { backgroundColor: settings.secondaryColor } : {}}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'posts' && (
          <motion.div key="posts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8 bg-neutral-900/50 p-6 md:p-10 border border-white/5 rounded-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-serif italic text-white">
                  {editingPostId ? 'Refining Artifact' : 'Draft New Insight'}
                </h3>
                {editingPostId && (
                  <button 
                    onClick={() => { setEditingPostId(null); setPostTitle(''); setPostImage(''); setPostContent(''); }}
                    className="text-[10px] uppercase tracking-widest text-[#FC7CA4] hover:text-white transition-colors"
                  >
                    Discard Changes
                  </button>
                )}
              </div>
              <div className="space-y-6">
                <input 
                  className="w-full bg-black border border-white/10 p-5 text-xl font-serif italic text-white outline-none focus:border-[#FC7CA4] transition-all" 
                  placeholder="Artifact Title" 
                  value={postTitle} 
                  onChange={e => setPostTitle(e.target.value)} 
                />
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Content Narrative</label>
                  <div className="w-full bg-black border border-white/10 rounded-sm overflow-hidden">
                    <RichTextEditor 
                      value={postContent}
                      onChange={setPostContent}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Hero Asset URL</label>
                    <div className="flex gap-2">
                      <input 
                        className="flex-1 bg-black border border-white/10 p-4 text-sm text-white outline-none" 
                        placeholder="https://..." 
                        value={postImage} 
                        onChange={e => setPostImage(e.target.value)} 
                      />
                      <button onClick={() => setShowAssetSelectorForPost(true)} className="px-4 bg-white/5 border border-white/10 text-[9px] text-white uppercase hover:bg-white hover:text-black transition-all">Vault</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Category</label>
                    <select 
                      className="w-full bg-black border border-white/10 p-4 text-sm text-white outline-none uppercase tracking-widest cursor-pointer"
                      value={postCategory}
                      onChange={e => setPostCategory(e.target.value)}
                    >
                      <option>Marketing</option>
                      <option>Hotels</option>
                      <option>Gastronomy</option>
                      <option>Trends</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Language</label>
                    <select 
                      className="w-full bg-black border border-white/10 p-4 text-sm text-white outline-none uppercase tracking-widest cursor-pointer"
                      value={postLanguage}
                      onChange={e => setPostLanguage(e.target.value as 'es' | 'en')}
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
                <button 
                  onClick={handleSavePost} 
                  className="w-full py-6 text-black text-xs uppercase tracking-[0.5em] font-black shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all" 
                  style={{ backgroundColor: settings.secondaryColor }}
                >
                  {editingPostId ? 'Update Alchemical Artifact' : 'Secure to Library'}
                </button>
              </div>
            </div>
            <div className="lg:col-span-1 space-y-8">
              <h3 className="text-2xl font-serif text-white border-b border-white/5 pb-4">Library of Insights</h3>
              <div className="space-y-4 max-h-[800px] overflow-y-auto custom-scrollbar pr-2">
                {posts.length === 0 ? (
                  <p className="text-[10px] uppercase tracking-widest text-gray-600 italic">No artifacts discovered yet.</p>
                ) : posts.map(post => (
                  <div key={post.id} className="bg-neutral-900/40 border border-white/5 p-5 group rounded-sm transition-all hover:border-[#FC7CA4]/30">
                    <div className="flex gap-4 items-center mb-4">
                      <img src={post.image} className="w-16 h-16 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-lg text-white truncate">{post.title}</h4>
                        <p className="text-[8px] text-[#FC7CA4] uppercase tracking-widest font-bold">{post.category} • {post.language === 'es' ? 'ES' : 'EN'} • {post.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-white/5">
                      <button onClick={() => handleEditPost(post)} className="flex-1 bg-white/5 py-2 text-[9px] uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all">Refine</button>
                      <button onClick={async () => { if(confirm('Are you sure you want to return this to the void?')) { await supabaseService.deletePost(post.id!); setPosts(posts.filter(p => p.id !== post.id)); } }} className="flex-1 bg-red-900/10 py-2 text-[9px] uppercase tracking-widest text-red-900/60 hover:text-red-400 hover:bg-red-900/20 transition-all">Vanish</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'assets' && (
          <motion.div key="assets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 animate-fadeIn">
            {/* Asset Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/5">
              <div className="flex-1 w-full max-w-md relative">
                <input 
                  type="text" 
                  placeholder="Search Digital Vault..." 
                  className="w-full bg-neutral-900 border border-white/10 px-12 py-4 text-xs uppercase tracking-widest text-white outline-none focus:border-[#FC7CA4] transition-all"
                  value={assetSearchQuery}
                  onChange={e => setAssetSearchQuery(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                   onClick={handleCreateFolder}
                   disabled={isLoadingFolders}
                   className="flex-1 md:flex-none px-8 py-4 bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoadingFolders ? 'Creating...' : 'New Folder'}
                </button>
                <button 
                  onClick={() => setShowImageUploadManager(true)}
                  className="flex-1 md:flex-none px-10 py-4 bg-[#FC7CA4] text-black text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white transition-all disabled:opacity-50"
                >
                  Upload Artifact
                </button>
              </div>
            </div>

            {/* Breadcrumbs & Navigation */}
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em]">
              <button 
                onClick={() => setCurrentFolderId(null)}
                className={`transition-all ${!currentFolderId ? 'text-white font-black' : 'text-gray-600 hover:text-white'}`}
              >
                The Vault
              </button>
              {currentFolderId && (
                <>
                  <span className="text-gray-800">/</span>
                  <span className="text-[var(--accent)] font-black">{currentFolder?.name}</span>
                </>
              )}
            </div>

            {/* Folders Section - Only show when at root */}
            {!currentFolderId && (
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-black">Collections</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {folders.map(folder => (
                    <div 
                      key={folder.id} 
                      className="group relative"
                    >
                      {editingFolderId === folder.id ? (
                        <div className="bg-neutral-900/60 border border-white/5 p-5 rounded-sm flex flex-col gap-3">
                          <input
                            autoFocus
                            type="text"
                            value={editingFolderName}
                            onChange={(e) => setEditingFolderName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleRenameFolder(folder.id, editingFolderName);
                              if (e.key === 'Escape') {
                                setEditingFolderId(null);
                                setEditingFolderName('');
                              }
                            }}
                            className="bg-black/40 border border-white/10 px-2 py-2 text-[10px] text-white outline-none focus:border-[#FC7CA4]"
                            placeholder="Folder name"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRenameFolder(folder.id, editingFolderName)}
                              disabled={isLoadingFolders}
                              className="flex-1 bg-[#FC7CA4] text-black text-[8px] uppercase font-bold py-1 hover:bg-white transition-colors disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingFolderId(null);
                                setEditingFolderName('');
                              }}
                              className="flex-1 bg-white/10 text-white text-[8px] uppercase font-bold py-1 hover:bg-white/20 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div 
                            onClick={() => setCurrentFolderId(folder.id)}
                            className="cursor-pointer bg-neutral-900/60 border border-white/5 p-5 rounded-sm hover:border-[#FC7CA4]/30 transition-all flex items-center gap-4 group-hover:opacity-70"
                          >
                            <div className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">📁</div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] uppercase tracking-widest text-white truncate font-bold">{folder.name}</p>
                              <p className="text-[8px] text-gray-600 uppercase tracking-tighter">{folder.count} items</p>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingFolderId(folder.id);
                                setEditingFolderName(folder.name);
                              }}
                              className="w-6 h-6 bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#FC7CA4] hover:text-black transition-all text-[10px]"
                              title="Rename"
                            >
                              ✎
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFolder(folder.id, folder.name);
                              }}
                              disabled={isLoadingFolders}
                              className="w-6 h-6 bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-[10px] disabled:opacity-50"
                              title="Delete"
                            >
                              ✕
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assets Grid Section */}
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-end">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-black">
                  {currentFolderId ? `Contents of ${currentFolder?.name}` : 'Loose Artifacts'}
                </h4>
                {currentFolderId && (
                  <button 
                    onClick={() => setCurrentFolderId(null)}
                    className="text-[9px] uppercase tracking-widest text-[#FC7CA4] hover:text-white transition-colors"
                  >
                    ← Back to Vault
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredAssets.length === 0 ? (
                  <div className="col-span-full py-32 text-center space-y-4">
                    <div className="text-4xl opacity-10">✦</div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gray-600">This directory is currently a void.</p>
                  </div>
                ) : filteredAssets.map(asset => (
                  <motion.div 
                    layout
                    key={asset.id || (asset as any)._id}
                    className={`group relative bg-neutral-900/40 border transition-all duration-500 rounded-sm overflow-hidden ${selectedAssetIds.includes(asset.id || (asset as any)._id) ? 'border-[#FC7CA4]' : 'border-white/5 hover:border-white/20'}`}
                  >
                    {/* Select Checkbox */}
                    <div 
                      className={`absolute top-3 left-3 z-20 w-5 h-5 border flex items-center justify-center transition-all cursor-pointer ${selectedAssetIds.includes(asset.id || (asset as any)._id) ? 'bg-[#FC7CA4] border-[#FC7CA4]' : 'bg-black/40 border-white/20'}`}
                      onClick={(e) => { e.stopPropagation(); toggleAssetSelection(asset.id || (asset as any)._id); }}
                    >
                      {selectedAssetIds.includes(asset.id || (asset as any)._id) && <span className="text-[10px] text-black font-black">✓</span>}
                    </div>

                    {/* Visual Preview */}
                    <div className="aspect-square relative overflow-hidden bg-black/60">
                      <img 
                        src={asset.url} 
                        className={`w-full h-full object-cover transition-all duration-700 ${selectedAssetIds.includes(asset.id || (asset as any)._id) ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                        alt={asset.name} 
                      />
                      {/* Hover Actions Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewAsset(asset);
                            setIsPreviewOpen(true);
                          }}
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#FC7CA4] hover:text-black transition-all"
                        >
                          👁
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAsset(asset.id || (asset as any)._id, asset.cloudinaryId);
                          }}
                          disabled={isLoadingDelete}
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-3 bg-black/40">
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 truncate mb-1">{asset.name}</p>
                      <p className="text-[7px] uppercase tracking-[0.2em] text-gray-600">{asset.createdAt || 'Alchemized Oct 2024'}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selection Status Bar */}
            <AnimatePresence>
              {selectedAssetIds.length > 0 && (
                <motion.div 
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-neutral-900 border border-[#FC7CA4]/30 px-10 py-6 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl flex items-center gap-10 border-t border-white/10"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#FC7CA4]">Selected Artifacts</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500">{selectedAssetIds.length} artifacts in focus</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10"></div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setSelectedAssetIds([])}
                      className="text-[9px] uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
                    >
                      Clear Sigils
                    </button>
                    <button 
                      onClick={handleBulkDelete}
                      className="bg-red-900/20 border border-red-900/40 text-red-400 px-6 py-2 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-red-500 hover:text-white transition-all rounded-full"
                    >
                      Bulk Vanish
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image Upload Manager Modal */}
            <AnimatePresence>
              {showImageUploadManager && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowImageUploadManager(false)}
                  className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-neutral-900 border border-white/10 rounded-sm max-w-xl w-full p-8 space-y-6"
                  >
                    <div>
                      <h3
                        className="text-3xl font-serif italic text-white mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        Upload Artifact
                      </h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500">
                        Add new images to your digital vault via Cloudinary
                      </p>
                    </div>

                    <ImageUploadManager
                      onAssetUpload={handleAssetUpload}
                      folderContext={currentFolderId || undefined}
                    />

                    <button
                      onClick={() => setShowImageUploadManager(false)}
                      className="w-full text-center text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors py-3"
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {tab === 'portfolio' && (
            <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="bg-neutral-900/50 p-10 border border-white/5 rounded-sm max-w-4xl mx-auto">
                    <h3 className="text-2xl font-serif italic mb-8 text-white">Add to Collection</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input className="bg-black border border-white/10 p-4 text-sm text-white outline-none" placeholder="Client Identifier" value={newPortfolio.clientName} onChange={e => setNewPortfolio({...newPortfolio, clientName: e.target.value})} />
                        <select className="bg-black border border-white/10 p-4 text-sm text-white outline-none uppercase tracking-widest" value={newPortfolio.category} onChange={e => setNewPortfolio({...newPortfolio, category: e.target.value as any})}>
                            <option>Hotel</option><option>Restaurant</option><option>Lifestyle</option>
                        </select>
                        <div className="md:col-span-2 flex gap-4">
                            <input className="flex-1 bg-black border border-white/10 p-4 text-sm text-white outline-none" placeholder="Hero Image Asset URL" value={newPortfolio.imageUrl} onChange={e => setNewPortfolio({...newPortfolio, imageUrl: e.target.value})} />
                            <button onClick={() => setShowAssetSelectorForPortfolio(true)} className="px-8 bg-white/5 border border-white/10 text-[9px] text-white uppercase hover:bg-white hover:text-black">Browse Vault</button>
                        </div>
                        <button onClick={() => {
                          const item: PortfolioItem = { id: Date.now().toString(), ...newPortfolio };
                          const updated = [item, ...portfolio];
                          setPortfolio(updated);
                          storageService.savePortfolio(updated);
                          setNewPortfolio({ clientName: '', category: 'Hotel', imageUrl: '', description: '' });
                        }} className="text-black py-5 text-xs uppercase tracking-[0.4em] font-bold md:col-span-2 transition-all hover:scale-[1.01]" style={{ backgroundColor: settings.secondaryColor }}>Sync Artifact</button>
                    </div>
                </div>
            </motion.div>
        )}

        {tab === 'style' && (
            <motion.div key="style" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                <StyleManager initialSettings={settings} onSave={(updated) => {
                   setSettings(updated);
                   storageService.saveSettings(updated);
                   window.dispatchEvent(new Event('settingsUpdated'));
                }} />
            </motion.div>
        )}
      </AnimatePresence>

      {showAssetSelectorForPost && <AssetSelector onSelect={(url) => setPostImage(url)} onClose={() => setShowAssetSelectorForPost(false)} />}
      {showAssetSelectorForPortfolio && <AssetSelector onSelect={(url) => setNewPortfolio({...newPortfolio, imageUrl: url})} onClose={() => setShowAssetSelectorForPortfolio(false)} />}
      
      {/* Image Preview Modal */}
      <ImagePreviewModal
        asset={previewAsset}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewAsset(null);
        }}
      />
    </div>
  );
}
