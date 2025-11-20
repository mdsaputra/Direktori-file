import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  Search, 
  Home, 
  Stethoscope, 
  Users, 
  User, 
  MessageCircle, 
  BookOpen, 
  HandHeart, 
  UserPlus, 
  Star, 
  MapPin,
  ChevronLeft,
  Mic,
  Edit2,
  Map,
  CreditCard,
  MessageSquare,
  LogOut,
  ChevronRight,
  Share2,
  CheckCircle,
  Wallet,
  Landmark,
  ChevronDown,
  Calendar,
  Clock,
  MessageSquareText,
  Paperclip,
  Send,
  Shield, 
  HeartCrack,
  Headphones, // Icon baru untuk putar audio
  Zap, // Icon baru untuk cepat
  Timer, // Icon untuk Durasi
  Sun, // Icon untuk Waktu
  Moon // Icon untuk Malam
} from 'lucide-react';

export default function App() {
  // State Navigasi Utama
  // Default activeTab 'beranda'
  const [activeTab, setActiveTab] = useState('beranda');
  
  // State untuk Halaman Pesan (Sub-tab)
  const [messageTab, setMessageTab] = useState('konsultasi'); // 'konsultasi' | 'undang'
  
  // State Khusus Booking Flow
  const [bookingStep, setBookingStep] = useState(null); 
  // STATE BARU: Untuk menentukan judul di halaman daftar Ustadz
  const [serviceType, setServiceType] = useState(null); // 'konsultasi' | 'undang' | 'ruqyah'
  const [selectedUstad, setSelectedUstad] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0); 
  const [selectedTime, setSelectedTime] = useState('07:00 PM');
  const [selectedPayment, setSelectedPayment] = useState('ewallet');

  // STATE BARU UNTUK CHAT DETAIL
  const [chatDetailVisible, setChatDetailVisible] = useState(false);
  const [selectedChatUstad, setSelectedChatUstad] = useState(null);
  
  // State untuk Ruqyah Specific Detail (Tambahan untuk Ruqyah)
  const [ruqyahType, setRuqyahType] = useState('mandiri');

  // Warna tema utama
  const themeColor = "bg-[#0D5D40]";
  const themeText = "text-[#0D5D40]";
  const themeBorder = "border-[#0D5D40]";

  // --- DATA MOCKUP ---
  
  // Data Ruqyah Mandiri BARU
  const ruqyahSessions = [
    { 
      id: 1, 
      title: "Ruqyah Diri Harian (Pagi)", 
      type: "Rutinitas",
      duration: "10 Menit",
      focus: "Penenang Hati & Tolak Bala", 
      timeIcon: <Sun size={16} />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      textColor: 'text-yellow-800'
    },
    { 
      id: 2, 
      title: "Ruqyah Gangguan Jin", 
      type: "Spesifik",
      duration: "30 Menit",
      focus: "Sihir, Ain, & Jin Pengganggu", 
      timeIcon: <HeartCrack size={16} />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      textColor: 'text-red-800'
    },
    { 
      id: 3, 
      title: "Ruqyah Tidur Malam", 
      type: "Kenyamanan",
      duration: "15 Menit",
      focus: "Mengatasi Gelisah & Insomnia", 
      timeIcon: <Moon size={16} />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-800'
    },
    { 
      id: 4, 
      title: "Ruqyah Rumah Tangga", 
      type: "Keluarga",
      duration: "20 Menit",
      focus: "Menjaga Keharmonisan", 
      timeIcon: <Users size={16} />,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-800'
    },
  ];

  const bookingUstads = [
    {
      id: 1,
      name: 'Ustad Nofri ardiansyah',
      specialty: 'Spesialis Ruqyah & Konsultasi Spiritual',
      serviceFocus: ['konsultasi', 'ruqyah'], 
      location: 'Matraman Baru',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      price: 'Rp. 155.000,00',
      stats: { jamaah: '7.500+', pengalaman: '10+', rating: '5.0+', ulasan: '2,567' },
      lastMsg: 'Waalaikumsalam, baik nanti kita jadwalkan ya.',
      isOnline: true
    },
    {
      id: 2,
      name: 'Ustad Noel',
      specialty: 'Pakar Kajian dan Bimbingan Iman',
      serviceFocus: ['undang', 'konsultasi', 'ruqyah'], 
      location: 'Matraman Baru',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      price: 'Rp. 150.000,00',
      stats: { jamaah: '5.000+', pengalaman: '8+', rating: '4.9+', ulasan: '1,200' },
      lastMsg: 'Insya Allah saya bisa hadir pak.',
      isOnline: false
    },
    {
      id: 3,
      name: 'Ustad Arif',
      specialty: 'Konselor Rumah Tangga Islami',
      serviceFocus: ['konsultasi'],
      location: 'Matraman Baru',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      price: 'Rp. 175.000,00',
      stats: { jamaah: '3.200+', pengalaman: '5+', rating: '4.8+', ulasan: '850' },
      lastMsg: 'Terima kasih kembali.',
      isOnline: true
    },
     {
      id: 4,
      name: 'Ustad Prana',
      specialty: 'Spesialis Konsultasi Spiritual',
      serviceFocus: ['konsultasi'],
      location: 'Matraman Baru',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      price: 'Rp. 160.000,00',
      stats: { jamaah: '4.100+', pengalaman: '6+', rating: '4.9+', ulasan: '900' },
      lastMsg: 'Siap, ditunggu kabar selanjutnya.',
      isOnline: false
    },
    {
      id: 5,
      name: 'Ustadz Fauzi Rabbani',
      specialty: 'Spesialis Fiqh & Kajian Publik',
      serviceFocus: ['undang'],
      location: 'Duren Sawit',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1581404116489-0b0c2049e083?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      price: 'Rp. 250.000,00',
      stats: { jamaah: '10.000+', pengalaman: '15+', rating: '4.7+', ulasan: '3,100' },
      lastMsg: 'Jazakallah khairan. Sudah saya terima.',
      isOnline: true
    },
    {
      id: 6,
      name: 'Ustadz Hamid Anwar',
      specialty: 'Penceramah Umum & Motivator Islam',
      serviceFocus: ['undang'],
      location: 'Cipinang',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1560520286-90c749b5c32c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      price: 'Rp. 200.000,00',
      stats: { jamaah: '8.500+', pengalaman: '12+', rating: '4.6+', ulasan: '1,500' },
      lastMsg: 'Terima kasih atas undangannya.',
      isOnline: false
    }
  ];

  // Data Surah Ruqyah Mandiri (Dibiarkan untuk referensi, tapi tidak dipakai di renderRuqyahPanduan)
  const ruqyahSurahs = [
    { id: 1, surah: "Al-Fatihah", verses: "1 - 7", benefit: "Pembuka dan penyembuh segala penyakit.", isRecommended: true },
    { id: 2, surah: "Al-Baqarah", verses: "1 - 5", benefit: "Perlindungan dari setan dan sihir.", isRecommended: true },
    { id: 3, surah: "Al-Baqarah", verses: "102 - 103", benefit: "Penawar sihir dan gangguan jin.", isRecommended: true },
    { id: 4, surah: "Al-Baqarah", verses: "255 (Ayat Kursi)", benefit: "Penjagaan diri dari segala kejahatan.", isRecommended: true },
    { id: 5, surah: "Al-Baqarah", verses: "285 - 286", benefit: "Penutup segala kebaikan dan penghapus dosa.", isRecommended: true },
    { id: 6, surah: "Ali 'Imran", verses: "18 - 19", benefit: "Penetapan keesaan Allah.", isRecommended: false },
    { id: 7, surah: "Al-A'raf", verses: "54 - 56", benefit: "Doa perlindungan dan memohon kebaikan.", isRecommended: false },
    { id: 8, surah: "Al-Mu'minun", verses: "115 - 118", benefit: "Doa memohon ampunan dan rahmat.", isRecommended: false },
    { id: 9, surah: "Yasin", verses: "1 - 12", benefit: "Kebaikan dan kemudahan urusan.", isRecommended: false },
    { id: 10, surah: "Al-Ikhlas", verses: "1 - 4", benefit: "Keikhlasan dan penolak bala.", isRecommended: true },
    { id: 11, surah: "Al-Falaq", verses: "1 - 5", benefit: "Perlindungan dari kejahatan makhluk.", isRecommended: true },
    { id: 12, surah: "An-Nas", verses: "1 - 6", benefit: "Perlindungan dari bisikan setan.", isRecommended: true },
  ];


  const services = [
    // PERUBAHAN UTAMA DI SINI: Langsung set bookingStep ke 'ruqyah_panduan'
    { 
      id: 1, 
      title: 'Ruqyah', 
      icon: <HandHeart size={24} />, 
      color: 'bg-emerald-100 text-emerald-700', 
      action: () => { 
        setBookingStep('ruqyah_panduan'); // Langsung ke halaman Panduan Ruqyah Mandiri
        setServiceType('ruqyah'); // Tetap set serviceType untuk navigasi
        setSelectedUstad(null); // Penting: Reset Ustadz yang dipilih
      }
    },
    { id: 2, title: 'Kajian', icon: <BookOpen size={24} />, color: 'bg-emerald-100 text-emerald-700' },
    { 
      id: 3, 
      title: 'Konsultasi', 
      icon: <MessageCircle size={24} />, 
      color: 'bg-emerald-100 text-emerald-700', 
      action: () => { 
        setServiceType('konsultasi'); 
        setBookingStep('list'); 
      } 
    },
    { 
      id: 4, 
      title: 'Undang Ustad', 
      icon: <UserPlus size={24} />, 
      color: 'bg-emerald-100 text-emerald-700', 
      action: () => { 
        setServiceType('undang'); 
        setBookingStep('list'); 
      } 
    },
  ];

  // Data chat mockup
  const chatMessages = [
    { id: 1, text: "Assalamualaikum Ustadz. Saya mau tanya tentang konsultasi ruqyah, apakah bisa dilakukan via online?", sender: 'user', time: '10:00 AM' },
    { id: 2, text: "Waalaikumsalam Wr. Wb. Insya Allah bisa. Untuk sesi online, kita bisa menggunakan video call. Apakah ada keluhan spesifik yang ingin disampaikan?", sender: 'ustad', time: '10:02 AM' },
    { id: 3, text: "Ya, ada Ustadz. Saya merasa gelisah dan susah tidur akhir-akhir ini. Ini pesan lama yang hanya untuk tampilan detail chat. Mohon diabaikan.", sender: 'user', time: '10:05 AM' },
    { id: 4, text: "Baik, mari kita jadwalkan waktu yang tepat. Silahkan cek jadwal saya di halaman booking. Semoga Allah mudahkan urusan kita.", sender: 'ustad', time: '10:07 AM' },
  ];

  const communities = [
    {
      id: 1,
      name: 'Sahabat Iman Sejati',
      members: 241,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      logo: <UserPlus className="text-blue-500" />
    },
    {
      id: 2,
      name: 'Hidup dengan Tenang',
      members: 250,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      logo: <HandHeart className="text-pink-500" />
    },
    {
      id: 3,
      name: 'Komunitas Cinta Kajian',
      members: 441,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      logo: <BookOpen className="text-purple-500" />
    },
    {
      id: 4,
      name: 'Gerakan Amal dan Doa',
      members: 344,
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      logo: <Users className="text-orange-500" />
    }
  ];

  const profileMenus = [
    { icon: <User size={20} />, label: 'Profile Saya' },
    { icon: <Map size={20} />, label: 'Alamat' },
    { icon: <Bell size={20} />, label: 'Notifikasi' },
    { icon: <CreditCard size={20} />, label: 'Metode Pembayaran' },
    { icon: <MessageSquare size={20} />, label: 'Konsultasi Saya' },
    { icon: <UserPlus size={20} />, label: 'Daftar Sebagai Ustadz' },
    { icon: <LogOut size={20} />, label: 'Keluar', isLogout: true },
  ];

  const dates = [
    { day: 'Hari Ini', date: '4 Okt' },
    { day: 'Senin', date: '5 Okt' },
    { day: 'Selasa', date: '6 Okt' },
    { day: 'Rabu', date: '7 Okt' },
  ];

  const times = ['07:00 PM', '07:30 PM', '08:00 PM'];

  // --- NAVIGASI HELPERS ---
  const handleBack = () => {
    // Navigasi Ruqyah Panduan kembali ke Beranda
    if (bookingStep === 'ruqyah_panduan') {
      setBookingStep(null);
    }
    else if (bookingStep === 'list') {
      setBookingStep(null);
      setServiceType(null); // Reset service type when going back to home
    }
    else if (bookingStep === 'detail') {
      // Jika Ustadz dipilih, kembali ke list (default)
      setBookingStep('list'); 
    }
    else if (bookingStep === 'payment') setBookingStep('detail');
    else if (bookingStep === 'summary') setBookingStep('payment');
    else if (bookingStep === 'success') setBookingStep(null);
  };

  const handleOpenChat = (ustad) => {
    setSelectedChatUstad(ustad);
    setChatDetailVisible(true);
  };
  
  // FUNGSI BARU: Halaman Panduan Ruqyah Mandiri (DIUBAH)
  const renderRuqyahPanduan = () => (
    <>
      <header className="flex items-center justify-between p-5 bg-white sticky top-0 z-10 shadow-sm">
        <button onClick={handleBack}><ChevronLeft className="text-gray-800" size={24} /></button>
        <h1 className="text-lg font-bold text-gray-800">Ruqyah Mandiri</h1>
        <Shield className="text-gray-800" size={24} />
      </header>

      <div className="px-5 pb-24 space-y-6 overflow-y-auto">
        
        {/* Banner/Instruksi Singkat */}
        <div className={`bg-amber-50 border-l-4 border-amber-400 p-4 rounded-xl shadow-sm`}>
          <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2"><Headphones size={20} /> Panduan Audio</h3>
          <p className="text-sm text-gray-600">Dengarkan dan ikuti bacaan surah-surah ruqyah yang direkomendasikan.</p>
          <button className={`mt-3 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-transform`}>
            <Zap size={14} /> Putar Audio Ruqyah
          </button>
        </div>

        {/* Daftar Sesi Ruqyah Mandiri BARU */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pilih Sesi Ruqyah Anda</h3>
          <p className="text-sm text-gray-600 mb-4">Pilih jenis ruqyah sesuai dengan kebutuhan dan waktu Anda.</p>

          <div className="space-y-4">
            {ruqyahSessions.map((session) => (
              <div 
                key={session.id} 
                className={`bg-white border ${session.borderColor} p-4 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow`}
              >
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-800 text-base">{session.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${session.bgColor} ${session.textColor}`}>{session.type}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold">Fokus: </span>
                  {session.focus}
                </p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Timer size={14} className={session.textColor} />
                    <span>Durasi: <span className="font-bold">{session.duration}</span></span>
                  </div>
                  <button className={`${themeColor} text-white px-4 py-1.5 rounded-lg text-xs font-semibold active:scale-95 transition-transform`}>
                    Mulai Sesi
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
        
        {/* Catatan Penting */}
        <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-700 text-sm mb-2">Petunjuk Penting</h4>
          <ul className="text-xs text-blue-600 list-disc list-inside space-y-1">
            <li>Niatkan dengan tulus hanya kepada Allah SWT.</li>
            <li>Pastikan Anda dalam keadaan berwudhu.</li>
            <li>Letakkan tangan di bagian tubuh yang terasa sakit atau bermasalah.</li>
          </ul>
        </div>

      </div>
    </>
  );


  // --- RENDER UTAMA PER-TAB ---

  const renderBeranda = () => (
    <>
      <header className="flex justify-between items-center p-5 bg-white sticky top-0 z-10 shadow-sm">
        <div>
          <p className="text-sm text-gray-500 font-medium">Assalamualaikum,</p>
          <h1 className={`text-2xl font-bold ${themeText}`}>Cahaya Qonitah</h1>
        </div>
        <div className="flex gap-4">
          <button className="relative">
            <Bell className="text-gray-700" size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border border-white"></span>
          </button>
          <button>
            <Menu className="text-gray-700" size={24} />
          </button>
        </div>
      </header>

      <div className="px-5 space-y-6 pb-24 pt-4">
        {/* Hero */}
        <div className={`${themeColor} rounded-2xl p-5 text-white relative overflow-hidden shadow-lg`}>
          <div className="relative z-10 w-2/3">
            <h2 className="text-lg font-semibold leading-tight mb-4">Pilih ustad untuk Kajianmu sekarang</h2>
            <button onClick={() => { setServiceType('undang'); setBookingStep('list'); }} className="bg-white text-[#0D5D40] px-4 py-2 rounded-lg text-sm font-bold shadow-md active:scale-95 transition-transform">Cari Sekarang!</button>
          </div>
           <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
             <img 
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
              alt="Muslim Man" 
              className="w-full h-full object-cover object-top"
              style={{clipPath: 'circle(70% at 70% 80%)'}}
             />
          </div>
        </div>

        {/* Layanan */}
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Layanan Kami</h3>
          <div className="grid grid-cols-4 gap-4">
            {services.map((item) => (
              // Menggunakan item.action untuk navigasi booking list jika ada
              <div 
                key={item.id} 
                onClick={item.action || (() => { /* Do nothing if no action */ })} 
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-2xl ${themeColor} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-center text-gray-700 leading-tight">{item.title === 'Konsultasi' ? 'Konsultasi Ustad' : item.title}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Rekomendasi Home - Menampilkan 2 Ustadz pertama (Konsultasi fokus) */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-gray-800">Rekomendasi Ustad</h3>
            <button className={`${themeText} text-xs font-semibold hover:underline`}>Lihat Semua</button>
          </div>
           <div className="flex flex-col gap-4">
            {/* Mengambil 2 Ustadz awal, yang kebetulan fokus konsultasi, sebagai rekomendasi umum */}
            {bookingUstads.slice(0,2).map((ustad) => (
              <div key={ustad.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex gap-4 items-center">
                <img src={ustad.image} alt={ustad.name} className="w-20 h-20 rounded-xl object-cover bg-gray-200" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{ustad.name}</h4>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{ustad.specialty}</p>
                  
                  {/* PENAMBAHAN: Lokasi dan Rating */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                      <MapPin size={10} className="text-emerald-600" />
                      <span>{ustad.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-600">
                      <Star size={10} className="text-orange-400 fill-orange-400" />
                      <span>{ustad.rating}</span>
                    </div>
                  </div>
                  {/* END PENAMBAHAN */}

                  {/* Di sini, ubah Chat Sekarang untuk membuka Chat Detail */}
                  <button onClick={() => handleOpenChat(ustad)} className={`${themeColor} text-white w-full py-2 rounded-lg text-xs font-semibold`}>Chat Sekarang</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );

  // INI YANG DIUBAH: renderPesan (sebelumnya renderKonsultasi)
  const renderPesan = () => (
    <>
      <header className="flex justify-between items-center p-5 bg-white sticky top-0 z-10">
        <div className="w-6"></div>
        <h1 className="text-lg font-bold text-gray-800">Pesan</h1>
        <Edit2 className="text-gray-800" size={20} />
      </header>

      <div className="px-5 pb-24 space-y-6">
        {/* Toggle Switch Pilihan */}
        <div className="bg-gray-100 p-1 rounded-xl flex shadow-inner">
          <button 
            onClick={() => setMessageTab('konsultasi')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${messageTab === 'konsultasi' ? 'bg-white text-[#0D5D40] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Konsultasi
          </button>
          <button 
             onClick={() => setMessageTab('undang')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${messageTab === 'undang' ? 'bg-white text-[#0D5D40] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Undang Ustad
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder={messageTab === 'konsultasi' ? "Cari chat konsultasi..." : "Cari riwayat booking..."}
            className="w-full py-3 pl-12 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <Mic className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* List Content Berdasarkan Pilihan Tab */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {messageTab === 'konsultasi' ? (
            // CONTENT 1: Chat Konsultasi (Pakai layout chat list)
            // Menggunakan semua Ustadz karena ini adalah riwayat chat, bukan rekomendasi
            bookingUstads.map((ustad) => (
              <div 
                key={ustad.id} 
                onClick={() => handleOpenChat(ustad)} // PENTING: Tambahkan handler klik di sini
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99]"
              >
                <div className="relative">
                  <img src={ustad.image} alt={ustad.name} className="w-14 h-14 rounded-full object-cover bg-gray-200" />
                  <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${ustad.isOnline ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white rounded-full`}></span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{ustad.name}</h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">12:00</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{ustad.lastMsg}</p>
                </div>
              </div>
            ))
          ) : (
            // CONTENT 2: Pesan Undang Ustad (Layout Booking Status)
            // Mengambil 3 Ustadz, termasuk yang fokus 'undang'
            bookingUstads.slice(0, 3).map((ustad, idx) => (
               <div key={ustad.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                <img src={ustad.image} alt={ustad.name} className="w-14 h-14 rounded-xl object-cover bg-gray-200" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{ustad.name}</h4>
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-emerald-100 text-emerald-700'}`}>
                       {idx === 0 ? 'Menunggu' : 'Diterima'}
                     </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-2">Undangan Kajian Rutin</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 border-t border-gray-50 pt-2 mt-1">
                    <Calendar size={12} /> <span>12 Okt 2025</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

  // FUNGSI BARU: RENDER CHAT DETAIL (Tidak berubah)
  const renderChatDetail = () => {
    if (!selectedChatUstad) return null; // Guard clause

    return (
      <div className="flex flex-col h-full bg-gray-50">
        <header className="flex items-center p-4 bg-white sticky top-0 z-10 shadow-sm">
          <button onClick={() => setChatDetailVisible(false)} className="mr-4"><ChevronLeft className="text-gray-800" size={24} /></button>
          
          <div className="flex items-center flex-1 gap-3">
             <div className="relative">
                <img src={selectedChatUstad.image} alt={selectedChatUstad.name} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${selectedChatUstad.isOnline ? 'bg-green-500' : 'bg-gray-400'} border border-white rounded-full`}></span>
             </div>
             <div>
                <h1 className="font-bold text-sm text-gray-800">{selectedChatUstad.name}</h1>
                <p className={`text-[10px] ${selectedChatUstad.isOnline ? 'text-green-500' : 'text-gray-400'} font-medium`}>
                  {selectedChatUstad.isOnline ? 'Online' : 'Offline'}
                </p>
             </div>
          </div>
          <button><Menu className="text-gray-800" size={24} /></button>
        </header>

        {/* Chat Body */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
          <div className="text-center text-xs text-gray-400 py-2">
            Hari Ini
          </div>

          {chatMessages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-xl shadow-sm ${
                msg.sender === 'user' 
                  ? `${themeColor} text-white rounded-br-none` 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <div className={`text-right mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                  <span className="text-[10px]">{msg.time}</span>
                </div>
              </div>
            </div>
          ))}
          
           {/* Placeholder for ensuring the last message is visible */}
           <div className="h-0.5"></div> 

        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip size={24} />
          </button>
          <input 
            type="text" 
            placeholder="Tulis pesan..."
            className="flex-1 py-3 px-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          <button className={`${themeColor} text-white p-2 rounded-full shadow-lg active:scale-95 transition-transform`}>
            <Send size={24} />
          </button>
        </div>
      </div>
    );
  };

  const renderKomunitas = () => (
    <>
      <header className="flex justify-between items-center p-5 bg-white sticky top-0 z-10">
        <div className="w-6"></div>
        <h1 className="text-lg font-bold text-gray-800">Komunitas</h1>
        <MessageCircle className="text-gray-800" size={24} />
      </header>

      <div className="px-5 pb-24 space-y-6">
        <div className={`${themeColor} rounded-xl p-4 flex items-center text-white relative overflow-hidden`}>
           <div className="flex-1 z-10 pr-2">
             <p className="text-xs font-medium leading-relaxed">
               Bergabunglah dengan komunitas yang menguatkan iman dan memperluas ukhuwah!
             </p>
           </div>
           <div className="w-24 h-16 bg-white/20 rounded-lg flex items-center justify-center ml-2">
             <Users size={32} className="text-white/80" />
           </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Cari komunitas..." className="w-full py-3 pl-12 pr-4 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {communities.map((comm) => (
            <div key={comm.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="h-20 w-full relative">
                <img src={comm.image} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm p-1">
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    {comm.logo}
                  </div>
                </div>
              </div>
              <div className="pt-8 pb-4 px-3 text-center flex-1 flex flex-col">
                <h4 className="font-bold text-gray-800 text-xs mb-1 line-clamp-2">{comm.name}</h4>
                <p className="text-[10px] text-gray-500 mb-3">{comm.members} members</p>
                <button className={`${themeColor} text-white w-full py-2 rounded-lg text-xs font-semibold mt-auto`}>
                  Gabung
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderSaya = () => (
    <>
      <header className="flex justify-center items-center p-5 bg-white sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-800">Profile</h1>
      </header>

      <div className="px-5 pb-24">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img src="https://images.unsplash.com/photo-1554151228-14d9def656ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className={`absolute bottom-0 right-0 p-1.5 ${themeColor} rounded-full text-white border-2 border-white`}>
              <Edit2 size={14} />
            </button>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Cahaya Qonitah</h2>
          <p className="text-xs text-gray-500 mt-1">reisee444@.com | +62 812-9781-1242</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {profileMenus.map((menu, index) => (
            <button 
              key={index}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${index !== profileMenus.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`${menu.isLogout ? 'text-red-500' : themeText} opacity-80`}>
                  {menu.icon}
                </div>
                <span className={`text-sm font-medium ${menu.isLogout ? 'text-red-500' : 'text-gray-700'}`}>
                  {menu.label}
                </span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </>
  );

  // Bagian Booking List & Detail dikurangi untuk fokus pada Ruqyah Panduan

  const renderBookingList = () => {
    // 1. Logika Filter Ustadz berdasarkan serviceType
    const filteredUstads = bookingUstads.filter(ustad => 
      ustad.serviceFocus.includes(serviceType)
    );

    // 2. Judul yang Disesuaikan
    const title = serviceType === 'konsultasi' ? 'Konsultasi' : 
                  (serviceType === 'undang' ? 'Panggil Ustad' : 'Pilih Ustadz'); 

    return (
      <>
        <header className="flex items-center p-5 bg-white sticky top-0 z-10">
          <button onClick={handleBack} className="mr-4"><ChevronLeft className="text-gray-800" size={24} /></button>
          <h1 className="text-lg font-bold text-gray-800 flex-1 text-center mr-8">
            {title}
          </h1>
        </header>
        <div className="px-5 pb-10 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder={`Cari Ustadz spesialis ${serviceType}....`} className="w-full py-2.5 pl-10 pr-8 border border-gray-200 rounded-xl text-sm focus:outline-none" />
              <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button className="flex items-center gap-1 bg-red-50 px-4 py-2 rounded-xl border border-red-100 text-sm text-gray-700 font-medium">
              <span>Matraman</span>
              <ChevronDown size={16} />
            </button>
          </div>
          {filteredUstads.map((ustad) => (
            <div key={ustad.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
               <img src={ustad.image} alt={ustad.name} className="w-20 h-24 rounded-xl object-cover bg-gray-200" />
               <div className="flex-1 flex flex-col justify-between">
                 <div>
                   <h4 className="font-bold text-gray-800 text-sm mb-1">{ustad.name}</h4>
                   <p className="text-[10px] text-gray-500 mb-2 font-medium">{ustad.specialty}</p>
                   <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                      <MapPin size={10} className="text-emerald-600" /><span>{ustad.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-600">
                      <Star size={10} className="text-emerald-600 fill-emerald-600" /><span>{ustad.rating} Review Rating</span>
                    </div>
                 </div>
                 <div className="flex justify-end mt-2">
                   <button onClick={() => { setSelectedUstad(ustad); setBookingStep('detail'); }} className={`${themeColor} text-white px-6 py-1.5 rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-transform`}>Jadwalkan</button>
                 </div>
               </div>
            </div>
          ))}
          {filteredUstads.length === 0 && (
             <div className="p-4 text-center text-gray-500 text-sm bg-gray-100 rounded-xl">
               Tidak ada Ustadz yang tersedia untuk layanan <span className="font-bold capitalize">{serviceType}</span> saat ini.
             </div>
          )}
        </div>
      </>
    );
  };

  const renderBookingDetail = () => {
    // Jika tidak ada ustadz terpilih (misal, user refresh), kembali ke list atau home
    if (!selectedUstad) return null; 

    const headerTitle = 'Profile Ustad';
    const bottomButtonText = 'Jadwalkan Sekarang';
    
    return (
      <>
        <header className="flex items-center justify-between p-5 bg-white sticky top-0 z-10">
          <button onClick={handleBack}><ChevronLeft className="text-gray-800" size={24} /></button>
          <h1 className="text-lg font-bold text-gray-800">{headerTitle}</h1>
          <Share2 className="text-gray-800" size={20} />
        </header>
        <div className="px-5 pb-24 overflow-y-auto">
          {/* Bagian Profil Ustadz */}
          <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                 <img src={selectedUstad.image} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white"><CheckCircle size={12} /></div>
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-base">{selectedUstad.name}</h2>
              <p className="text-xs text-gray-500 mb-1">{selectedUstad.specialty}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={12} className={`${themeText}`} /><span>{selectedUstad.location}</span></div>
            </div>
          </div>
          
          {/* Statistik Ustadz */}
          <div className="flex justify-between px-2 mb-8">
            {[{ label: 'Jamaah', val: selectedUstad.stats.jamaah, icon: <Users size={20} /> }, { label: 'Pengalaman', val: selectedUstad.stats.pengalaman, icon: <BookOpen size={20} /> }, { label: 'Rating', val: selectedUstad.stats.rating, icon: <Star size={20} fill="currentColor" /> }, { label: 'Ulasan', val: selectedUstad.stats.ulasan, icon: <MessageSquare size={20} /> }].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                 <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">{stat.icon}</div>
                 <span className="font-bold text-xs text-gray-800">{stat.val}</span><span className="text-[10px] text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Jadwal Booking Biasa */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Jadwal Ustad</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {dates.map((d, idx) => (
                  <button key={idx} onClick={() => setSelectedDate(idx)} className={`flex flex-col items-center justify-center min-w-[70px] py-3 rounded-2xl border transition-colors ${selectedDate === idx ? `${themeColor} text-white border-transparent` : 'bg-white border-gray-200 text-gray-400'}`}><span className="text-[10px] font-medium mb-1">{d.day}</span><span className="text-sm font-bold">{d.date}</span></button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Waktu</h3>
              <div className="flex gap-3">
                {times.map((t, idx) => (
                  <button key={idx} onClick={() => setSelectedTime(t)} className={`px-6 py-2 rounded-full text-xs font-medium border transition-colors ${selectedTime === t ? `${themeColor} text-white border-transparent` : 'bg-white border-gray-200 text-gray-500'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Lokasi</h3>
              <div className="relative"><input type="text" placeholder="Masukkan Lokasi Anda" className="w-full py-3 px-4 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" /></div>
              <div className="mt-4 bg-gray-50 p-3 rounded-xl flex justify-between items-center"><span className="text-xs text-gray-600 font-medium">Ingin jadwal pribadi?</span><button className={`${themeText} text-xs font-bold`}>Ajukan Jadwal Sendiri</button></div>
            </div>
          </div>
          
          {/* Tombol Bawah - Selalu Tampil */}
          <div className="fixed bottom-0 left-0 w-full bg-white p-5 border-t border-gray-100 max-w-md mx-auto">
             <button onClick={() => setBookingStep('payment')} className={`w-full ${themeColor} text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-transform`}>{bottomButtonText}</button>
          </div>
        </div>
      </>
    );
  };

  const renderPaymentMethod = () => (
    <>
       <header className="flex items-center p-5 bg-white sticky top-0 z-10">
        <button onClick={handleBack} className="mr-4"><ChevronLeft className="text-gray-800" size={24} /></button>
        <h1 className="text-lg font-bold text-gray-800">Metode Pembayaran</h1>
      </header>
      <div className="px-5 pb-32 space-y-6 overflow-y-auto">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="relative"><img src={selectedUstad.image} alt="" className="w-12 h-12 rounded-full object-cover" /><CheckCircle className="absolute -bottom-1 -right-1 text-emerald-500 bg-white rounded-full" size={14} /></div>
          <div><h4 className="font-bold text-gray-800 text-sm">{selectedUstad.name}</h4><p className="text-[10px] text-gray-500">{selectedUstad.specialty}</p><div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5"><MapPin size={10} /> <span>{selectedUstad.location}</span></div></div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">Tambah Metode Pembayaran</h3>
          <div className="border border-emerald-600 bg-emerald-50 rounded-xl p-3 flex justify-between items-center">
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-4 border-emerald-600"></div><span className="text-sm font-medium text-gray-700">Tambah Metode</span></div>
            <Wallet size={20} className="text-emerald-700" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">Pilih Metode Pembayaran</h3>
          <div className="space-y-3">
             <button onClick={() => setSelectedPayment('ewallet')} className={`w-full border rounded-xl p-3 flex justify-between items-center ${selectedPayment === 'ewallet' ? 'border-emerald-500 bg-white ring-1 ring-emerald-500' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-3"><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === 'ewallet' ? 'border-emerald-500' : 'border-gray-300'}`}>{selectedPayment === 'ewallet' && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}</div><span className="text-sm text-gray-700">E-Wallet</span></div>
                <div className="flex gap-1"><span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1 rounded">DANA</span><span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1 rounded">Gopay</span></div>
             </button>
             <button onClick={() => setSelectedPayment('cc')} className={`w-full border rounded-xl p-3 flex justify-between items-center ${selectedPayment === 'cc' ? 'border-emerald-500 bg-white ring-1 ring-emerald-500' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-3"><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === 'cc' ? 'border-emerald-500' : 'border-gray-300'}`}>{selectedPayment === 'cc' && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}</div><span className="text-sm text-gray-700">Credit Card</span></div>
                <div className="flex gap-1"><CreditCard size={16} className="text-gray-500" /></div>
             </button>
             <button onClick={() => setSelectedPayment('transfer')} className={`w-full border rounded-xl p-3 flex justify-between items-center ${selectedPayment === 'transfer' ? 'border-emerald-500 bg-white ring-1 ring-emerald-500' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-3"><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === 'transfer' ? 'border-emerald-500' : 'border-gray-300'}`}>{selectedPayment === 'transfer' && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}</div><span className="text-sm text-gray-700">Bank Transfer</span></div>
                <div className="flex gap-1"><Landmark size={16} className="text-gray-500" /></div>
             </button>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 space-y-2"><div className="flex justify-between text-xs text-gray-600"><span>Total Pembayaran:</span><span>Rp. 150.000,00</span></div><div className="flex justify-between text-xs text-gray-600"><span>Biaya Layanan:</span><span>Rp. 5.000,00</span></div><div className="flex justify-between text-sm font-bold text-gray-800 pt-2"><span>Total Akhir:</span><span>{selectedUstad.price}</span></div></div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-5 border-t border-gray-100 max-w-md mx-auto">
         <button onClick={() => setBookingStep('summary')} className={`w-full ${themeColor} text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-transform`}>Lihat Ringkasan Pesanan</button>
      </div>
    </>
  );

  const renderSummary = () => (
    <>
      <header className="flex items-center p-5 bg-white sticky top-0 z-10">
        <button onClick={handleBack} className="mr-4"><ChevronLeft className="text-gray-800" size={24} /></button>
        <h1 className="text-lg font-bold text-gray-800">Ringkasan Pemesanan</h1>
      </header>
      <div className="px-5 pb-32 space-y-6">
        <div className="flex items-center gap-3 py-2 border-b border-gray-100 pb-4">
           <div className="relative"><img src={selectedUstad.image} alt="" className="w-14 h-14 rounded-full object-cover" /><CheckCircle className="absolute -bottom-1 -right-1 text-emerald-500 bg-white rounded-full" size={16} /></div>
          <div><h4 className="font-bold text-gray-800">{selectedUstad.name}</h4><p className="text-xs text-gray-500">{selectedUstad.specialty}</p><div className="flex items-center gap-1 text-xs text-gray-500 mt-1"><MapPin size={12} /> <span>{selectedUstad.location}</span></div></div>
        </div>
        <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Tanggal & Waktu</span><span className="font-medium text-gray-800">12 Oktober 2025 | {selectedTime}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Jenis Layanan</span><span className="font-medium text-gray-800">Konsultasi Ringan</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Durasi</span><span className="font-medium text-gray-800">30 Menit</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Untuk Siapa</span><span className="font-medium text-gray-800">Diri Sendiri</span></div>
        </div>
        <div className="border-t border-gray-100 my-4"></div>
        <div className="space-y-3 text-sm">
           <div className="flex justify-between"><span className="text-gray-500">Biaya Layanan</span><span className="font-medium text-gray-800">{selectedUstad.price}</span></div>
           <div className="flex justify-between"><span className="text-gray-500">Biaya Transport (jika Panggil Ustad)</span><span className="font-medium text-gray-800">Rp. 20.000,00</span></div>
           <div className="flex justify-between"><span className="text-gray-500">Durasi</span><span className="font-medium text-gray-800">1 x {selectedUstad.price}</span></div>
           <div className="flex justify-between font-bold text-base pt-2"><span className="text-gray-800">Total Biaya</span><span className="text-gray-800">{selectedUstad.price}</span></div>
        </div>
        <div className="border-t border-gray-100 my-4"></div>
        <div className="flex justify-between items-center"><span className={`${themeText} font-medium text-sm`}>Metode Pembayaran</span><div className="border border-gray-200 px-3 py-1 rounded flex items-center gap-1 text-xs font-bold text-gray-700">GoPay <span className="text-blue-500 italic">G</span></div></div>
      </div>
       <div className="fixed bottom-0 left-0 w-full bg-white p-5 border-t border-gray-100 max-w-md mx-auto">
         <button onClick={() => setBookingStep('success')} className={`w-full ${themeColor} text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-transform`}>Bayar Sekarang</button>
      </div>
    </>
  );

  const renderSuccess = () => (
    <div className="flex flex-col h-full bg-white">
       <header className="flex items-center p-5">
        <button onClick={() => setBookingStep(null)} className="mr-4"><ChevronLeft className="text-gray-800" size={24} /></button>
        <h1 className="text-lg font-bold text-gray-800 flex-1 text-center mr-8">Pembayaran</h1>
      </header>
      <div className="flex-1 flex flex-col items-center pt-10 px-6 text-center">
         <div className={`${themeColor} w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg`}><CheckCircle className="text-white" size={48} /></div>
         <h2 className="text-xl font-bold text-gray-800 mb-3">Pembayaran Berhasil!</h2>
         <p className="text-xs text-gray-500 px-4 leading-relaxed mb-8">Anda telah berhasil memesan jadwal konsultasi dengan <br/><span className="font-bold text-gray-800">{selectedUstad.name}</span></p>
         <div className="w-full border-t border-gray-200 mb-8 border-dashed"></div>
         <div className="w-full grid grid-cols-2 gap-y-6 gap-x-4 text-left px-4">
            <div><div className="flex items-center gap-2 mb-1 text-gray-500 text-xs"><User size={14} /> <span>Nama</span></div><p className="font-medium text-sm text-gray-800">Cahaya Qonitah</p></div>
            <div><div className="flex items-center gap-2 mb-1 text-gray-500 text-xs"><Clock size={14} /> <span>Waktu</span></div><p className="font-medium text-sm text-gray-800">{selectedTime}</p></div>
             <div><div className="flex items-center gap-2 mb-1 text-gray-500 text-xs"><Calendar size={14} /> <span>Tanggal</span></div><p className="font-medium text-sm text-gray-800">12 Oktober, 2025</p></div>
             <div><div className="flex items-center gap-2 mb-1 text-gray-500 text-xs"><Wallet size={14} /> <span>Total</span></div><p className="font-medium text-sm text-gray-800">{selectedUstad.price}</p></div>
         </div>
      </div>
       <div className="p-5 space-y-3 pb-10">
         <button onClick={() => { setBookingStep(null); setActiveTab('pesan'); }} className={`w-full ${themeColor} text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-transform`}>Lihat Jadwal Konsultasi</button>
         <button onClick={() => setBookingStep(null)} className="w-full bg-white text-gray-500 py-3 rounded-xl font-medium text-sm hover:text-gray-800 transition-colors">Kembali ke Beranda</button>
      </div>
    </div>
  );

  // --- MAIN RENDER LOGIC ---

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans">
      <style>
        {`
          /* Custom scrollbar for chat body */
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #d1d5db; /* gray-300 */
            border-radius: 10px;
          }
        `}
      </style>
      <div className="w-full max-w-md bg-white shadow-xl relative h-screen flex flex-col">
        
        {/* Jika sedang dalam Chat Detail, render Full Screen Overlay */}
        {chatDetailVisible && selectedChatUstad ? (
           <div className="flex-1 overflow-hidden bg-white z-50 absolute top-0 left-0 w-full h-full animate-in slide-in-from-right-5 duration-300">
             {renderChatDetail()}
           </div>
        ) : bookingStep ? (
          /* Jika sedang dalam Booking Flow, render Full Screen Overlay Booking */
          <div className="flex-1 overflow-y-auto bg-white z-50 absolute top-0 left-0 w-full h-full animate-in slide-in-from-bottom-5 duration-300">
            {bookingStep === 'ruqyah_panduan' && renderRuqyahPanduan()}
            {bookingStep === 'list' && renderBookingList()}
            {bookingStep === 'detail' && renderBookingDetail()}
            {bookingStep === 'payment' && renderPaymentMethod()}
            {bookingStep === 'summary' && renderSummary()}
            {bookingStep === 'success' && renderSuccess()}
          </div>
        ) : (
          /* Normal View (Tabs) */
          <>
            <main className="flex-1 overflow-y-auto scrollbar-hide">
              {activeTab === 'beranda' && renderBeranda()}
              {activeTab === 'pesan' && renderPesan()} 
              {activeTab === 'komunitas' && renderKomunitas()}
              {activeTab === 'saya' && renderSaya()}
            </main>

            <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center rounded-t-2xl shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20">
              {[
                { id: 'beranda', icon: Home, label: 'Beranda' },
                { id: 'pesan', icon: MessageSquareText, label: 'Pesan' }, // Icon Pesan Baru
                { id: 'komunitas', icon: Users, label: 'Komunitas' },
                { id: 'saya', icon: User, label: 'Profile' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? themeText : 'text-gray-400'}`}
                >
                  <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                  <span className="text-[10px] font-medium capitalize">{tab.label}</span>
                  {activeTab === tab.id && <div className={`h-1 w-8 ${themeColor} rounded-full absolute top-0`}></div>}
                </button>
              ))}
            </nav>
          </>
        )}

      </div>
    </div>
  );
}

