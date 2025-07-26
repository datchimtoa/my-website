import React from 'react';
import { Globe, Shield, Clock, Users, Star, Zap, Server, HeadphonesIcon, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/image.png" alt="Guinness VNC" className="h-10 w-auto mr-3" />
              <span className="text-xl font-bold text-white">Guinness VNC</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Trang chủ</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Tính năng</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Bảng giá</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Liên hệ</a>
            </nav>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <img src="/image.png" alt="Guinness VNC" className="h-24 w-auto mx-auto mb-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HOSTING GUINNESS
            </span>
            <br />
            <span className="text-white">VNC MINECRAFT</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Hosting Minecraft chuyên nghiệp tại Việt Nam. Tốc độ cao, độ ổn định 99.9%, 
            hỗ trợ 24/7 và giá cả phải chăng cho game thủ Việt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Bắt đầu ngay <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-500/10 transition-all duration-300">
              Xem Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-700/50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div className="bg-gray-700/50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-green-400 mb-2">5K+</div>
              <div className="text-gray-300">Servers</div>
            </div>
            <div className="bg-gray-700/50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300">Hỗ trợ</div>
            </div>
            <div className="bg-gray-700/50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-orange-400 mb-2">3 năm</div>
              <div className="text-gray-300">Kinh nghiệm</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Tại Sao Chọn Guinness VNC?
            </h2>
            <p className="text-xl text-gray-300">
              Hosting Minecraft chuyên nghiệp với công nghệ tiên tiến nhất
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Performance Cao</h3>
              <p className="text-gray-300">
                CPU Intel Xeon, RAM DDR4, SSD NVMe đảm bảo server Minecraft chạy mượt mà
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Anti-DDoS</h3>
              <p className="text-gray-300">
                Bảo vệ server khỏi các cuộc tấn công DDoS với hệ thống phòng thủ tiên tiến
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <HeadphonesIcon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Hỗ Trợ 24/7</h3>
              <p className="text-gray-300">
                Team support Việt Nam sẵn sàng hỗ trợ qua Discord, Telegram 24/7
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
                <Server className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Datacenter VN</h3>
              <p className="text-gray-300">
                Server đặt tại Việt Nam, ping thấp, tốc độ kết nối tối ưu cho game thủ VN
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Setup Tức Thì</h3>
              <p className="text-gray-300">
                Server được setup và kích hoạt ngay sau khi thanh toán, không chờ đợi
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Cộng Đồng</h3>
              <p className="text-gray-300">
                Tham gia cộng đồng 5000+ game thủ Minecraft Việt Nam trên Discord
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Bảng Giá Minecraft Hosting</h2>
            <p className="text-xl text-gray-300">Chọn gói phù hợp với server của bạn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">50K</div>
                <div className="text-gray-400 mb-6">/tháng</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">1GB RAM</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">10GB SSD</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">10 Slots</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">Anti-DDoS</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors">
                  Chọn Gói
                </button>
              </div>
            </div>

            <div className="bg-gray-900 border-2 border-blue-500 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm">Phổ Biến</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Gaming</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">120K</div>
                <div className="text-gray-400 mb-6">/tháng</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">3GB RAM</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">30GB SSD</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">50 Slots</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">Plugin Support</span>
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Chọn Gói
                </button>
              </div>
            </div>

            <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-8 hover:border-purple-500 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">250K</div>
                <div className="text-gray-400 mb-6">/tháng</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">6GB RAM</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">60GB SSD</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">100 Slots</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">Premium Support</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors">
                  Chọn Gói
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Sẵn Sàng Tạo Server Minecraft?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Tham gia cùng hàng nghìn game thủ đã tin tưởng Guinness VNC cho server Minecraft của họ
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Tạo Server Ngay - Miễn Phí 7 Ngày
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/image.png" alt="Guinness VNC" className="h-8 w-auto mr-3" />
                <span className="text-xl font-bold">Guinness VNC</span>
              </div>
              <p className="text-gray-400">
                Hosting Minecraft chuyên nghiệp tại Việt Nam
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Dịch Vụ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Minecraft Hosting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VPS Gaming</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dedicated Server</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Web Hosting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hỗ Trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ticket System</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Knowledge Base</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên Hệ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@guinnessvnc.com</li>
                <li>Discord: GuinnessVNC#1234</li>
                <li>Telegram: @GuinnessVNC</li>
                <li>Hotline: 0123.456.789</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Guinness VNC. All rights reserved. Made with ❤️ in Vietnam</p>
          </div>
        </div>
      </footer>
    </div>
  );
};