// 12th FailJobs CRM - Backend Server
// Node.js Express REST API

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Data Storage (JSON files for now, will be replaced with Supabase)
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Data files
const WORKERS_FILE = path.join(DATA_DIR, 'workers.json');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');
const REQUESTS_FILE = path.join(DATA_DIR, 'requests.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const RECRUITERS_FILE = path.join(DATA_DIR, 'recruiters.json');

// Initialize data files if they don't exist
function initializeDataFiles() {
    const files = [
        { file: WORKERS_FILE, defaultData: [] },
        { file: JOBS_FILE, defaultData: [] },
        { file: REQUESTS_FILE, defaultData: [] },
        { file: USERS_FILE, defaultData: [{ id: 1, email: 'admin@12thfailjobs.com', password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', name: 'Admin User', role: 'admin' }, { id: 2, email: 'recruiter@12thfailjobs.com', password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', name: 'John Recruiter', role: 'recruiter' }] },
        { file: RECRUITERS_FILE, defaultData: [] }
    ];

    files.forEach(({ file, defaultData }) => {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, JSON.stringify(defaultData, null, 2));
        }
    });
}

// Helper functions
function readDataFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return [];
    }
}

function writeDataFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        return false;
    }
}

function generateId() {
    return Date.now().toString();
}

// Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// Initialize data files
initializeDataFiles();

// Routes

