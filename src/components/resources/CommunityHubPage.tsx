import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  MessageSquare,
  ArrowLeft,
  Sparkles,
  ThumbsUp,
  MessageCircle,
  Share2,
  Tag,
  Plus,
  Send,
  Search,
  CheckCircle2,
  Flame,
  Award,
  Globe,
  Code2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

interface ForumPost {
  id: string;
  title: string;
  channel: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  tags: string[];
  upvotes: number;
  userUpvoted?: boolean;
  comments: Comment[];
  createdAt: string;
  isSolved?: boolean;
}

const DEFAULT_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    title: 'How to optimize React 19 useActionState with server actions on high latency?',
    channel: '#react19-and-nextjs',
    content: 'When submitting heavy form payloads with files, the isPending state locks the button nicely, but should we combine useOptimistic for immediate UI feedback before the server validates? Here is my current custom hook implementation...',
    authorName: 'Sanjay Krishnan',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Pro Learner',
    tags: ['react19', 'server-actions', 'optimistic-ui'],
    upvotes: 42,
    userUpvoted: false,
    comments: [
      {
        id: 'c-1',
        authorName: 'Priya K.',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        content: 'Yes! Combining useOptimistic gives the user instant response while useActionState handles error rollback if the server rejects.',
        createdAt: '1 hour ago'
      }
    ],
    createdAt: '2 hours ago',
    isSolved: true
  },
  {
    id: 'post-2',
    title: 'PostgreSQL vs MongoDB: Which database architecture to pick for Skyrovix Capstone?',
    channel: '#nodejs-and-backend',
    content: 'I am planning my final semester project (Multi-tenant LMS with real-time video tracking). Should I go with Supabase PostgreSQL with Row Level Security, or MongoDB with Atlas search? Would love advice from backend devs here.',
    authorName: 'Meghna Roy',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Active Student',
    tags: ['postgresql', 'supabase', 'mongodb', 'system-design'],
    upvotes: 28,
    userUpvoted: false,
    comments: [],
    createdAt: '4 hours ago'
  },
  {
    id: 'post-3',
    title: 'Showcase: Built a real-time collaborative whiteboard using WebSockets & React!',
    channel: '#project-showcase',
    content: 'Hey everyone! Finished the Skyrovix Full Stack track last month and used the WebSockets lecture to build an interactive canvas room for developers. Deployed on Railway! Feedback appreciated.',
    authorName: 'Dinesh V.',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorRole: 'Alumni',
    tags: ['showcase', 'websockets', 'canvas', 'railway'],
    upvotes: 65,
    userUpvoted: true,
    comments: [
      {
        id: 'c-2',
        authorName: 'Aarav Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Super smooth latency! What are you using for presence detection?',
        createdAt: '3 hours ago'
      }
    ],
    createdAt: '6 hours ago',
    isSolved: false
  }
];

const CHANNELS = [
  '#all-discussions',
  '#react19-and-nextjs',
  '#nodejs-and-backend',
  '#project-showcase',
  '#career-and-interviews',
  '#bugs-and-debugging',
  '#general-chat'
];

