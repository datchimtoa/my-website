import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Package, Users, TrendingUp, Search, Globe, Server, Database, Settings, BarChart3, FileText, Shield, Zap, Play, Pause, RotateCcw, Trash2, Edit, Eye, Download, Upload, Activity, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { OrderForm } from './OrderForm';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product_name: string;
  quantity: number;
  price: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
}

interface MinecraftServer {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'starting' | 'stopping';
  players: number;
  maxPlayers: number;
  version: string;
  ram: string;
  cpu: number;
  uptime: string;
  ip: string;
  port: number;
  created_at: string;
}

interface Website {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'maintenance' | 'suspended';
  visitors: string;
  uptime: string;
  ssl: boolean;
  created_at: string;
}

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [servers, setServers] = useState<MinecraftServer[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Load orders
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      // Load servers
      const savedServers = localStorage.getItem('minecraft_servers');
      if (savedServers) {
        setServers(JSON.parse(savedServers));
      } else {
        const sampleServers: MinecraftServer[] = [
          {
            id: '1',
            name: 'Survival Server',
            status: 'online',
            players: 15,
            maxPlayers: 50,
            version: '1.20.4',
            ram: '4GB',
            cpu: 45,
            uptime: '7d 12h',
            ip: 'survival.guinnessvnc.com',
            port: 25565,
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Creative World',
            status: 'offline',
            players: 0,
            maxPlayers: 30,
            version: '1.20.4',
            ram: '2GB',
            cpu: 0,
            uptime: '0h',
            ip: 'creative.guinnessvnc.com',
            port: 25566,
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        setServers(sampleServers);
        localStorage.setItem('minecraft_servers', JSON.stringify(sampleServers));
      }

      // Load websites
      const savedWebsites = localStorage.getItem('websites');
      if (savedWebsites) {
        setWebsites(JSON.parse(savedWebsites));
      } else {
        const sampleWebsites: Website[] = [
          {
            id: '1',
            name: 'Main Website',
            domain: 'guinnessvnc.com',
            status: 'active',
            visitors: '2.4K',
            uptime: '99.9%',
            ssl: true,
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Community Forum',
            domain: 'forum.guinnessvnc.com',
            status: 'active',
            visitors: '1.8K',
            uptime: '100%',
            ssl: true,
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        setWebsites(sampleWebsites);
        localStorage.setItem('websites', JSON.stringify(sampleWebsites));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'starting': return 'bg-yellow-100 text-yellow-800';
      case 'stopping': return 'bg-orange-100 text-orange-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      case 'online': return 'Đang chạy';
      case 'offline': return 'Tắt';
      case 'starting': return 'Đang khởi động';
      case 'stopping': return 'Đang tắt';
      case 'active': return 'Hoạt động';
      case 'maintenance': return 'Bảo trì';
      case 'suspended': return 'Tạm ngưng';
      default: return status;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleServerAction = (serverId: string, action: 'start' | 'stop' | 'restart') => {
    const updatedServers = servers.map(server => {
      if (server.id === serverId) {
        switch (action) {
          case 'start':
            return { ...server, status: 'starting' as const };
          case 'stop':
            return { ...server, status: 'stopping' as const };
          case 'restart':
            return { ...server, status: 'starting' as const };
        }
      }
      return server;
    });
    setServers(updatedServers);
    localStorage.setItem('minecraft_servers', JSON.stringify(updatedServers));

    // Simulate status change after delay
    setTimeout(() => {
      const finalServers = updatedServers.map(server => {
        if (server.id === serverId) {
          switch (action) {
            case 'start':
            case 'restart':
              return { ...server, status: 'online' as const, players: Math.floor(Math.random() * server.maxPlayers) };
            case 'stop':
              return { ...server, status: 'offline' as const, players: 0 };
          }
        }
        return server;
      });
      setServers(finalServers);
      localStorage.setItem('minecraft_servers', JSON.stringify(finalServers));
    }, 3000);
  };

  const stats = [
    {
      title: 'Minecraft Servers',
      value: servers.length.toString(),
      icon: Server,
      color: 'bg-blue-500'
    },
    {
      title: 'Online Players',
      value: servers.reduce((acc, server) => acc + server.players, 0).toString(),
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Websites',
      value: websites.length.toString(),
      icon: Globe,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Orders',
      value: orders.length.toString(),
      icon: Package,
      color: 'bg-orange-500'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Thao tác nhanh</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus className="w-8 h-8 text-blue-500 mb-2" />
                  <span className="text-sm font-medium">Tạo Server</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Globe className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-sm font-medium">Thêm Website</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-8 h-8 text-purple-500 mb-2" />
                  <span className="text-sm font-medium">Backup</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="w-8 h-8 text-gray-500 mb-2" />
                  <span className="text-sm font-medium">Cài đặt</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Hoạt động gần đây</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Server "Survival Server" đã khởi động thành công</span>
                    <span className="text-xs text-gray-400 ml-auto">2 phút trước</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Website guinnessvnc.com đã được cập nhật SSL</span>
                    <span className="text-xs text-gray-400 ml-auto">1 giờ trước</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Backup tự động đã hoàn thành</span>
                    <span className="text-xs text-gray-400 ml-auto">3 giờ trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'servers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Minecraft Servers</h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2 inline" />
                Tạo Server Mới
              </button>
            </div>

            <div className="grid gap-6">
              {servers.map((server) => (
                <div key={server.id} className="bg-white rounded-lg shadow border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Server className="w-8 h-8 text-blue-500 mr-3" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{server.name}</h3>
                          <p className="text-sm text-gray-500">{server.ip}:{server.port}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(server.status)}`}>
                          {getStatusText(server.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{server.players}/{server.maxPlayers}</div>
                        <div className="text-sm text-gray-500">Players</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{server.version}</div>
                        <div className="text-sm text-gray-500">Version</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{server.ram}</div>
                        <div className="text-sm text-gray-500">RAM</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{server.uptime}</div>
                        <div className="text-sm text-gray-500">Uptime</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {server.status === 'offline' ? (
                          <button
                            onClick={() => handleServerAction(server.id, 'start')}
                            className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </button>
                        ) : (
                          <button
                            onClick={() => handleServerAction(server.id, 'stop')}
                            className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            <Pause className="w-4 h-4 mr-1" />
                            Stop
                          </button>
                        )}
                        <button
                          onClick={() => handleServerAction(server.id, 'restart')}
                          className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Restart
                        </button>
                        <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                          <Edit className="w-4 h-4 mr-1" />
                          Console
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'websites':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Quản lý Websites</h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2 inline" />
                Thêm Website
              </button>
            </div>

            <div className="grid gap-6">
              {websites.map((website) => (
                <div key={website.id} className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Globe className="w-8 h-8 text-blue-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{website.name}</h3>
                        <p className="text-sm text-gray-500">{website.domain}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {website.ssl && (
                        <Shield className="w-5 h-5 text-green-500" title="SSL Active" />
                      )}
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(website.status)}`}>
                        {getStatusText(website.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{website.visitors}</div>
                      <div className="text-sm text-gray-500">Visitors Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{website.uptime}</div>
                      <div className="text-sm text-gray-500">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {website.ssl ? 'A+' : 'C'}
                      </div>
                      <div className="text-sm text-gray-500">SSL Grade</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        Xem
                      </button>
                      <button className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                        <Upload className="w-4 h-4 mr-1" />
                        File Manager
                      </button>
                      <button className="flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm đơn hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowOrderForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Tạo đơn hàng mới
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Danh sách đơn hàng</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Khách hàng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày tạo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          Đang tải...
                        </td>
                      </tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          Không có đơn hàng nào
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {order.customer_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.customer_email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.product_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(order.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.created_at)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tính năng đang phát triển</h2>
            <p className="text-gray-600">Tính năng này sẽ sớm được cập nhật!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/image.png" alt="Guinness VNC" className="h-8 w-auto mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Guinness VNC Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Xin chào, {user?.email}</span>
              <button
                onClick={signOut}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Tổng quan
              </button>
              
              <button
                onClick={() => setActiveTab('servers')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'servers'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Server className="w-5 h-5 mr-3" />
                Minecraft Servers
              </button>
              
              <button
                onClick={() => setActiveTab('websites')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'websites'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Globe className="w-5 h-5 mr-3" />
                Websites
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'orders'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                Đơn hàng
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'analytics'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                Thống kê
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'security'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-5 h-5 mr-3" />
                Bảo mật
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === 'settings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Cài đặt
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          onClose={() => setShowOrderForm(false)}
          onSubmit={(newOrder) => {
            const orderWithId = { ...newOrder, id: Date.now().toString(), created_at: new Date().toISOString() };
            const updatedOrders = [...orders, orderWithId];
            setOrders(updatedOrders);
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            setShowOrderForm(false);
          }}
        />
      )}
    </div>
  );
};