// Authentication Routes
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const users = readDataFile(USERS_FILE);
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name, role = 'staff' } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        const users = readDataFile(USERS_FILE);
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: generateId(),
            email,
            password: hashedPassword,
            name,
            role,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeDataFile(USERS_FILE, users);

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Worker Management Routes
app.get('/api/workers', authenticateToken, (req, res) => {
    try {
        const workers = readDataFile(WORKERS_FILE);
        
        // Apply filters if provided
        const { category, location, availability, search } = req.query;
        let filteredWorkers = workers;

        if (category) {
            filteredWorkers = filteredWorkers.filter(w => w.category === category);
        }

        if (location) {
            filteredWorkers = filteredWorkers.filter(w => w.location === location);
        }

        if (availability) {
            filteredWorkers = filteredWorkers.filter(w => w.availability === availability);
        }

        if (search) {
            const searchTerm = search.toLowerCase();
            filteredWorkers = filteredWorkers.filter(w => 
                w.name.toLowerCase().includes(searchTerm) ||
                w.phone.includes(search) ||
                w.category.toLowerCase().includes(searchTerm)
            );
        }

        res.json({
            message: 'Workers retrieved successfully',
            data: filteredWorkers,
            total: filteredWorkers.length
        });
    } catch (error) {
        console.error('Get workers error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/workers', authenticateToken, (req, res) => {
    try {
        const {
            name,
            phone,
            category,
            location,
            experience,
            availability = 'available',
            rating = 5,
            email
        } = req.body;

        if (!name || !phone || !category || !location || !experience) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const workers = readDataFile(WORKERS_FILE);
        
        // Check if worker with same phone already exists
        const existingWorker = workers.find(w => w.phone === phone);
        if (existingWorker) {
            return res.status(409).json({ error: 'Worker with this phone number already exists' });
        }

        const newWorker = {
            id: generateId(),
            name,
            phone,
            category,
            location,
            experience,
            availability,
            rating,
            email,
            registeredDate: new Date().toISOString()
        };

        workers.push(newWorker);
        writeDataFile(WORKERS_FILE, workers);

        res.status(201).json({
            message: 'Worker created successfully',
            data: newWorker
        });
    } catch (error) {
        console.error('Create worker error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/workers/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const workers = readDataFile(WORKERS_FILE);
        const workerIndex = workers.findIndex(w => w.id === id);

        if (workerIndex === -1) {
            return res.status(404).json({ error: 'Worker not found' });
        }

        // Update worker data
        workers[workerIndex] = { ...workers[workerIndex], ...updateData };
        writeDataFile(WORKERS_FILE, workers);

        res.json({
            message: 'Worker updated successfully',
            data: workers[workerIndex]
        });
    } catch (error) {
        console.error('Update worker error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/workers/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;

        const workers = readDataFile(WORKERS_FILE);
        const workerIndex = workers.findIndex(w => w.id === id);

        if (workerIndex === -1) {
            return res.status(404).json({ error: 'Worker not found' });
        }

        const deletedWorker = workers.splice(workerIndex, 1)[0];
        writeDataFile(WORKERS_FILE, workers);

        res.json({
            message: 'Worker deleted successfully',
            data: deletedWorker
        });
    } catch (error) {
        console.error('Delete worker error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Job Management Routes
app.get('/api/jobs', authenticateToken, (req, res) => {
    try {
        const jobs = readDataFile(JOBS_FILE);
        
        // Apply filters if provided
        const { status, type, location, search } = req.query;
        let filteredJobs = jobs;

        if (status) {
            filteredJobs = filteredJobs.filter(j => j.status === status);
        }

        if (type) {
            filteredJobs = filteredJobs.filter(j => j.type === type);
        }

        if (location) {
            filteredJobs = filteredJobs.filter(j => j.location === location);
        }

        if (search) {
            const searchTerm = search.toLowerCase();
            filteredJobs = filteredJobs.filter(j => 
                j.title.toLowerCase().includes(searchTerm) ||
                j.type.toLowerCase().includes(searchTerm) ||
                j.location.toLowerCase().includes(searchTerm)
            );
        }

        res.json({
            message: 'Jobs retrieved successfully',
            data: filteredJobs,
            total: filteredJobs.length
        });
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/jobs', authenticateToken, (req, res) => {
    try {
        const {
            title,
            type,
            location,
            workerId,
            status = 'pending',
            payment,
            description,
            clientInfo
        } = req.body;

        if (!title || !type || !location || !payment) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const jobs = readDataFile(JOBS_FILE);

        const newJob = {
            id: generateId(),
            title,
            type,
            location,
            workerId,
            status,
            payment,
            description,
            clientInfo,
            createdDate: new Date().toISOString()
        };

        jobs.push(newJob);
        writeDataFile(JOBS_FILE, jobs);

        res.status(201).json({
            message: 'Job created successfully',
            data: newJob
        });
    } catch (error) {
        console.error('Create job error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/jobs/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const jobs = readDataFile(JOBS_FILE);
        const jobIndex = jobs.findIndex(j => j.id === id);

        if (jobIndex === -1) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Update job data
        jobs[jobIndex] = { ...jobs[jobIndex], ...updateData };
        writeDataFile(JOBS_FILE, jobs);

        res.json({
            message: 'Job updated successfully',
            data: jobs[jobIndex]
        });
    } catch (error) {
        console.error('Update job error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/jobs/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;

        const jobs = readDataFile(JOBS_FILE);
        const jobIndex = jobs.findIndex(j => j.id === id);

        if (jobIndex === -1) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const deletedJob = jobs.splice(jobIndex, 1)[0];
        writeDataFile(JOBS_FILE, jobs);

        res.json({
            message: 'Job deleted successfully',
            data: deletedJob
        });
    } catch (error) {
        console.error('Delete job error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Request Management Routes
app.get('/api/requests', authenticateToken, (req, res) => {
    try {
        const requests = readDataFile(REQUESTS_FILE);
        
        // Apply filters if provided
        const { status, search } = req.query;
        let filteredRequests = requests;

        if (status) {
            filteredRequests = filteredRequests.filter(r => r.status === status);
        }

        if (search) {
            const searchTerm = search.toLowerCase();
            filteredRequests = filteredRequests.filter(r => 
                r.title.toLowerCase().includes(searchTerm) ||
                r.workerName.toLowerCase().includes(searchTerm) ||
                r.category.toLowerCase().includes(searchTerm)
            );
        }

        res.json({
            message: 'Requests retrieved successfully',
            data: filteredRequests,
            total: filteredRequests.length
        });
    } catch (error) {
        console.error('Get requests error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/requests', authenticateToken, (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location,
            budget,
            timeline,
            workerName,
            workerPhone,
            experience
        } = req.body;

        if (!title || !category || !location || !budget || !workerName || !workerPhone) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const requests = readDataFile(REQUESTS_FILE);

        const newRequest = {
            id: generateId(),
            title,
            description,
            category,
            location,
            budget,
            timeline,
            workerName,
            workerPhone,
            experience,
            status: 'pending',
            createdDate: new Date().toISOString()
        };

        requests.push(newRequest);
        writeDataFile(REQUESTS_FILE, requests);

        res.status(201).json({
            message: 'Request created successfully',
            data: newRequest
        });
    } catch (error) {
        console.error('Create request error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/requests/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const requests = readDataFile(REQUESTS_FILE);
        const requestIndex = requests.findIndex(r => r.id === id);

        if (requestIndex === -1) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Update request data
        requests[requestIndex] = { ...requests[requestIndex], ...updateData };
        writeDataFile(REQUESTS_FILE, requests);

        res.json({
            message: 'Request updated successfully',
            data: requests[requestIndex]
        });
    } catch (error) {
        console.error('Update request error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/requests/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;

        const requests = readDataFile(REQUESTS_FILE);
        const requestIndex = requests.findIndex(r => r.id === id);

        if (requestIndex === -1) {
            return res.status(404).json({ error: 'Request not found' });
        }

        const deletedRequest = requests.splice(requestIndex, 1)[0];
        writeDataFile(REQUESTS_FILE, requests);

        res.json({
            message: 'Request deleted successfully',
            data: deletedRequest
        });
    } catch (error) {
        console.error('Delete request error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Analytics Routes
app.get('/api/analytics/dashboard', authenticateToken, (req, res) => {
    try {
        const workers = readDataFile(WORKERS_FILE);
        const jobs = readDataFile(JOBS_FILE);
        const requests = readDataFile(REQUESTS_FILE);

        const analytics = {
            totalWorkers: workers.length,
            activeWorkers: workers.filter(w => w.availability === 'available').length,
            totalJobs: jobs.length,
            completedJobs: jobs.filter(j => j.status === 'completed').length,
            totalRequests: requests.length,
            pendingRequests: requests.filter(r => r.status === 'pending').length,
            approvedRequests: requests.filter(r => r.status === 'approved').length,
            rejectedRequests: requests.filter(r => r.status === 'rejected').length,
            totalRevenue: jobs
                .filter(j => j.status === 'completed')
                .reduce((sum, job) => sum + parseFloat(job.payment || 0), 0),
            averageJobValue: jobs.length > 0 
                ? jobs.reduce((sum, job) => sum + parseFloat(job.payment || 0), 0) / jobs.length 
                : 0
        };

        res.json({
            message: 'Analytics data retrieved successfully',
            data: analytics
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/analytics/charts', authenticateToken, (req, res) => {
    try {
        const workers = readDataFile(WORKERS_FILE);
        const jobs = readDataFile(JOBS_FILE);
        const requests = readDataFile(REQUESTS_FILE);

        // Worker registrations by category
        const workersByCategory = {};
        workers.forEach(worker => {
            workersByCategory[worker.category] = (workersByCategory[worker.category] || 0) + 1;
        });

        // Jobs by status
        const jobsByStatus = {};
        jobs.forEach(job => {
            jobsByStatus[job.status] = (jobsByStatus[job.status] || 0) + 1;
        });

        // Requests by status
        const requestsByStatus = {};
        requests.forEach(request => {
            requestsByStatus[request.status] = (requestsByStatus[request.status] || 0) + 1;
        });

        // Workers by location
        const workersByLocation = {};
        workers.forEach(worker => {
            workersByLocation[worker.location] = (workersByLocation[worker.location] || 0) + 1;
        });

        const chartsData = {
            workersByCategory,
            jobsByStatus,
            requestsByStatus,
            workersByLocation
        };

        res.json({
            message: 'Charts data retrieved successfully',
            data: chartsData
        });
    } catch (error) {
        console.error('Get charts data error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Recruiter Management Routes
app.get('/api/recruiters', authenticateToken, (req, res) => {
    try {
        // Only admin can access all recruiters
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin role required.' });
        }

        const recruiters = readDataFile(RECRUITERS_FILE);
        
        // Apply filters if provided
        const { status, location, search } = req.query;
        let filteredRecruiters = recruiters;

        if (status) {
            filteredRecruiters = filteredRecruiters.filter(r => r.status === status);
        }

        if (location) {
            filteredRecruiters = filteredRecruiters.filter(r => r.location === location);
        }

        if (search) {
            const searchTerm = search.toLowerCase();
            filteredRecruiters = filteredRecruiters.filter(r => 
                r.name.toLowerCase().includes(searchTerm) ||
                r.company.toLowerCase().includes(searchTerm) ||
                r.phone.includes(search) ||
                r.email.toLowerCase().includes(searchTerm)
            );
        }

        res.json({
            message: 'Recruiters retrieved successfully',
            data: filteredRecruiters,
            total: filteredRecruiters.length
        });
    } catch (error) {
        console.error('Get recruiters error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/recruiters', authenticateToken, (req, res) => {
    try {
        // Only admin can create recruiters
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin role required.' });
        }

        const {
            name,
            company,
            phone,
            email,
            location,
            status = 'active',
            address,
            notes
        } = req.body;

        if (!name || !company || !phone || !email || !location) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const recruiters = readDataFile(RECRUITERS_FILE);
        
        // Check if recruiter with same email already exists
        const existingRecruiter = recruiters.find(r => r.email === email);
        if (existingRecruiter) {
            return res.status(409).json({ error: 'Recruiter with this email already exists' });
        }

        const newRecruiter = {
            id: generateId(),
            name,
            company,
            phone,
            email,
            location,
            status,
            address,
            notes,
            activeJobs: 0,
            joinedDate: new Date().toISOString()
        };

        recruiters.push(newRecruiter);
        writeDataFile(RECRUITERS_FILE, recruiters);

        res.status(201).json({
            message: 'Recruiter created successfully',
            data: newRecruiter
        });
    } catch (error) {
        console.error('Create recruiter error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/recruiters/:id', authenticateToken, (req, res) => {
    try {
        // Only admin can update recruiters
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin role required.' });
        }

        const { id } = req.params;
        const updateData = req.body;

        const recruiters = readDataFile(RECRUITERS_FILE);
        const recruiterIndex = recruiters.findIndex(r => r.id === id);

        if (recruiterIndex === -1) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        // Update recruiter data
        recruiters[recruiterIndex] = { ...recruiters[recruiterIndex], ...updateData };
        writeDataFile(RECRUITERS_FILE, recruiters);

        res.json({
            message: 'Recruiter updated successfully',
            data: recruiters[recruiterIndex]
        });
    } catch (error) {
        console.error('Update recruiter error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/recruiters/:id', authenticateToken, (req, res) => {
    try {
        // Only admin can delete recruiters
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin role required.' });
        }

        const { id } = req.params;

        const recruiters = readDataFile(RECRUITERS_FILE);
        const recruiterIndex = recruiters.findIndex(r => r.id === id);

        if (recruiterIndex === -1) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        const deletedRecruiter = recruiters.splice(recruiterIndex, 1)[0];
        writeDataFile(RECRUITERS_FILE, recruiters);

        res.json({
            message: 'Recruiter deleted successfully',
            data: deletedRecruiter
        });
    } catch (error) {
        console.error('Delete recruiter error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Recruiter Dashboard Routes (for logged-in recruiter)
app.get('/api/recruiter/dashboard', authenticateToken, (req, res) => {
    try {
        // Only recruiter can access their dashboard
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ error: 'Access denied. Recruiter role required.' });
        }

        const jobs = readDataFile(JOBS_FILE);
        const requests = readDataFile(REQUESTS_FILE);
        
        // Filter jobs for this recruiter (in a real app, you'd filter by recruiterId)
        const recruiterJobs = jobs.filter(job => job.recruiterId === req.user.id);
        const recruiterRequests = requests.filter(request => request.recruiterId === req.user.id);

        const dashboardData = {
            activeJobs: recruiterJobs.filter(j => j.status === 'in-progress' || j.status === 'assigned').length,
            completedJobs: recruiterJobs.filter(j => j.status === 'completed').length,
            totalWorkersAssigned: recruiterJobs.filter(j => j.workerId).length,
            totalSpent: recruiterJobs
                .filter(j => j.status === 'completed')
                .reduce((sum, job) => sum + parseFloat(job.payment || 0), 0),
            pendingRequests: recruiterRequests.filter(r => r.status === 'pending').length
        };

        res.json({
            message: 'Recruiter dashboard data retrieved successfully',
            data: dashboardData
        });
    } catch (error) {
        console.error('Get recruiter dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export Routes
app.get('/api/export/workers', authenticateToken, (req, res) => {
    try {
        const workers = readDataFile(WORKERS_FILE);
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=workers_export.json');
        res.json(workers);
    } catch (error) {
        console.error('Export workers error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/export/jobs', authenticateToken, (req, res) => {
    try {
        const jobs = readDataFile(JOBS_FILE);
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=jobs_export.json');
        res.json(jobs);
    } catch (error) {
        console.error('Export jobs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/export/requests', authenticateToken, (req, res) => {
    try {
        const requests = readDataFile(REQUESTS_FILE);
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=requests_export.json');
        res.json(requests);
    } catch (error) {
        console.error('Export requests error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/export/recruiters', authenticateToken, (req, res) => {
    try {
        // Only admin can export recruiters
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin role required.' });
        }

        const recruiters = readDataFile(RECRUITERS_FILE);
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=recruiters_export.json');
        res.json(recruiters);
    } catch (error) {
        console.error('Export recruiters error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve static files (for the frontend)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Dashboard routes
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Workers routes
app.get('/workers', (req, res) => {
    res.sendFile(path.join(__dirname, 'workers.html'));
});

app.get('/workers.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'workers.html'));
});

// Recruiters routes
app.get('/recruiters', (req, res) => {
    res.sendFile(path.join(__dirname, 'recruiters.html'));
});

app.get('/recruiters.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'recruiters.html'));
});

// Recruiter Dashboard routes
app.get('/recruiter-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'recruiter-dashboard.html'));
});

app.get('/recruiter-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'recruiter-dashboard.html'));
});

// Jobs routes
app.get('/jobs', (req, res) => {
    res.sendFile(path.join(__dirname, 'jobs.html'));
});

app.get('/jobs.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'jobs.html'));
});

// Requests routes
app.get('/requests', (req, res) => {
    res.sendFile(path.join(__dirname, 'requests.html'));
});

app.get('/requests.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'requests.html'));
});

// Analytics routes
app.get('/analytics', (req, res) => {
    res.sendFile(path.join(__dirname, 'analytics.html'));
});

app.get('/analytics.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'analytics.html'));
});

// Settings routes
app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, 'settings.html'));
});

app.get('/settings.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'settings.html'));
});

// Login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Profile route (simple redirect to recruiter dashboard for now)
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'recruiter-dashboard.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`12th FailJobs CRM Server running on port ${PORT}`);
    console.log(`Access the CRM at: http://localhost:${PORT}`);
    console.log(`API endpoints available at: http://localhost:${PORT}/api`);
});

module.exports = app;
