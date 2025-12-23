'use client'

import { collection, doc, limit, onSnapshot, orderBy, query, Timestamp, updateDoc } from 'firebase/firestore';
import {
  AlertTriangle,
  Calendar,
  CalendarDays,
  CheckCircle,
  Clock,
  Download,
  Edit2,
  FileText,
  Filter,
  IndianRupee,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCcw,
  Save,
  Search,
  SortAsc,
  SortDesc,
  TrendingUp,
  Users,
  X,
  XCircle
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import AdminNavigation from '@/components/AdminNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/config/firebase.config';
import { CONFIG } from '@/utils/config';
import IntegrationService from '@/utils/integrationService';

interface BookingData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentDate: Date;
  appointmentTime: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'paid';
  paymentId: string;
  location?: string;
  projectType?: string;
  description?: string;
  communicationStatus: {
    email: boolean;
    whatsapp: boolean;
    calendar: boolean;
  };
  createdAt: Date;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [serviceHealth, setServiceHealth] = useState({
    payment: false,
    email: false,
    whatsapp: false,
    overall: false
  });
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [editedStatus, setEditedStatus] = useState<string>('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const integrationService = IntegrationService.getInstance();

  useEffect(() => {
    console.log('📊 Setting up real-time Firestore listener for orders...');

    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        orderBy('createdAt', 'desc'),
        limit(100)
      );

      const unsubscribe = onSnapshot(
        ordersQuery,
        (snapshot) => {
          console.log(`📦 Received ${snapshot.docs.length} orders from Firestore`);

          const ordersData: BookingData[] = snapshot.docs.map(doc => {
            const data = doc.data();

            let appointmentDate = new Date();
            if (data.appointmentDate) {
              if (data.appointmentDate instanceof Timestamp) {
                appointmentDate = data.appointmentDate.toDate();
              } else if (typeof data.appointmentDate === 'string') {
                appointmentDate = new Date(data.appointmentDate);
              }
            }

            let createdAt = new Date();
            if (data.createdAt) {
              if (data.createdAt instanceof Timestamp) {
                createdAt = data.createdAt.toDate();
              } else if (typeof data.createdAt === 'string') {
                createdAt = new Date(data.createdAt);
              }
            }

            let status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'paid' = 'pending';
            if (data.status) {
              const firestoreStatus = data.status.toLowerCase();
              if (firestoreStatus === 'paid' || firestoreStatus === 'success') {
                status = 'paid';
              } else if (firestoreStatus === 'confirmed') {
                status = 'confirmed';
              } else if (firestoreStatus === 'completed') {
                status = 'completed';
              } else if (firestoreStatus === 'cancelled' || firestoreStatus === 'failed') {
                status = 'cancelled';
              }
            }

            return {
              id: doc.id,
              customerName: data.customerName || 'Unknown',
              customerEmail: data.customerEmail || '',
              customerPhone: data.customerPhone || '',
              appointmentDate,
              appointmentTime: data.appointmentTime || '',
              amount: data.amount || 0,
              status,
              paymentId: data.paymentId || '',
              location: data.location,
              projectType: data.projectType,
              description: data.description,
              communicationStatus: data.communicationStatus || {
                email: false,
                whatsapp: false,
                calendar: false
              },
              createdAt
            };
          });

          setBookings(ordersData);
          setIsLoading(false);
          setLastUpdated(new Date());
        },
        (error) => {
          console.error('❌ Firestore listener error:', error);
          setError('Failed to load bookings');
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('❌ Error setting up listener:', err);
      setError('Error connecting to database');
      setIsLoading(false);
    }
  }, []);

  const getStatusColor = (status: BookingData['status']) => {
    switch (status) {
      case 'paid':
        return { bg: '#E8F5E9', color: '#2E7D32', border: '#4CAF50' };
      case 'confirmed':
        return { bg: '#E3F2FD', color: '#1565C0', border: '#2196F3' };
      case 'completed':
        return { bg: '#F3E5F5', color: '#6A1B9A', border: '#9C27B0' };
      case 'cancelled':
        return { bg: '#FFEBEE', color: '#C62828', border: '#F44336' };
      case 'pending':
      default:
        return { bg: '#FFF3E0', color: '#E65100', border: '#FF9800' };
    }
  };

  const filteredAndSortedBookings = useMemo(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(
        b =>
          b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.customerPhone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    let sorted = [...filtered];
    sorted.sort((a, b) => {
      let aVal: any = '';
      let bVal: any = '';

      if (sortBy === 'date') {
        aVal = a.createdAt;
        bVal = b.createdAt;
      } else if (sortBy === 'amount') {
        aVal = a.amount;
        bVal = b.amount;
      } else if (sortBy === 'name') {
        aVal = a.customerName;
        bVal = b.customerName;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [bookings, searchTerm, statusFilter, sortBy, sortOrder]);

  const updateBookingStatus = async (newStatus: string) => {
    if (!selectedBooking) return;

    setIsUpdatingStatus(true);
    try {
      const bookingRef = doc(db, 'orders', selectedBooking.id);
      await updateDoc(bookingRef, { status: newStatus });
      setEditedStatus('');
      setIsEditingStatus(false);
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (err) {
      setError('Failed to refresh');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <AdminNavigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>
                📊 Admin Dashboard
              </h1>
              <p style={{ color: '#666' }}>
                Manage all bookings and consultations
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              style={{
                backgroundColor: '#FB921D',
                color: 'white',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#E67E0F';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#FB921D';
              }}
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Bookings', value: bookings.length, icon: Users },
              { label: 'Paid Orders', value: bookings.filter(b => b.status === 'paid').length, icon: IndianRupee },
              { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: Clock },
              { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: CheckCircle }
            ].map((stat, idx) => (
              <Card key={idx} style={{ borderColor: '#FFD0A0', border: '1px solid' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ color: '#666' }} className="text-sm">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold" style={{ color: '#FB921D' }}>
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className="h-8 w-8" style={{ color: '#FB921D', opacity: 0.5 }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters & Search */}
          <Card style={{ borderColor: '#FFD0A0', border: '1px solid' }}>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderColor: '#FFD0A0' }}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger style={{ borderColor: '#FFD0A0' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
                  <SelectTrigger style={{ borderColor: '#FFD0A0' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="amount">Sort by Amount</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  style={{ borderColor: '#FFD0A0', color: '#FB921D' }}
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card style={{ borderColor: '#FFD0A0', border: '1px solid' }}>
            <CardHeader>
              <CardTitle>
                Recent Bookings ({filteredAndSortedBookings.length})
              </CardTitle>
              <CardDescription>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#FB921D' }} />
                </div>
              ) : filteredAndSortedBookings.length === 0 ? (
                <div className="text-center py-12">
                  <p style={{ color: '#666' }}>No bookings found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderColor: '#FFD0A0' }}>
                        <TableHead>Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedBookings.map((booking) => {
                        const statusColor = getStatusColor(booking.status);
                        return (
                          <TableRow key={booking.id} style={{ borderColor: '#FFD0A0' }}>
                            <TableCell className="font-medium" style={{ color: '#1a1a1a' }}>
                              {booking.customerName}
                            </TableCell>
                            <TableCell style={{ color: '#666' }}>
                              <div className="text-sm">{booking.customerEmail}</div>
                              <div className="text-xs" style={{ color: '#999' }}>
                                {booking.customerPhone}
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold" style={{ color: '#FB921D' }}>
                              ₹{booking.amount.toLocaleString()}
                            </TableCell>
                            <TableCell style={{ color: '#666' }}>
                              {booking.createdAt.toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                style={{
                                  backgroundColor: statusColor.bg,
                                  color: statusColor.color,
                                  border: `1px solid ${statusColor.border}`
                                }}
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setEditedStatus(booking.status);
                                }}
                                style={{ borderColor: '#FFD0A0', color: '#FB921D' }}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Details Modal */}
          {selectedBooking && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ borderColor: '#FFD0A0', border: '2px solid' }}>
                <CardHeader style={{ backgroundColor: '#FFF5E6', borderBottom: '2px solid #FFD0A0' }}>
                  <CardTitle style={{ color: '#1a1a1a' }}>
                    Booking Details - {selectedBooking.customerName}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                  {/* Customer Info */}
                  <div className="p-3 rounded-lg border-2" style={{ borderColor: '#FFD0A0', backgroundColor: '#FFF5E6' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" style={{ color: '#FB921D' }} />
                      <h3 className="font-bold text-sm" style={{ color: '#1a1a1a' }}>
                        Customer Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p style={{ color: '#666', fontSize: '12px' }}>Name</p>
                        <p style={{ color: '#1a1a1a', fontWeight: 'bold' }}>
                          {selectedBooking.customerName}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: '#666', fontSize: '12px' }}>Phone</p>
                        <p style={{ color: '#1a1a1a', fontWeight: 'bold' }}>
                          {selectedBooking.customerPhone}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p style={{ color: '#666', fontSize: '12px' }}>Email</p>
                        <p style={{ color: '#1a1a1a', fontWeight: 'bold' }}>
                          {selectedBooking.customerEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Card */}
                  <div className="p-3 rounded-lg border-2" style={{ borderColor: '#FFD0A0', backgroundColor: '#FFF5E6' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarDays className="h-4 w-4" style={{ color: '#FB921D' }} />
                      <h3 className="font-bold text-sm" style={{ color: '#1a1a1a' }}>
                        Appointment
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: '#C55A00' }}>
                          Date
                        </p>
                        <p className="text-sm font-bold" style={{ color: '#1a1a1a' }}>
                          {selectedBooking.appointmentDate.toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: '#C55A00' }}>
                          Time
                        </p>
                        <p className="text-sm font-bold" style={{ color: '#1a1a1a' }}>
                          {selectedBooking.appointmentTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="p-3 rounded-lg border-2" style={{ borderColor: '#FFD0A0', backgroundColor: '#FFF5E6' }}>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: '#C55A00' }}>
                      Project Type
                    </p>
                    <p className="text-sm font-bold" style={{ color: '#1a1a1a' }}>
                      {selectedBooking.projectType}
                    </p>
                  </div>

                  {/* Amount Paid */}
                  <div className="p-3 rounded-lg border-2" style={{ borderColor: '#FFD0A0', backgroundColor: '#FFF5E6' }}>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: '#C55A00' }}>
                      Amount Paid
                    </p>
                    <p className="text-xl font-bold" style={{ color: '#FB921D' }}>
                      ₹{selectedBooking.amount.toLocaleString()}
                    </p>
                  </div>

                  {/* Description */}
                  {selectedBooking.description && (
                    <div className="p-3 rounded-lg border-2" style={{ borderColor: '#FFD0A0', backgroundColor: '#FFF5E6' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4" style={{ color: '#FB921D' }} />
                        <p className="text-xs font-semibold" style={{ color: '#C55A00' }}>
                          Description
                        </p>
                      </div>
                      <p className="text-sm whitespace-pre-wrap" style={{ color: '#1a1a1a' }}>
                        {selectedBooking.description}
                      </p>
                    </div>
                  )}

                  {/* Status Update */}
                  <div className="p-3 rounded-lg border-2" style={{ borderColor: '#FFD0A0', backgroundColor: '#FFF5E6' }}>
                    <p className="text-xs font-semibold mb-2" style={{ color: '#C55A00' }}>
                      Order Status
                    </p>
                    {isEditingStatus ? (
                      <div className="flex gap-2">
                        <Select value={editedStatus} onValueChange={setEditedStatus}>
                          <SelectTrigger style={{ borderColor: '#FFD0A0' }}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          onClick={() => updateBookingStatus(editedStatus)}
                          disabled={isUpdatingStatus}
                          style={{ backgroundColor: '#FB921D', color: 'white', border: 'none' }}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <Badge
                          style={{
                            backgroundColor: getStatusColor(selectedBooking.status).bg,
                            color: getStatusColor(selectedBooking.status).color,
                            border: `1px solid ${getStatusColor(selectedBooking.status).border}`
                          }}
                        >
                          {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditingStatus(true)}
                          style={{ borderColor: '#FFD0A0', color: '#FB921D' }}
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Footer Info */}
                  <div className="pt-2 space-y-1.5 text-xs" style={{ color: '#C55A00' }}>
                    <div className="flex justify-between">
                      <span>Payment ID</span>
                      <span className="font-mono text-xs" style={{ color: '#1a1a1a' }}>
                        {selectedBooking.paymentId.length > 15
                          ? `${selectedBooking.paymentId.slice(0, 15)}...`
                          : selectedBooking.paymentId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order Date</span>
                      <span style={{ color: '#1a1a1a' }}>
                        {selectedBooking.createdAt.toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short'
                        })} -  {selectedBooking.createdAt.toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* Footer Button */}
                <div className="p-3 border-t-2" style={{ borderColor: '#FFD0A0', backgroundColor: 'white' }}>
                  <Button
                    onClick={() => {
                      setSelectedBooking(null);
                      setIsEditingStatus(false);
                    }}
                    className="w-full font-semibold text-sm text-white transition-all duration-300"
                    style={{ backgroundColor: '#FB921D' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#E67E0F';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#FB921D';
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
