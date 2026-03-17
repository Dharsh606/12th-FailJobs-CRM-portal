# 12th FailJobs CRM Portal

A modern, comprehensive CRM system for managing blue-collar workers including carpenters, masons, painters, electricians, plumbers, drivers, and more.

## 🚀 Features

### Core CRM Functionality
- **Worker Management**: Add, edit, delete, and manage worker profiles
- **Job Management**: Create, assign, and track jobs
- **Request System**: Handle worker job requests with approval workflow
- **Analytics Dashboard**: Comprehensive analytics and reporting
- **Search & Filters**: Advanced filtering by category, location, availability
- **Real-time Notifications**: Stay updated with system alerts

### Modern UI/UX
- **Glassmorphism Design**: Modern, beautiful interface with glass effects
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Professional transitions and hover effects
- **Dark Theme**: Easy on the eyes with gradient backgrounds

### Technical Features
- **REST API**: Full RESTful API architecture
- **JWT Authentication**: Secure login system
- **JSON Storage**: Local data storage (ready for Supabase integration)
- **Export Functionality**: Export data to JSON format
- **Real-time Updates**: Dynamic content updates

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with glassmorphism
- **JavaScript ES6+**: Modern JavaScript features
- **Chart.js**: Interactive charts and analytics
- **Font Awesome**: Professional icons

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Design System
- **Primary Color**: #004e92 (Blue)
- **Accent Color**: #ff8c00 (Orange)
- **Glassmorphism**: Modern glass effects
- **Responsive Grid**: Flexible layout system

## 📋 Pages & Features

### 1. Login Page (`login.html`)
- Secure admin/staff authentication
- Glassmorphism login card
- Animated background
- Remember me functionality

### 2. Dashboard (`dashboard.html`)
- Statistics cards with real-time data
- Interactive charts (worker registrations, job completion)
- Recent activity feed
- Quick navigation

### 3. Workers Management (`workers.html`)
- Worker cards with detailed information
- Add/Edit/Delete workers
- Filter by category, location, availability
- Search functionality
- Export workers data

### 4. Jobs Management (`jobs.html`)
- Job creation and assignment
- Status tracking (pending, assigned, in-progress, completed)
- Worker assignment
- Payment tracking
- Client information

### 5. Worker Requests (`requests.html`)
- Request approval workflow
- Status management (pending, approved, rejected)
- Detailed request information
- Bulk actions

### 6. Analytics (`analytics.html`)
- Revenue trends
- Performance metrics
- Category distribution
- Location analysis
- Export reports

### 7. Settings (`settings.html`)
- General settings
- Profile management
- Notification preferences
- Security settings
- API configuration

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd 12th-FailJobs-CRM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # For development
   npm run dev
   
   # For production
   npm start
   ```

4. **Access the CRM**
   - Open your browser
   - Navigate to `http://localhost:3000`
   - Login with:
     - Email: `admin@12thfailjobs.com`
     - Password: `admin123`

### Development Mode
For development with auto-restart:
```bash
npm run dev
```

## 📁 Project Structure

```
crm/
├── index.html              # Main entry point (redirects to login)
├── login.html              # Login page
├── dashboard.html          # Dashboard with analytics
├── workers.html            # Worker management
├── jobs.html               # Job management
├── requests.html           # Worker requests
├── analytics.html          # Analytics and reports
├── settings.html           # System settings
├── styles.css              # Complete CSS with glassmorphism
├── script.js               # Frontend JavaScript
├── server.js               # Node.js backend server
├── package.json            # Node.js dependencies
├── README.md               # This file
└── data/                   # JSON data storage (auto-created)
    ├── workers.json
    ├── jobs.json
    ├── requests.json
    └── users.json
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

### Database Configuration
Currently using JSON file storage. To connect to Supabase:

1. Update the `server.js` file
2. Install Supabase client: `npm install @supabase/supabase-js`
3. Configure connection in settings page

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Workers
- `GET /api/workers` - Get all workers
- `POST /api/workers` - Create new worker
- `PUT /api/workers/:id` - Update worker
- `DELETE /api/workers/:id` - Delete worker

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Requests
- `GET /api/requests` - Get all requests
- `POST /api/requests` - Create new request
- `PUT /api/requests/:id` - Update request
- `DELETE /api/requests/:id` - Delete request

### Analytics
- `GET /api/analytics/dashboard` - Dashboard analytics
- `GET /api/analytics/charts` - Charts data

### Export
- `GET /api/export/workers` - Export workers data
- `GET /api/export/jobs` - Export jobs data
- `GET /api/export/requests` - Export requests data

## 🎨 Customization

### Brand Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-color: #004e92;    /* Your brand blue */
    --accent-color: #ff8c00;      /* Your brand orange */
    /* ... other colors */
}
```

### Logo and Branding
Replace the logo and company name in:
- HTML files (logo sections)
- CSS variables
- Server configuration

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Secure API endpoints

## 📱 Responsive Design

The CRM is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen sizes

## 🚀 Future Enhancements

### Planned Features
- [ ] Supabase database integration
- [ ] Real-time notifications with WebSocket
- [ ] File upload for worker documents
- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Advanced reporting with PDF export
- [ ] Multi-language support
- [ ] Role-based permissions

### Integration Roadmap
1. **Phase 1**: Supabase database integration
2. **Phase 2**: Main website API connection
3. **Phase 3**: Admin portal integration
4. **Phase 4**: Mobile app development

## 🐛 Troubleshooting

### Common Issues

1. **Server won't start**
   - Check if port 3000 is available
   - Install dependencies: `npm install`

2. **Login not working**
   - Verify email and password
   - Check browser console for errors

3. **Data not saving**
   - Check file permissions
   - Verify data directory exists

4. **Charts not displaying**
   - Check Chart.js library loading
   - Verify data format

### Getting Help
- Check the browser console for JavaScript errors
- Verify server logs for backend issues
- Ensure all dependencies are installed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **12th FailJobs Team** - Development and maintenance

## 📞 Support

For support and questions:
- Email: info@12thfailjobs.com
- Website: https://12thfailjobs.com

---

**Built with ❤️ for the blue-collar workforce**
