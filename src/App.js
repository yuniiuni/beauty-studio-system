import React, { useState } from 'react';
import { LogOut, Plus, Clock, Heart, AlertCircle, Gift, Calendar } from 'lucide-react';

const BeautyStudioSystem = () => {
  // 模擬資料庫
  const [users] = useState({
    customer1: { name: '小王', password: '1234', phone: '0912345678' },
    customer2: { name: '小美', password: '5678', phone: '0987654321' },
    customer3: { name: '阿傑', password: '9999', phone: '0911223344' },
    admin: { name: '店家', password: '0000', role: 'admin' }
  });

  const [customerData] = useState({
    customer1: {
      name: '小王',
      totalVisits: 12,
      totalSpent: 2400,
      rewardPoints: 400, // 消費滿1000送100點
      visits: [
        { 
          date: '2024-12-03', 
          time: '14:30', 
          service: '全身紓壓', 
          duration: 90, 
          price: 2000, 
          bodyParts: ['肩頸', '腰部', '腿部'], 
          notes: '頸椎疼痛，需要加強肩頸',
          followUp: '建議每週來一次'
        },
        { 
          date: '2024-11-29', 
          time: '10:00', 
          service: '上肢紓壓', 
          duration: 60, 
          price: 1200, 
          bodyParts: ['肩頸', '手臂'], 
          notes: '最近工作壓力大，肩膀特別緊',
          followUp: '持續追蹤肩膀狀況'
        },
        { 
          date: '2024-11-24', 
          time: '15:45', 
          service: '全身紓壓', 
          duration: 90, 
          price: 2000, 
          bodyParts: ['肩頸', '腰部', '腿部'], 
          notes: '改善明顯，肩頸放鬆許多',
          followUp: '保持定期護理'
        },
      ]
    },
    customer2: {
      name: '小美',
      totalVisits: 8,
      totalSpent: 8200,
      rewardPoints: 800,
      visits: [
        { 
          date: '2024-12-02', 
          time: '19:00', 
          service: '全身深層紓壓', 
          duration: 120, 
          price: 2500, 
          bodyParts: ['頭部', '肩頸', '腰部', '臀部', '腿部'], 
          notes: '久坐族，下背部特別疼痛',
          followUp: '⚠️ 需要加強腰椎護理，建議搭配伸展運動'
        },
        { 
          date: '2024-11-28', 
          time: '18:30', 
          service: '臉部舒壓+全身紓壓', 
          duration: 120, 
          price: 3000, 
          bodyParts: ['頭部', '臉部', '肩頸', '腰部'], 
          notes: '壓力大，睡眠不足',
          followUp: '建議定期進行頭部舒壓'
        },
      ]
    },
    customer3: {
      name: '阿傑',
      totalVisits: 3,
      totalSpent: 1200,
      rewardPoints: 200,
      visits: [
        { 
          date: '2024-12-01', 
          time: '16:15', 
          service: '下肢紓壓', 
          duration: 60, 
          price: 1200, 
          bodyParts: ['腿部', '足部'], 
          notes: '新客戶，運動愛好者，腿部肌肉緊繃',
          followUp: '首次來訪，評估初期'
        },
      ]
    }
  });

  // 狀態管理
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // 登入功能
  const handleLogin = () => {
    const user = users[loginId];
    if (user && user.password === loginPassword) {
      setCurrentUser({ id: loginId, ...user });
      if (user.role === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('customer');
      }
      setLoginId('');
      setLoginPassword('');
    } else {
      alert('帳號或密碼錯誤');
    }
  };

  // 登出功能
  const handleLogout = () => {
    setCurrentPage('login');
    setCurrentUser(null);
  };

  // ============ 頁面：登入 ============
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">💆</div>
            <h1 className="text-3xl font-bold text-gray-800">鬆筋紓壓工作室</h1>
            <p className="text-gray-500 mt-2">Welcome to Our Studio</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">帳號</label>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="輸入帳號"
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition"
              />
              <p className="text-xs text-gray-400 mt-1">測試帳號: customer1, customer2, customer3, admin</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密碼</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="輸入密碼"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition pr-12"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">測試密碼: 1234, 5678, 9999, 0000</p>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold py-3 rounded-xl hover:shadow-lg transition transform hover:scale-105"
            >
              登 入
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ 頁面：顧客端 ============
  if (currentPage === 'customer' && currentUser) {
    const data = customerData[currentUser.id];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* 頁首 */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-6 shadow-lg">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            <div>
              <p className="text-sm opacity-90">歡迎回到</p>
              <h1 className="text-2xl font-bold">{data.name} 👋</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-4 space-y-6">
          {/* 統計卡片 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <p className="text-gray-600 text-sm">來訪次數</p>
              <p className="text-3xl font-bold text-pink-500 mt-2">{data.totalVisits}</p>
              <p className="text-xs text-gray-400 mt-1">次</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <p className="text-gray-600 text-sm">累計消費</p>
              <p className="text-3xl font-bold text-rose-500 mt-2">${data.totalSpent}</p>
              <p className="text-xs text-gray-400 mt-1">元</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <p className="text-gray-600 text-sm">獎勵點數</p>
              <p className="text-3xl font-bold text-purple-500 mt-2">{data.rewardPoints}</p>
              <p className="text-xs text-gray-400 mt-1">點</p>
            </div>
          </div>

          {/* 優惠券 */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 border-4 border-yellow-300 shadow-md">
            <div className="flex items-start gap-4">
              <Gift size={32} className="text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-yellow-900 text-lg">🎁 獎勵優惠券</p>
                <p className="text-sm text-yellow-800 mt-1">累計消費滿 1000 元送 100 點獎勵點數</p>
                <div className="mt-3 bg-yellow-200/50 rounded-lg p-3 border-2 border-dashed border-yellow-400">
                  <p className="font-bold text-yellow-900">您目前擁有: {Math.floor(data.rewardPoints / 100)} 張優惠券</p>
                  <p className="text-xs text-yellow-800 mt-1">每張可折抵 $100 元（下次消費時使用）</p>
                </div>
              </div>
            </div>
          </div>

          {/* 來訪紀錄 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={24} className="text-purple-500" />
              <h2 className="text-xl font-bold text-gray-800">來訪紀錄</h2>
            </div>

            <div className="space-y-4">
              {data.visits.map((visit, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition border-l-4 border-pink-400">
                  {/* 基本資訊 */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-lg text-gray-800">{visit.service}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        <span>📅 {visit.date}</span>
                        <span>🕐 {visit.time}</span>
                        <span className="flex items-center gap-1">⏱️ {visit.duration} 分鐘</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-pink-500">${visit.price}</p>
                  </div>

                  {/* 施作部位 */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">施作部位:</p>
                    <div className="flex flex-wrap gap-2">
                      {visit.bodyParts.map((part, i) => (
                        <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 施作紀錄 */}
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">施作紀錄:</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{visit.notes}</p>
                  </div>

                  {/* 追蹤建議 */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                    <div className="flex items-start gap-2">
                      <Heart size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800"><span className="font-semibold">專業建議:</span> {visit.followUp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ 頁面：店家管理端 ============
  if (currentPage === 'admin' && currentUser) {
    const customerList = Object.entries(customerData).map(([id, data]) => ({
      id,
      ...data,
      visits: data.visits.length,
      lastVisit: data.visits[0]?.date
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* 頁首 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 shadow-lg">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <div>
              <p className="text-sm opacity-90">工作室管理系統</p>
              <h1 className="text-2xl font-bold">💆 {currentUser.name}</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mt-6">📋 客戶管理</h2>
          
          {/* 客戶卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customerList.map((customer) => (
              <div key={customer.id} className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition">
                {/* 客戶基本資訊 */}
                <div className="mb-6 pb-4 border-b-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">ID: {customer.id}</p>
                  <p className="text-sm text-gray-600 mt-2">📞 {customer.phone}</p>
                </div>

                {/* 統計資訊 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">來訪次數</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{customer.visits}</p>
                  </div>
                  <div className="text-center bg-pink-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">消費總額</p>
                    <p className="text-2xl font-bold text-pink-600 mt-1">${customer.totalSpent}</p>
                  </div>
                  <div className="text-center bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">最後來訪</p>
                    <p className="text-sm font-bold text-purple-600 mt-1">{customer.lastVisit}</p>
                  </div>
                </div>

                {/* 編輯按鈕 */}
                <button
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setCurrentPage('adminEdit');
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
                >
                  詳細紀錄 & 新增施作
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============ 頁面：編輯客戶詳細紀錄 ============
  if (currentPage === 'adminEdit' && selectedCustomer) {
    const customer = customerData[selectedCustomer];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* 頁首 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 shadow-lg sticky top-0 z-10">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">{customer.name} - 詳細紀錄</h1>
            <button
              onClick={() => {
                setCurrentPage('admin');
                setSelectedCustomer(null);
              }}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* 客戶基本資訊 */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">基本資訊</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm">名字</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{customer.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">電話</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{users[selectedCustomer].phone}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">來訪次數</p>
                <p className="text-xl font-bold text-blue-600 mt-1">{customer.totalVisits} 次</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">累計消費</p>
                <p className="text-xl font-bold text-pink-600 mt-1">${customer.totalSpent}</p>
              </div>
            </div>
          </div>

          {/* 過往施作紀錄 */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📝 過往施作紀錄</h2>
            <div className="space-y-4">
              {customer.visits.map((visit, idx) => (
                <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border-l-4 border-blue-400">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{visit.service}</p>
                      <p className="text-sm text-gray-600 mt-1">📅 {visit.date} 🕐 {visit.time} | ⏱️ {visit.duration} 分鐘</p>
                    </div>
                    <p className="text-lg font-bold text-pink-500">${visit.price}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">施作部位:</p>
                    <div className="flex flex-wrap gap-2">
                      {visit.bodyParts.map((part, i) => (
                        <span key={i} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600 font-semibold">施作紀錄:</p>
                      <p className="text-sm text-gray-700 mt-1">{visit.notes}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600 font-semibold">追蹤建議:</p>
                      <p className="text-sm text-gray-700 mt-1">{visit.followUp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 新增施作紀錄提示 */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-6 border-2 border-green-300">
            <div className="flex items-start gap-3">
              <Plus size={28} className="text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-green-900 text-lg">➕ 新增施作紀錄</p>
                <p className="text-sm text-green-800 mt-2">目前系統版本為示範版本，新增功能將在完整版上線。您可以在此處記錄每次施作的部位、時數、注意事宜等專業資訊。</p>
              </div>
            </div>
          </div>

          {/* 返回按鈕 */}
          <button
            onClick={() => {
              setCurrentPage('admin');
              setSelectedCustomer(null);
            }}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-xl transition"
          >
            返 回
          </button>
        </div>
      </div>
    );
  }
};

export default BeautyStudioSystem;
