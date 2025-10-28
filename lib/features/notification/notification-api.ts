// Notification API types and interfaces matching backend Horizon project

// Notification type enum matching backend NotificationType
export type NotificationType = 'COMMENT' | 'LIKE' | 'FOLLOW' | 'FAVORITE' | 'SYSTEM';

// Notification interface matching backend NotificationVO
export interface Notification {
  /** Notification ID */
  nid: string;

  /** User ID who receives this notification */
  userId: string;

  /** Notification type */
  type: NotificationType;

  /** Notification title */
  title: string;

  /** Notification content */
  content: string;

  /** Whether notification is read */
  isRead: boolean;

  /** Related entity ID (article, comment, etc.) */
  relatedId?: string;

  /** Sender user ID */
  senderId?: string;

  /** Sender username for display */
  senderUsername?: string;

  /** Sender avatar URL */
  senderAvatar?: string;

  /** Creation timestamp */
  createdAt: string;
}

// Notification with additional metadata
export interface NotificationWithMeta extends Notification {
  /** Action URL for navigation */
  actionUrl?: string;

  /** Related entity information */
  relatedEntity?: {
    type: 'article' | 'comment' | 'user';
    id: string;
    title?: string;
    slug?: string;
  };

  /** Whether notification is actionable */
  isActionable?: boolean;

  /** Notification priority */
  priority?: 'low' | 'normal' | 'high';

  /** Notification category */
  category?: 'social' | 'content' | 'system' | 'moderation';
}

// Request/Response types for notification operations
export interface CreateNotificationRequest {
  /** User ID who receives the notification */
  userId: string;

  /** Notification type */
  type: NotificationType;

  /** Notification title */
  title: string;

  /** Notification content */
  content: string;

  /** Related entity ID */
  relatedId?: string;

  /** Sender user ID */
  senderId?: string;

  /** Action URL */
  actionUrl?: string;

  /** Priority */
  priority?: 'low' | 'normal' | 'high';
}

export interface SearchNotificationsRequest {
  /** User ID filter (if not provided, uses current user) */
  userId?: string;

  /** Notification type filter */
  type?: NotificationType;

  /** Read status filter */
  isRead?: boolean;

  /** Category filter */
  category?: 'social' | 'content' | 'system' | 'moderation';

  /** Date range filter */
  dateFrom?: string;
  dateTo?: string;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: 'createdAt' | 'priority';

  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
}

export interface NotificationStats {
  /** Total unread notifications */
  unreadCount: number;

  /** Total notifications */
  totalCount: number;

  /** Notifications by type */
  notificationsByType: Record<NotificationType, number>;

  /** Notifications by category */
  notificationsByCategory: Record<string, number>;

  /** Recent notifications count (last 24 hours) */
  recentCount: number;
}

export interface NotificationSettings {
  /** Email notifications enabled */
  emailEnabled: boolean;

  /** Push notifications enabled */
  pushEnabled: boolean;

  /** Notification preferences by type */
  typePreferences: Record<NotificationType, {
    enabled: boolean;
    email: boolean;
    push: boolean;
  }>;

  /** Quiet hours (do not disturb) */
  quietHours?: {
    enabled: boolean;
    startTime: string; // HH:mm format
    endTime: string;   // HH:mm format
    timezone?: string;
  };

  /** Frequency settings */
  frequency: {
    immediate: NotificationType[];
    hourly: NotificationType[];
    daily: NotificationType[];
    weekly: NotificationType[];
  };
}

// API interface definitions (no implementations)
export interface NotificationAPI {
  // Notification CRUD
  createNotification(notificationData: CreateNotificationRequest): Promise<Notification>;
  getNotificationById(nid: string): Promise<NotificationWithMeta>;
  markAsRead(nid: string): Promise<void>;
  markAsUnread(nid: string): Promise<void>;
  deleteNotification(nid: string): Promise<void>;
  
  // Notification listing and management
  getUserNotifications(params?: SearchNotificationsRequest): Promise<PageResponse<NotificationWithMeta>>;
  getUnreadNotifications(limit?: number): Promise<NotificationWithMeta[]>;
  markAllAsRead(userId?: string): Promise<void>;
  deleteReadNotifications(userId?: string): Promise<void>;
  deleteAllNotifications(userId?: string): Promise<void>;
  
  // Batch operations
  markMultipleAsRead(notificationIds: string[]): Promise<void>;
  markMultipleAsUnread(notificationIds: string[]): Promise<void>;
  deleteMultipleNotifications(notificationIds: string[]): Promise<void>;
  
  // Notification statistics
  getNotificationStats(userId?: string): Promise<NotificationStats>;
  getUnreadCount(userId?: string): Promise<number>;
  
  // Notification settings
  getNotificationSettings(userId: string): Promise<NotificationSettings>;
  updateNotificationSettings(userId: string, settings: Partial<NotificationSettings>): Promise<NotificationSettings>;
  
  // System notifications (admin)
  broadcastSystemNotification(notificationData: Omit<CreateNotificationRequest, 'userId'> & { 
    targetUsers?: string[]; // Specific users, if not provided, broadcast to all
    targetRoles?: string[]; // Target by roles
  }): Promise<void>;
  
  // Notification templates
  getNotificationTemplates(): Promise<Array<{
    type: NotificationType;
    template: string;
    variables: string[];
  }>>;
  
  // Real-time notifications (WebSocket related)
  subscribeToNotifications(userId: string): void; // WebSocket subscription
  unsubscribeFromNotifications(userId: string): void; // WebSocket unsubscription
}

// Reuse PageResponse from user-api
import type { PageResponse } from '../user/user-api';