export const CommunityHubPage: React.FC = () => {
  const { setCurrentView, currentUser, showGlobalToast, addXP } = usePlatform();
  const [selectedChannel, setSelectedChannel] = useState('#all-discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  // Posts state persisted in LocalStorage
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    try {
      const saved = localStorage.getItem('skyrovix_community_posts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_POSTS;
  });

  // New post form state
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('#react19-and-nextjs');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showGlobalToast('Please enter both title and content for your discussion.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      channel,
      content: content.trim(),
      authorName: currentUser?.name || 'You (Active Learner)',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      authorRole: 'Community Member',
      tags: tags.length ? tags : ['discussion'],
      upvotes: 1,
      userUpvoted: true,
      comments: [],
      createdAt: 'Just now'
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    try {
      localStorage.setItem('skyrovix_community_posts', JSON.stringify(updated));
    } catch (e) {}

    addXP(30);
    showGlobalToast('Discussion posted to community! (+30 XP)');
    setIsNewPostOpen(false);

    // Reset form
    setTitle('');
    setContent('');
    setTagsInput('');
  };

  const handleToggleUpvote = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const isUpvoted = p.userUpvoted;
        return {
          ...p,
          upvotes: isUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          userUpvoted: !isUpvoted
        };
      }
      return p;
    });

    setPosts(updated);
    try {
      localStorage.setItem('skyrovix_community_posts', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      authorName: currentUser?.name || 'You',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: text,
      createdAt: 'Just now'
    };

    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    });

    setPosts(updated);
    try {
      localStorage.setItem('skyrovix_community_posts', JSON.stringify(updated));
    } catch (e) {}

    setCommentInputs({ ...commentInputs, [postId]: '' });
    showGlobalToast('Reply posted! (+10 XP)');
  };

  const toggleCommentsView = (postId: string) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const filteredPosts = posts.filter(p => {
    const matchesChannel = selectedChannel === '#all-discussions' || p.channel === selectedChannel;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesChannel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Navigation Breadcrumbs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-orange-100/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#FB4400] hover:text-[#FB4400] shadow-2xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Community</span>
              <span>/</span>
              <span className="text-[#FB4400] font-bold">Developer Forum</span>
            </div>
          </div>

          <button
            onClick={() => setIsNewPostOpen(true)}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold bg-[#FB4400] hover:bg-[#E03D00] text-white shadow-sm shadow-orange-500/25 transition-all active:scale-95"
          >
            <Plus size={14} />
            <span>New Discussion</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-orange-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-600 text-xs font-extrabold shadow-2xs">
              <MessageSquare size={14} />
              <span>45,000+ DEVELOPERS WORLDWIDE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Skyrovix Community Hub & Discussions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Ask technical questions, debug edge cases, showcase what you built, and network with fellow student engineers.
            </p>
          </div>

          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-gradient-to-br from-blue-400/20 to-orange-400/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column: Channels & Search */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search topics or tags..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB4400] shadow-2xs"
              />
            </div>

            {/* Channels List */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1 font-mono">
                Topic Channels
              </div>
              {CHANNELS.map(ch => (
                <button
                  key={ch}
                  onClick={() => setSelectedChannel(ch)}
                  className={`cursor-pointer w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedChannel === ch
                      ? 'bg-orange-50 text-[#FB4400] font-extrabold border border-orange-200/70'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{ch}</span>
                  {selectedChannel === ch && <span className="w-1.5 h-1.5 rounded-full bg-[#FB4400]" />}
                </button>
              ))}
            </div>

            {/* Discord & External Community Card */}
            <div className="bg-gradient-to-br from-[#5865F2]/10 to-[#5865F2]/5 rounded-2xl border border-[#5865F2]/20 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#5865F2]">
                <Globe size={15} />
                <span>Join Official Discord</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join our 24/7 Discord voice rooms for real-time pair programming, live doubt clearance with TAs, and weekly hackathons.
              </p>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] px-4 py-2 rounded-xl shadow-sm transition-all"
              >
                <span>Launch Discord Server</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>

          {/* Right Column: Post Feed */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Active Channel Filter Bar */}
            <div className="flex items-center justify-between bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#FB4400]">
                  {selectedChannel}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {filteredPosts.length} Discussions
                </span>
              </div>

              <button
                onClick={() => setIsNewPostOpen(true)}
                className="cursor-pointer text-xs font-bold text-[#FB4400] hover:underline flex items-center gap-1"
              >
                <Plus size={14} />
                <span>Ask Question</span>
              </button>
            </div>

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <MessageSquare size={36} className="mx-auto text-slate-300" />
                <h3 className="text-sm font-bold text-slate-900">No Discussions Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Be the first to start a conversation in {selectedChannel}!
                </p>
              </div>
            ) : (
              filteredPosts.map(post => {
                const isExpanded = !!expandedComments[post.id];

                return (
                  <div
                    key={post.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-sm transition-all space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-slate-900">
                              {post.authorName}
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                              {post.authorRole}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {post.createdAt} in <strong className="text-slate-600">{post.channel}</strong>
                          </div>
                        </div>
                      </div>

                      {post.isSolved && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Solved
                        </span>
                      )}
                    </div>

                    {/* Title & Body */}
                    <div className="space-y-1.5">
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                      <div className="flex items-center gap-3">
                        {/* Upvote Button */}
                        <button
                          onClick={() => handleToggleUpvote(post.id)}
                          className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                            post.userUpvoted
                              ? 'bg-orange-50 text-[#FB4400] border border-orange-200 font-extrabold'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <ThumbsUp size={13} className={post.userUpvoted ? 'fill-[#FB4400]' : ''} />
                          <span>{post.upvotes} Upvotes</span>
                        </button>

                        {/* Reply Count Button */}
                        <button
                          onClick={() => toggleCommentsView(post.id)}
                          className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all"
                        >
                          <MessageCircle size={13} />
                          <span>{post.comments.length} Replies</span>
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                      </div>

                      <span className="text-[11px] text-slate-400 font-mono">
                        Discussion ID: #{post.id.slice(-4)}
                      </span>
                    </div>

                    {/* Expanded Comments & Reply Form */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-slate-100 space-y-4 bg-slate-50/60 p-4 rounded-2xl">
                        {post.comments.length > 0 && (
                          <div className="space-y-3">
                            {post.comments.map(c => (
                              <div key={c.id} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                                <img
                                  src={c.authorAvatar}
                                  alt={c.authorName}
                                  className="w-7 h-7 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-800">{c.authorName}</span>
                                    <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 mt-1">{c.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Input Box */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleAddComment(post.id);
                            }}
                            placeholder="Write a helpful reply..."
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB4400]"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="cursor-pointer px-4 py-2 bg-[#FB4400] hover:bg-[#E03D00] text-white rounded-xl text-xs font-bold transition-all"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })
            )}

          </div>
        </div>

        {/* Modal: New Discussion */}
        {isNewPostOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FB4400]">
                  <Sparkles size={14} />
                  <span>START A TOPIC</span>
                </div>
                <button
                  onClick={() => setIsNewPostOpen(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Discussion Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. How do I configure Docker for Next.js 15?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Target Channel</label>
                  <select
                    value={channel}
                    onChange={e => setChannel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  >
                    {CHANNELS.filter(c => c !== '#all-discussions').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Discussion Content / Question *</label>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Provide context, what you have tried, and any code snippets..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    placeholder="e.g. docker, nextjs, deployment"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full py-3 rounded-xl bg-[#FB4400] hover:bg-[#E03D00] text-white text-xs font-extrabold shadow-md shadow-orange-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>Publish to Community (+30 XP)</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

