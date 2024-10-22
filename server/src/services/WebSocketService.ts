import { Server as SocketServer } from 'socket.io';
import { Server } from 'http';
import JWT from 'jsonwebtoken';

interface SocketUser {
  userId: string;
  socketId: string;
}

class WebSocketService {
  private io: SocketServer;
  private connectedUsers: SocketUser[] = [];

  constructor(server: Server) {
    this.io = new SocketServer(server, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    });

    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          throw new Error('Authentication error');
        }
        
        const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        socket.data.userId = decoded.userId;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.setupConnectionHandlers();
  }

  private setupConnectionHandlers(): void {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.data.userId}`);
      
      // Add user to connected users list
      this.connectedUsers.push({
        userId: socket.data.userId,
        socketId: socket.id
      });

      // Handle ride updates
      socket.on('joinRideRoom', (rideId: string) => {
        socket.join(`ride:${rideId}`);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        this.connectedUsers = this.connectedUsers.filter(
          user => user.socketId !== socket.id
        );
        console.log(`User disconnected: ${socket.data.userId}`);
      });
    });
  }

  // Real-time notification methods
  public async notifyRideUpdate(rideId: string, updateType: string, data: any): Promise<void> {
    this.io.to(`ride:${rideId}`).emit('rideUpdate', {
      type: updateType,
      data
    });
  }

  public async notifyUser(userId: string, notificationType: string, data: any): Promise<void> {
    const userSocket = this.connectedUsers.find(user => user.userId === userId);
    if (userSocket) {
      this.io.to(userSocket.socketId).emit('notification', {
        type: notificationType,
        data
      });
    }
  }

  public async notifyRideRequest(rideId: string, requestData: any): Promise<void> {
    this.io.to(`ride:${rideId}`).emit('rideRequest', requestData);
  }

  public async notifyLocationUpdate(rideId: string, location: any): Promise<void> {
    this.io.to(`ride:${rideId}`).emit('locationUpdate', location);
  }
}

export default WebSocketService;