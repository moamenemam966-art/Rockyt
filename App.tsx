import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  ArrowRightCircle, 
  Zap, 
  Check, 
  XCircle, 
  Activity, 
  BarChart3, 
  Layers, 
  BrainCircuit,
  ShieldCheck,
  Twitter,
  Linkedin,
  Rocket,
  Image as ImageIcon,
  Mic,
  Smartphone,
  Target,
  Play,
  TrendingUp,
  Clock,
  User,
  LogOut,
  Loader2,
  Mail,
  Lock,
  Database,
  Layout,
  LifeBuoy,
  Book,
  Monitor,
  Menu,
  X
} from 'lucide-react';
import { RockytLogo } from './components/RockytLogo';
import { supabase } from './supabaseClient';

// --- COMPONENTS ---

const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl animate-float">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C7F6E4] to-transparent opacity-50"></div>
        
        <div className="p-4 md:p-8">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Play className="w-5 h-5 text-[#C7F6E4] fill-[#C7F6E4]" />
                How Rockyt Works
              </h2>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
           </div>

           {/* Video Placeholder */}
           <div className="relative aspect-video w-full bg-black rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group cursor-pointer">
              {/* This is where you would put your actual <video> or youtube iframe */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="w-20 h-20 rounded-full bg-[#C7F6E4] flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(199,246,228,0.4)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <Play className="w-8 h-8 text-black fill-black" />
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-[#C7F6E4]"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono text-white/60">
                  <span>01:20</span>
                  <span>04:15</span>
                </div>
              </div>
           </div>
           
           <div className="mt-6 text-center">
             <button 
               onClick={onClose}
               className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors"
             >
               Close Demo
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const AuthModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  defaultView?: 'signin' | 'signup';
  onSuccess?: () => void;
}> = ({ isOpen, onClose, defaultView = 'signin', onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(defaultView === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsSignUp(defaultView === 'signup');
    }
  }, [isOpen, defaultView]);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Sign Up with metadata
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0], 
              avatar_url: '',
            },
          },
        });
        
        if (error) throw error;
        
        if (data.session) {
          alert('Account created! You are now logged in.');
          if (onSuccess) onSuccess();
          onClose();
        } else {
          alert('Account created! Please check your email to confirm your registration.');
          onClose();
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-float">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C7F6E4] to-transparent opacity-50"></div>
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex justify-center mb-4">
              <RockytLogo className="w-12 h-12 text-[#C7F6E4]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-white/40 text-sm">
              {isSignUp ? 'Start your automated ad journey' : 'Access your unified dashboard'}
            </p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF]/40 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:border-[#C7F6E4] focus:outline-none transition-colors"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF]/40 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:border-[#C7F6E4] focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-[#C7F6E4] text-[#000000] rounded-xl font-bold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white/40 hover:text-[#C7F6E4] text-sm transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; session: any }> = ({ isOpen, onClose, session }) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && session?.user?.id) {
      const fetchProfile = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfileData(data);
        }
        setLoading(false);
      };
      fetchProfile();
    }
  }, [isOpen, session]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-float p-8">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-[#C7F6E4]/10 flex items-center justify-center text-[#C7F6E4]">
             <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Database Verification</h2>
            <p className="text-sm text-white/50">Reading directly from 'public.profiles'</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#C7F6E4]" />
          </div>
        ) : profileData ? (
          <div className="space-y-4 font-mono text-sm">
            <div className="bg-black/50 p-4 rounded-lg border border-white/10">
              <span className="text-white/40 block text-xs mb-1">UUID (Primary Key)</span>
              <span className="text-[#C7F6E4]">{profileData.id}</span>
            </div>
            <div className="bg-black/50 p-4 rounded-lg border border-white/10">
              <span className="text-white/40 block text-xs mb-1">Email (Synced from Auth)</span>
              <span className="text-white">{profileData.email || "Not synced"}</span>
            </div>
             <div className="bg-black/50 p-4 rounded-lg border border-white/10">
              <span className="text-white/40 block text-xs mb-1">Full Name (from Metadata)</span>
              <span className="text-white">{profileData.full_name || "NULL"}</span>
            </div>
          </div>
        ) : (
           <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400 text-center">
             <p className="font-bold mb-2">No Profile Found</p>
             <p className="text-xs opacity-70">
               A row for this user ID was not found in 'public.profiles'.
             </p>
           </div>
        )}

        <button 
          onClick={onClose}
          className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ session: any; onSignOut: () => void }> = ({ session, onSignOut }) => {
  const [activeTab, setActiveTab] = useState<'rockyt' | 'help' | 'docs'>('rockyt');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // PLACEHOLDER URL - Replace this with your actual URL later
  const IFRAME_URL = "https://example.com"; 

  const menuItems = [
    { id: 'rockyt', label: 'Rockyt', icon: Monitor },
    { id: 'help', label: 'Help Center', icon: LifeBuoy },
    { id: 'docs', label: 'Product Docs', icon: Book },
  ];

  return (
    <div className="min-h-screen bg-[#000] flex text-white font-sans">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-[#111] border-b border-white/10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <RockytLogo className="w-8 h-8" />
          <span className="font-bold">Rockyt</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#111] border-r border-white/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
             <RockytLogo className="w-8 h-8 text-[#C7F6E4]" />
             <span className="font-bold text-xl tracking-tight">Rockyt</span>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as any); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#C7F6E4] text-black font-bold shadow-[0_0_15px_rgba(199,246,228,0.3)]' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-black' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#C7F6E4]">
                 <User className="w-4 h-4" />
               </div>
               <div className="overflow-hidden">
                 <p className="text-sm font-medium text-white truncate">{session.user.user_metadata?.full_name || 'User'}</p>
                 <p className="text-xs text-white/40 truncate">{session.user.email}</p>
               </div>
            </div>
            <button 
              onClick={onSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-20 md:pt-0 bg-[#000] relative overflow-hidden flex flex-col h-screen">
        {/* Header Area */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#000]">
           <h1 className="text-lg font-medium text-white/80">
             {menuItems.find(i => i.id === activeTab)?.label}
           </h1>
           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7F6E4]/10 border border-[#C7F6E4]/20 text-[#C7F6E4] text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C7F6E4] animate-pulse"></span>
              System Live
           </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto bg-[#050505] relative">
           {activeTab === 'rockyt' && (
             <div className="w-full h-full p-4 md:p-6">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl relative">
                  {/* Iframe Placeholder Overlay (Remove if iframe source is real) */}
                  <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center z-10">
                     <div className="w-16 h-16 rounded-full bg-[#C7F6E4]/10 flex items-center justify-center mb-4">
                        <Monitor className="w-8 h-8 text-[#C7F6E4]" />
                     </div>
                     <h3 className="text-xl font-bold mb-2">Internal Dashboard</h3>
                     <p className="text-white/50 text-sm mb-6 max-w-md text-center">
                       This is where your internal tool will load. Edit the <code>IFRAME_URL</code> constant in the code to point to your live app.
                     </p>
                     <div className="bg-[#222] px-4 py-2 rounded-lg font-mono text-xs text-[#C7F6E4] border border-white/10">
                       Current Source: {IFRAME_URL}
                     </div>
                  </div>
                  
                  {/* Actual Iframe */}
                  <iframe 
                    src={IFRAME_URL} 
                    className="w-full h-full border-0 opacity-10 pointer-events-none" // Remove opacity/pointer-events when real URL is set
                    title="Rockyt Dashboard"
                  />
                </div>
             </div>
           )}

           {activeTab === 'help' && (
             <div className="max-w-4xl mx-auto p-8 md:p-12">
               <h2 className="text-3xl font-bold mb-6">Help Center</h2>
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-[#C7F6E4] transition-colors cursor-pointer group">
                    <Book className="w-8 h-8 text-[#C7F6E4] mb-4" />
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#C7F6E4]">Getting Started</h3>
                    <p className="text-white/60">Learn the basics of setting up your first ad campaign with Rockyt AI.</p>
                 </div>
                 <div className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-[#C7F6E4] transition-colors cursor-pointer group">
                    <LifeBuoy className="w-8 h-8 text-[#C7F6E4] mb-4" />
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#C7F6E4]">Support Chat</h3>
                    <p className="text-white/60">Talk directly to our support engineers for technical issues.</p>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'docs' && (
             <div className="max-w-4xl mx-auto p-8 md:p-12">
               <h2 className="text-3xl font-bold mb-6">Product Documentation</h2>
               <div className="space-y-4">
                 <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                   <h3 className="text-xl font-bold text-[#C7F6E4] mb-2">v2.4 Release Notes</h3>
                   <p className="text-white/60 text-sm">Added support for TikTok Creative Center API and improved attribution modeling for iOS 14.5+ devices.</p>
                 </div>
                 <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                   <h3 className="text-xl font-bold text-white mb-2">API Reference</h3>
                   <p className="text-white/60 text-sm">Full documentation for the Rockyt Public API available for Enterprise plans.</p>
                 </div>
               </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'demo' | 'dashboard'>('home');
  const [carouselLoaded, setCarouselLoaded] = useState(false);
  const loadedImagesRef = useRef(0);
  const totalImages = 14; 
  
  // Auth State
  const [session, setSession] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authDefaultView, setAuthDefaultView] = useState<'signin' | 'signup'>('signin');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect to Dashboard on Login
  useEffect(() => {
    if (session && currentView === 'home') {
       // Optional: Auto redirect if they land on home while logged in
       // setCurrentView('dashboard');
    }
  }, [session]);

  // Fallback for carousel animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarouselLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    loadedImagesRef.current += 1;
    if (loadedImagesRef.current >= totalImages) {
      setCarouselLoaded(true);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentView('home');
    setShowProfileModal(false);
  };

  const openAuth = (view: 'signin' | 'signup') => {
    setAuthDefaultView(view);
    setShowAuthModal(true);
  };

  const navigateToHomeSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- RENDER DASHBOARD IF ACTIVE ---
  if (currentView === 'dashboard' && session) {
    return <Dashboard session={session} onSignOut={handleSignOut} />;
  }

  return (
    <>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultView={authDefaultView}
        onSuccess={() => setCurrentView('dashboard')}
      />
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} session={session} />
      <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#000000]/90 backdrop-blur-md py-5 border-b border-[#FFFFFF]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setCurrentView('home'); }} 
            className="flex items-center gap-3 group cursor-pointer"
          >
            <RockytLogo />
            <span className="text-3xl tracking-tight font-semibold text-[#FFFFFF]">
              Rockyt
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#FFFFFF]/70">
            <button onClick={() => setShowVideoModal(true)} className="hover:text-[#FFFFFF] transition-colors">
              How it works
            </button>
            <a href="#optimization" onClick={(e) => { e.preventDefault(); navigateToHomeSection('optimization'); }} className="hover:text-[#FFFFFF] transition-colors">
              Optimization
            </a>
            <a href="#creative" onClick={(e) => { e.preventDefault(); navigateToHomeSection('creative'); }} className="hover:text-[#FFFFFF] transition-colors">
              Creative Hub
            </a>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#C7F6E4]/10 text-[#C7F6E4] rounded-full text-xs font-bold uppercase tracking-wider border border-[#C7F6E4]/20 hover:bg-[#C7F6E4] hover:text-black transition-all"
                >
                  <Layout className="w-3 h-3" />
                  Dashboard
                </button>
                <div 
                  className="hidden lg:flex items-center gap-2 text-white/60 text-sm cursor-pointer hover:text-[#C7F6E4] transition-colors"
                  onClick={() => setShowProfileModal(true)}
                  title="Click to verify DB data"
                >
                  <User className="w-4 h-4" />
                </div>
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium flex items-center gap-2"
                >
                  <LogOut className="w-3 h-3" />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => openAuth('signin')}
                  className="text-white/70 hover:text-white font-medium text-sm hidden sm:block transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={() => openAuth('signup')} 
                  className="px-5 py-2.5 rounded-full bg-[#FFFFFF] text-[#000000] hover:bg-[#C7F6E4] hover:text-[#000000] transition-all duration-300 text-sm font-medium border border-[#FFFFFF] hover:border-[#C7F6E4] cursor-pointer"
                >
                  Start Free Trial
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Home View */}
      {currentView === 'home' && (
        <main className="section-active">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-[#000000] text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center relative z-10">
              {/* Left: Content */}
              <div className="space-y-10 relative">
                {/* Decorative scribble */}
                <svg className="absolute -top-16 -left-10 w-32 h-32 text-[#FFFFFF] opacity-10 rotate-12" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20,100 C50,0 150,0 180,100 S50,200 20,100 Z" className="scribble-anim"></path>
                </svg>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFFFFF]/20 bg-[#FFFFFF]/5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#C7F6E4] animate-pulse"></span>
                  <span className="text-xs font-medium text-[#FFFFFF]/80 uppercase tracking-wide">
                    Live on 10+ Platforms
                  </span>
                </div>

                <h1 className="text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#FFFFFF] font-medium">
                  The ad manager that
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-10 italic">never</span>
                    <svg className="absolute bottom-1 left-0 w-full h-3 text-[#C7F6E4] -z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                    </svg>
                  </span>
                  sleeps.
                </h1>

                <p className="text-lg md:text-xl text-[#FFFFFF]/70 font-light max-w-lg leading-relaxed">
                  The all-in-one AI co-pilot that protects your budget and scales profitable ads across Meta, Google, TikTok, and more—24/7.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {session ? (
                    <button 
                      onClick={() => setCurrentView('dashboard')}
                      className="px-8 py-4 bg-[#C7F6E4] text-[#000000] rounded-full text-lg font-medium hover:bg-[#FFFFFF] transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(199,246,228,0.3)] cursor-pointer"
                    >
                      Go to Dashboard
                      <Layout className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => openAuth('signup')}
                      className="px-8 py-4 bg-[#C7F6E4] text-[#000000] rounded-full text-lg font-medium hover:bg-[#FFFFFF] hover:text-[#000000] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(199,246,228,0.3)] cursor-pointer"
                    >
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                  
                  <button onClick={() => setShowVideoModal(true)} className="px-8 py-4 bg-transparent border border-[#FFFFFF]/20 text-[#FFFFFF] rounded-full text-lg font-medium hover:bg-[#FFFFFF]/10 transition-colors flex items-center justify-center cursor-pointer">
                    How it works
                  </button>
                </div>
              </div>
              {/* Right: Visual */}
              <div className="relative">
                {/* Abstract blobs */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#C7F6E4]/20 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-10 -left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-30"></div>

                {/* Main Card Visual (Pure White for Contrast) */}
                <div className="relative bg-[#FFFFFF] border border-[#FFFFFF] rounded-[2.5rem] p-8 card-shadow-white rotate-1 hover:rotate-0 transition-transform duration-500 text-[#000000] animate-float">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#000000] flex items-center justify-center text-[#C7F6E4]">
                        <RockytLogo className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#000000]">Rockyt Intelligence</h3>
                        <p className="text-xs text-[#000000]/50">Real-time Optimization</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#C7F6E4] text-[10px] font-bold uppercase tracking-wider text-[#000000]">
                      Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Event 1: Stopped Waste */}
                    <div className="bg-[#FFF0F0] p-4 rounded-xl border border-red-100 flex items-start gap-3">
                      <div className="p-2 bg-red-100 rounded-lg text-red-600">
                        <XCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-red-900">Wasted Spend Stopped</p>
                        <p className="text-xs text-red-700/70 mt-1">
                          TikTok Ad Set #442 exceeded CPA target ($45.00). 
                          <br/>Status: <b>PAUSED</b>. Saved est. $1,200.
                        </p>
                      </div>
                    </div>

                    {/* Event 2: Scaled Winner */}
                    <div className="bg-[#F0FFF9] p-4 rounded-xl border border-[#C7F6E4] flex items-start gap-3">
                      <div className="p-2 bg-[#C7F6E4] rounded-lg text-[#000000]">
                         <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#000000]">Winner Scaled +20%</p>
                        <p className="text-xs text-[#000000]/60 mt-1">
                          Meta Creative "UGC_v3" hitting 4.2x ROAS. 
                          <br/>Budget increased. Projected rev: +$5k/day.
                        </p>
                      </div>
                    </div>
                    
                    {/* Insight */}
                    <div className="bg-[#F5F5F5] p-4 rounded-xl border border-[#000000]/5">
                      <p className="text-sm text-[#000000]/80 italic">
                        "Recommendation: Launch 'Summer Sale' images on Pinterest. Audience overlap matches your high-intent buyers."
                      </p>
                      <div className="mt-3 flex gap-2">
                         <button className="px-3 py-1.5 bg-[#000000] text-[#FFFFFF] text-xs font-bold rounded hover:opacity-80">
                           Auto-Launch
                         </button>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -right-6 bottom-12 bg-[#000000] px-4 py-3 rounded-xl border border-[#000000] shadow-xl flex items-center gap-3 transform rotate-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFFFFF]/10 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-[#C7F6E4]" />
                    </div>
                    <div className="text-xs font-medium">
                      <div className="text-[#FFFFFF]">Total ROAS</div>
                      <div className="text-[#C7F6E4]">4.8x <span className="text-[#FFFFFF]/50"> (↑ 22%)</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom wave separator */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
              <svg className="relative block w-full h-12 text-[#FFFFFF]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="transparent"></path>
              </svg>
            </div>
          </section>

          {/* Marquee Section (Platforms) */}
          <div className="border-y border-[#000000]/5 bg-[#FFFFFF] py-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-sm font-medium text-[#000000]/50 mb-0 uppercase tracking-widest">
                Integrated with 10+ Platforms
              </p>
              
              <div className="partners-carousel" aria-label="Partner logos carousel">
                <div className={`carousel-track ${carouselLoaded ? 'loaded' : ''}`}>
                  {/* FIRST SET */}
                  <div className="partner-logo" title="Meta">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta logo" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" title="Bing">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Bing_Fluent_Logo.svg" alt="Bing logo" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" title="Google">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" title="TikTok">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg" alt="TikTok logo" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" title="Snapchat">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/300px-Snapchat_logo.svg.png" alt="Snapchat logo (yellow)" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" title="Spotify">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify logo" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" title="LinkedIn">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn logo" onLoad={handleImageLoad} />
                  </div>

                  {/* DUPLICATE SET (for seamless infinite scrolling) */}
                  <div className="partner-logo" aria-hidden="true">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" aria-hidden="true">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Bing_Fluent_Logo.svg" alt="" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" aria-hidden="true">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" aria-hidden="true">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg" alt="" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" aria-hidden="true">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/300px-Snapchat_logo.svg.png" alt="" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" aria-hidden="true">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="" onLoad={handleImageLoad} />
                  </div>

                  <div className="partner-logo" aria-hidden="true">
                    <img loading="eager" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="" onLoad={handleImageLoad} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ... (rest of the sections remain unchanged) ... */}
          <section id="how-it-works" className="py-24 bg-[#FFFFFF] relative text-[#000000]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-0">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-5xl md:text-6xl font-medium tracking-tight mb-6">
                  Stop burning cash on
                  <br />
                  <span className="underline decoration-wavy decoration-[#FF4444] text-[#000000]">
                    manual guesswork
                  </span>
                  .
                </h2>
                <p className="text-xl text-[#000000]/60 font-light">
                  The gap between your ad spend and revenue is where 
                  manual rules and delayed reporting kill your profit.
                </p>
              </div>

              {/* Comparison Grid */}
              <div className="grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden border border-[#000000]/10 card-shadow bg-[#FAFAFA]">
                {/* Left: Without Rockyt */}
                <div className="p-8 md:p-14 border-b md:border-b-0 md:border-r border-[#000000]/5">
                  <div className="flex items-center gap-3 mb-10">
                    <span className="w-2 h-2 rounded-full bg-[#FF4444]"></span>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#000000]/40">
                      Without Rockyt
                    </h3>
                  </div>

                  <div className="space-y-10">
                    {/* Item 1 */}
                    <div className="group">
                      <div className="flex items-start gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <XCircle className="w-6 h-6 text-[#FF4444] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-lg mb-1">Wasted Spend</h4>
                          <p className="text-[#000000]/70 font-medium">
                            Bad ads run while you sleep. Budget drains overnight.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="group">
                      <div className="flex items-start gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <XCircle className="w-6 h-6 text-[#FF4444] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-lg mb-1">Manual Rules</h4>
                          <p className="text-[#000000]/70 font-medium">
                            Limited by human speed and inaccurate, delayed data.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="group">
                      <div className="flex items-start gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <XCircle className="w-6 h-6 text-[#FF4444] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-lg mb-1">
                            Fragmented Data
                          </h4>
                          <p className="text-[#000000]/70 font-medium">
                            Guessing attribution across 10 separate tabs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: With Rockyt */}
                <div className="p-8 md:p-14 bg-[#FFFFFF] relative">
                  {/* Subtle Background Tint */}
                  <div className="absolute inset-0 bg-[#C7F6E4]/10 mix-blend-multiply pointer-events-none"></div>

                  <div className="flex items-center gap-3 mb-10 relative z-10">
                    <span className="w-2 h-2 rounded-full bg-[#000000]"></span>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#000000]">
                      With Rockyt
                    </h3>
                  </div>

                  <div className="space-y-10 relative z-10">
                    {/* Item 1 */}
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#C7F6E4] flex items-center justify-center shrink-0 mt-1">
                        <Check className="w-3.5 h-3.5 text-[#000000] stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">24/7 Protection</h4>
                        <p className="text-[#000000]/70 font-medium">
                          AI monitors real-time. Stops wasted spend instantly.
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#C7F6E4] flex items-center justify-center shrink-0 mt-1">
                         <Check className="w-3.5 h-3.5 text-[#000000] stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Profit-Driven Scale</h4>
                        <p className="text-[#000000]/70 font-medium">
                          Allocates budget effectively across different platforms.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#C7F6E4] flex items-center justify-center shrink-0 mt-1">
                         <Check className="w-3.5 h-3.5 text-[#000000] stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Unified Intelligence</h4>
                        <p className="text-[#000000]/70 font-medium">
                          Full view of customer journey from ad click to revenue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector to next section */}
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="h-24 w-px bg-gradient-to-b from-[#000000]/10 to-[#000000]"></div>
              </div>
            </div>
          </section>

          {/* Dark Feature Section (Optimization) */}
          <section id="optimization" className="py-32 bg-[#000000] text-[#FFFFFF] relative rounded-t-[3rem] -mt-12 overflow-hidden border-t border-[#FFFFFF]/10 z-10">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C7F6E4]/5 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-5xl md:text-7xl mb-6 font-medium tracking-tight">
                  Master the
                  <br />
                  <span className="text-[#C7F6E4] italic">algorithm</span>.
                </h2>
                <p className="text-xl text-[#FFFFFF]/70 font-light">
                   Your unified command center for 10+ platforms. Connect, monitor, and scale without guesswork.
                </p>
              </div>

              {/* Steps */}
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {/* Step 1 */}
                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-bold text-[#C7F6E4]">
                    01
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[#C7F6E4] text-black flex items-center justify-center mb-6 text-xl shadow-[0_0_20px_rgba(199,246,228,0.4)]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Connect All</h3>
                  <p className="text-white/60">
                    One-click integration for <span className="text-white">Meta, Google, TikTok, Spotify</span> and more.
                  </p>
                </div>
                {/* Step 2 */}
                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-bold text-[#C7F6E4]">
                    02
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[#1A1A1A] border border-white/10 text-white flex items-center justify-center mb-6 text-xl">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">AI Analysis</h3>
                  <p className="text-white/60">
                    ML detects patterns in real-time. Identifies wasted spend and scaling opportunities instantly.
                  </p>
                </div>
                {/* Step 3 */}
                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-bold text-[#C7F6E4]">
                    03
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[#1A1A1A] border border-white/10 text-white flex items-center justify-center mb-6 text-xl">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Auto-Scale</h3>
                  <p className="text-white/60">
                    Automated rules scale profitable campaigns and reallocate budget to the highest performing platforms.
                  </p>
                </div>
              </div>

              {/* Bandwidth/ROAS Visualization */}
              <div className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000] z-10 pointer-events-none"></div>
                <div className="flex items-center justify-between mb-8 relative z-20">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Live ROAS Monitoring
                    </h3>
                    <p className="text-sm text-white/50">Real-time budget allocation</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7F6E4]/10 border border-[#C7F6E4]/20 text-[#C7F6E4] text-xs font-bold uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#C7F6E4] animate-pulse"></span>
                    Optimizing
                  </div>
                </div>

                {/* Animated Chart Visual */}
                <div className="h-48 w-full flex items-end gap-1 relative z-20 opacity-80">
                  <div className="w-full bg-gradient-to-t from-[#C7F6E4]/20 to-[#C7F6E4]/5 rounded-t-sm h-[20%] transition-all duration-1000 group-hover:h-[40%]"></div>
                  <div className="w-full bg-gradient-to-t from-[#C7F6E4]/20 to-[#C7F6E4]/5 rounded-t-sm h-[35%] transition-all duration-1000 group-hover:h-[50%]"></div>
                  <div className="w-full bg-gradient-to-t from-[#C7F6E4]/40 to-[#C7F6E4]/10 rounded-t-sm h-[50%] transition-all duration-1000 group-hover:h-[60%]"></div>
                  <div className="w-full bg-gradient-to-t from-[#C7F6E4] to-[#C7F6E4]/50 rounded-t-sm h-[80%] shadow-[0_0_20px_rgba(199,246,228,0.3)] transition-all duration-1000 group-hover:h-[90%]"></div>
                  <div className="w-full bg-gradient-to-t from-[#C7F6E4]/40 to-[#C7F6E4]/10 rounded-t-sm h-[60%] transition-all duration-1000 group-hover:h-[70%]"></div>
                  <div className="w-full bg-gradient-to-t from-[#C7F6E4]/20 to-[#C7F6E4]/5 rounded-t-sm h-[40%] transition-all duration-1000 group-hover:h-[50%]"></div>
                  <div className="w-full bg-gradient-to-t from-[#C7F6E4]/20 to-[#C7F6E4]/5 rounded-t-sm h-[25%] transition-all duration-1000 group-hover:h-[35%]"></div>
                </div>
                <div className="flex justify-between text-xs text-white/30 mt-4 relative z-20 font-mono">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>
          </section>

          {/* Unified Dashboard (Grey Card Stack) */}
          <section className="py-32 bg-[#F4F4F5] relative text-[#000000] overflow-hidden rounded-t-[3rem] -mt-12 z-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Text */}
                <div className="order-2 lg:order-1">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000000]/5 border border-[#000000]/10 mb-6">
                      <Activity className="w-4 h-4 text-[#000000]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#000000]/70">Unified Intelligence</span>
                   </div>
                   <h2 className="text-5xl md:text-6xl font-medium tracking-tight mb-6">
                     One dashboard to
                     <br />
                     <span className="relative">
                       see it all
                       <svg className="absolute bottom-1 left-0 w-full h-3 text-[#C7F6E4] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                         <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                       </svg>
                     </span>.
                   </h2>
                   <p className="text-lg text-[#000000]/70 leading-relaxed mb-8">
                     Stop wrestling with CSVs and 10 different tabs. Rockyt unifies campaign data from every platform with your website analytics in real-time.
                   </p>

                   <div className="space-y-6">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#000000]/10 flex items-center justify-center shrink-0 shadow-sm">
                            <BarChart3 className="w-5 h-5 text-[#000000]" />
                         </div>
                         <div>
                            <h4 className="font-bold text-[#000000]">Real-time Attribution</h4>
                            <p className="text-sm text-[#000000]/60">Track the customer journey from ad click to purchase instantly.</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#000000]/10 flex items-center justify-center shrink-0 shadow-sm">
                            <Check className="w-5 h-5 text-[#000000]" />
                         </div>
                         <div>
                            <h4 className="font-bold text-[#000000]">Zero Data Discrepancy</h4>
                            <p className="text-sm text-[#000000]/60">Direct API integrations ensure your data matches what's actually happening.</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Right: Dashboard Visual */}
                <div className="order-1 lg:order-2 relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 blur-3xl rounded-full"></div>
                   
                   <div className="bg-[#000000] rounded-2xl p-2 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                       <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
                          {/* Window Controls */}
                          <div className="h-8 bg-[#1A1A1A] border-b border-white/5 flex items-center px-3 gap-2">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                             <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-medium">Performance Overview</h3>
                                <div className="px-2 py-1 rounded bg-[#C7F6E4]/10 text-[#C7F6E4] text-[10px] font-mono border border-[#C7F6E4]/20">
                                   LIVE DATA
                                </div>
                             </div>

                             {/* Grid */}
                             <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                   <div className="text-white/40 text-[10px] uppercase mb-1">Total Spend</div>
                                   <div className="text-xl font-bold text-white">$4,250.00</div>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                   <div className="text-white/40 text-[10px] uppercase mb-1">Revenue</div>
                                   <div className="text-xl font-bold text-[#C7F6E4]">$21,480.00</div>
                                </div>
                             </div>

                             {/* Graph Placeholders */}
                             <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                   <div className="w-6 h-6 rounded bg-[#1877F2] flex items-center justify-center text-[10px] text-white">f</div>
                                   <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                      <div className="w-[70%] h-full bg-[#1877F2]"></div>
                                   </div>
                                   <span className="text-xs text-white/60">4.5x</span>
                                </div>
                                <div className="flex items-center gap-2">
                                   <div className="w-6 h-6 rounded bg-black border border-white/20 flex items-center justify-center text-[10px] text-white">Tk</div>
                                   <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                      <div className="w-[45%] h-full bg-white"></div>
                                   </div>
                                   <span className="text-xs text-white/60">3.2x</span>
                                </div>
                                <div className="flex items-center gap-2">
                                   <div className="w-6 h-6 rounded bg-[#EA4335] flex items-center justify-center text-[10px] text-white">G</div>
                                   <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                      <div className="w-[85%] h-full bg-[#EA4335]"></div>
                                   </div>
                                   <span className="text-xs text-white/60">6.1x</span>
                                </div>
                             </div>
                          </div>
                       </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Creative Hub Section (Moved & Updated) */}
          <section id="creative" className="py-32 bg-[#000000] text-[#FFFFFF] relative rounded-t-[3rem] -mt-12 z-30 overflow-hidden">
             {/* Background glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#C7F6E4]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              <div className="mb-20 text-center">
                <span className="text-[#C7F6E4] font-mono text-sm uppercase tracking-widest mb-4 block">
                  AI Creative Hub
                </span>
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
                  From idea to
                  <br />
                  <span className="text-[#C7F6E4] italic">winning ad</span>.
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
                  Rockyt isn't just an ad manager. It's a full creative team with 5+ AI tools to generate images, copy, and video assets instantly.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-24">
                {/* Feature 1: Image Gen */}
                <div className="bg-[#111111] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group hover:bg-[#C7F6E4] transition-colors duration-500">
                  <div className="absolute top-0 right-0 p-8 text-[#C7F6E4] group-hover:text-[#000000] transition-colors">
                    <span className="text-6xl font-medium opacity-20">01</span>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#C7F6E4] text-[#000000] group-hover:bg-[#000000] group-hover:text-[#C7F6E4] flex items-center justify-center mb-6 transition-colors">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#000000]">
                      Product Images
                    </h3>
                    <p className="text-white/60 group-hover:text-[#000000]/70 leading-relaxed">
                      Generate high-converting product shots and text-on-image designs instantly. Never run out of creative variations.
                    </p>
                  </div>
                </div>

                {/* Feature 2: Copy & Audio */}
                <div className="bg-[#111111] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group hover:bg-[#C7F6E4] transition-colors duration-500">
                  <div className="absolute top-0 right-0 p-8 text-[#C7F6E4] group-hover:text-[#000000] transition-colors">
                    <span className="text-6xl font-medium opacity-20">02</span>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#C7F6E4] text-[#000000] group-hover:bg-[#000000] group-hover:text-[#C7F6E4] flex items-center justify-center mb-6 transition-colors">
                      <Mic className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#000000]">
                      Ad Copy & Audio
                    </h3>
                    <p className="text-white/60 group-hover:text-[#000000]/70 leading-relaxed">
                      AI writes winning headlines and body copy for every platform, and generates audio for Spotify and radio ads.
                    </p>
                  </div>
                </div>

                {/* Feature 3: Video/UGC */}
                <div className="bg-[#111111] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group hover:bg-[#C7F6E4] transition-colors duration-500">
                  <div className="absolute top-0 right-0 p-8 text-[#C7F6E4] group-hover:text-[#000000] transition-colors">
                    <span className="text-6xl font-medium opacity-20">03</span>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#C7F6E4] text-[#000000] group-hover:bg-[#000000] group-hover:text-[#C7F6E4] flex items-center justify-center mb-6 transition-colors">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#000000]">
                      Reels & UGC
                    </h3>
                    <p className="text-white/60 group-hover:text-[#000000]/70 leading-relaxed">
                      Create TikToks and Reels from scratch. AI acts as your creative team to produce video content at scale.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic 3D Auto Scroll Gallery */}
              <div className="gallery-tilt-container">
                  <div className="gallery-track-3d">
                      {/* Placeholders for 3D Cards */}
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 01</span>
                      </div>
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 02</span>
                      </div>
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 03</span>
                      </div>
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 04</span>
                      </div>
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 05</span>
                      </div>
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 06</span>
                      </div>
                      {/* Duplicates for infinite scroll */}
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 01</span>
                      </div>
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 02</span>
                      </div>
                      <div className="gallery-card-placeholder flex items-center justify-center">
                          <span className="text-white/20 font-bold text-2xl">Asset 03</span>
                      </div>
                  </div>
              </div>
            </div>
          </section>

          {/* Social Proof / Case Studies (Updated) */}
          <section id="customers" className="py-32 bg-[#FFFFFF] relative text-[#000000] rounded-t-[3rem] -mt-12 z-40">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl text-[#000000] mb-6 font-medium tracking-tight">
                  Real results,
                  <br />
                  <span className="underline decoration-wavy decoration-[#C7F6E4]">
                    real savings
                  </span>.
                </h2>
              </div>

              {/* 3 Compact Case Studies */}
              <div className="grid lg:grid-cols-3 gap-6 mb-24">
                {/* Case 1 */}
                <div className="bg-white p-6 rounded-[1.5rem] border border-[#000000]/10 card-shadow-hover transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      E-Commerce
                    </div>
                    <TrendingUp className="w-5 h-5 text-[#C7F6E4]" />
                  </div>
                  <div className="mb-4">
                     <h3 className="text-5xl font-bold tracking-tight text-[#000000]">+310%</h3>
                     <p className="text-sm font-bold text-[#000000]/40 uppercase tracking-wide mt-1">ROAS Increase</p>
                  </div>
                  <p className="text-sm text-[#000000]/70 leading-relaxed mb-4">
                    "Velour Apparel" automated their Meta & TikTok ads. Scaling from $2k to $12k daily spend while maintaining profitability.
                  </p>
                  <div className="border-t border-[#000000]/5 pt-4 flex items-center gap-2">
                     <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                     <span className="text-xs font-bold text-[#000000]/80">Velour Apparel</span>
                  </div>
                </div>

                {/* Case 2 */}
                <div className="bg-black p-6 rounded-[1.5rem] border border-black shadow-2xl relative overflow-hidden transform md:-translate-y-2">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C7F6E4]/20 rounded-full blur-2xl"></div>
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="px-3 py-1 bg-[#C7F6E4] text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
                      SaaS
                    </div>
                    <Target className="w-5 h-5 text-[#C7F6E4]" />
                  </div>
                  <div className="mb-4 relative z-10">
                     <h3 className="text-5xl font-bold tracking-tight text-white">-45%</h3>
                     <p className="text-sm font-bold text-[#C7F6E4] uppercase tracking-wide mt-1">CAC Reduction</p>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-4 relative z-10">
                    "TechFlow" used Rockyt's attribution to cut wasted LinkedIn spend and double down on high-intent Google keywords.
                  </p>
                  <div className="border-t border-white/10 pt-4 flex items-center gap-2 relative z-10">
                     <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                     <span className="text-xs font-bold text-white">TechFlow</span>
                  </div>
                </div>

                {/* Case 3 */}
                <div className="bg-white p-6 rounded-[1.5rem] border border-[#000000]/10 card-shadow-hover transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      Agency
                    </div>
                    <Clock className="w-5 h-5 text-[#C7F6E4]" />
                  </div>
                  <div className="mb-4">
                     <h3 className="text-5xl font-bold tracking-tight text-[#000000]">20hrs</h3>
                     <p className="text-sm font-bold text-[#000000]/40 uppercase tracking-wide mt-1">Saved Per Week</p>
                  </div>
                  <p className="text-sm text-[#000000]/70 leading-relaxed mb-4">
                    "GrowthBox" manages 50+ client accounts. Rockyt's unified dashboard saved their team 20 hours of manual reporting weekly.
                  </p>
                  <div className="border-t border-[#000000]/5 pt-4 flex items-center gap-2">
                     <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                     <span className="text-xs font-bold text-[#000000]/80">GrowthBox</span>
                  </div>
                </div>
              </div>

              {/* Video Placeholder (Now opens modal) */}
              <div 
                onClick={() => setShowVideoModal(true)}
                className="relative rounded-[2.5rem] overflow-hidden bg-[#111] aspect-video w-full max-w-4xl mx-auto group cursor-pointer shadow-2xl"
              >
                  {/* Background Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900 to-black opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  {/* Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-[#C7F6E4] flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(199,246,228,0.4)] group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-black fill-black" />
                      </div>
                      <span className="text-white font-medium text-lg tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          Watch Customer Stories
                      </span>
                  </div>
                  
                  {/* Bottom Text */}
                  <div className="absolute bottom-8 left-8">
                      <p className="text-[#C7F6E4] text-sm font-bold uppercase tracking-widest mb-1">Founders & Growth Leads</p>
                      <h3 className="text-white text-2xl font-bold">Why they chose Rockyt</h3>
                  </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* SEPARATE DEMO PAGE VIEW */}
      {currentView === 'demo' && (
        <main className="section-active min-h-screen pt-32 pb-24 bg-[#000000] relative">
          {/* Abstract Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C7F6E4]/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            {/* Breadcrumb */}
            <div className="mb-12">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentView('home'); }} 
                className="inline-flex items-center gap-2 text-[#FFFFFF]/50 hover:text-[#C7F6E4] transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </a>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Left: Persuasive Copy */}
              <div className="lg:col-span-5 space-y-12">
                <div>
                  <h1 className="text-6xl md:text-7xl font-medium tracking-tight text-[#FFFFFF] mb-6">
                    See Rockyt in
                    <br />
                    <span className="italic text-[#C7F6E4]">action</span>.
                  </h1>
                  <p className="text-xl text-[#FFFFFF]/60 font-light leading-relaxed">
                    Book a personalized demo to see how Rockyt can save your budget and scale your ads on day one.
                  </p>
                </div>

                <div className="space-y-8 border-t border-[#FFFFFF]/10 pt-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFFFFF]/5 flex items-center justify-center shrink-0 border border-[#FFFFFF]/10">
                      <Target className="w-5 h-5 text-[#C7F6E4]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#FFFFFF] text-lg">
                        Custom Strategy
                      </div>
                      <div className="text-sm text-[#FFFFFF]/50 leading-relaxed mt-1">
                        We'll analyze your current ad setup and show you exactly where you're wasting money.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFFFFF]/5 flex items-center justify-center shrink-0 border border-[#FFFFFF]/10">
                      <Zap className="w-5 h-5 text-[#C7F6E4]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#FFFFFF] text-lg">
                        Immediate Impact
                      </div>
                      <div className="text-sm text-[#FFFFFF]/50 leading-relaxed mt-1">
                        Most teams see improved ROAS within the first 48 hours of connection.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Proof Micro */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[#000000] bg-gray-600"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#000000] bg-gray-500"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#000000] bg-gray-400"></div>
                  </div>
                  <div className="text-sm text-[#FFFFFF]/40">
                    <span className="text-[#FFFFFF]">500+ growth teams</span>
                    <br />trust Rockyt
                  </div>
                </div>
              </div>

              {/* Right: The Form Card */}
              <div className="lg:col-span-7">
                <div className="bg-[#FFFFFF] p-8 md:p-12 rounded-[2.5rem] card-shadow relative overflow-hidden text-[#000000]">
                  {/* Form Header */}
                  <div className="flex justify-between items-center mb-8 border-b border-[#000000]/10 pb-8">
                    <div>
                      <h3 className="text-2xl font-bold">Book a Demo</h3>
                      <p className="text-[#000000]/60 text-sm mt-1">
                        Tell us about your ad needs.
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                      <ArrowRightCircle className="w-6 h-6 text-[#000000]" />
                    </div>
                  </div>

                  <form className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#000000]/40">
                          First Name
                        </label>
                        <input type="text" className="w-full py-2 input-minimal placeholder:text-[#000000]/30" placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#000000]/40">
                          Last Name
                        </label>
                        <input type="text" className="w-full py-2 input-minimal placeholder:text-[#000000]/30" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#000000]/40">
                        Work Email
                      </label>
                      <input type="email" className="w-full py-2 input-minimal placeholder:text-[#000000]/30" placeholder="jane@company.com" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#000000]/40">
                        Company Website
                      </label>
                      <input type="text" className="w-full py-2 input-minimal placeholder:text-[#000000]/30" placeholder="company.com" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#000000]/40">
                          Monthly Ad Spend
                        </label>
                        <select className="w-full py-2 bg-transparent border-b border-[#000000]/10 text-[#000000] focus:outline-none focus:border-[#000000] transition-colors">
                          <option>Less than $10k</option>
                          <option>$10k - $50k</option>
                          <option>$50k - $250k</option>
                          <option>$250k+</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#000000]/40">
                          Primary Platform
                        </label>
                        <select className="w-full py-2 bg-transparent border-b border-[#000000]/10 text-[#000000] focus:outline-none focus:border-[#000000] transition-colors">
                          <option>Meta (FB/IG)</option>
                          <option>Google / YouTube</option>
                          <option>TikTok</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button type="button" className="w-full py-5 bg-[#000000] text-[#FFFFFF] rounded-xl font-bold text-lg hover:bg-[#C7F6E4] hover:text-[#000000] transition-colors duration-300 flex items-center justify-center gap-2 group shadow-xl">
                        Schedule Demo
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="text-center text-xs text-[#000000]/30 mt-4">
                        By submitting, you agree to our Terms and Privacy Policy.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer (Only show on Home or Demo) */}
      {(currentView === 'home' || currentView === 'demo') && (
        <footer className="bg-[#000000] text-white pt-24 pb-12 rounded-t-[3rem] relative overflow-hidden -mt-12 border-t border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-4 gap-12 mb-24 text-sm">
              <div className="space-y-4">
                <h5 className="font-bold text-[#C7F6E4] uppercase tracking-wider mb-4">
                  Product
                </h5>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  Optimization
                </a>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  Creative Hub
                </a>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  Attribution
                </a>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold text-[#C7F6E4] uppercase tracking-wider mb-4">
                  Resources
                </h5>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  Blog
                </a>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  Case Studies
                </a>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  Help Center
                </a>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold text-[#C7F6E4] uppercase tracking-wider mb-4">
                  Company
                </h5>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  About
                </a>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  Careers
                </a>
                <a href="#" className="block text-[#FFFFFF]/60 hover:text-white">
                  Contact
                </a>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold text-[#C7F6E4] uppercase tracking-wider mb-4">
                  Social
                </h5>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#000000] transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#000000] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-end gap-8">
              {/* Big Logo */}
              <div className="flex-1 flex items-center gap-4">
                <RockytLogo className="w-16 h-16 text-white" />
                <span className="text-[clamp(4rem,10vw,8rem)] leading-none font-medium tracking-tighter block text-white">
                  Rockyt
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4 md:mb-8">
                <div className="w-2 h-2 rounded-full bg-[#C7F6E4] animate-pulse"></div>
                <span className="text-xs text-[#FFFFFF]/40">
                  System Operational • 24/7
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between text-xs text-[#FFFFFF]/30 mt-8">
              <p>© 2024 Rockyt AI Inc. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>

          {/* Floating Green Action Button (Home View Only) */}
          {currentView === 'home' && (
            <div className="fixed bottom-6 right-6 z-50">
              <button 
                onClick={() => setCurrentView('demo')}
                className="w-14 h-14 bg-[#C7F6E4] rounded-full flex items-center justify-center text-[#000000] shadow-2xl hover:scale-110 transition-transform border-2 border-[#000000] group cursor-pointer"
              >
                <Rocket className="w-7 h-7 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </footer>
      )}
    </>
  );
};

export default App;