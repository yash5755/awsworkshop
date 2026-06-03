import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom mock API plugin to handle registration submissions
const mockApiPlugin = () => ({
  name: 'mock-api',
  configureServer(server) {
    try {
      const scratchPath = path.join(__dirname, 'scratch_403067.js');
      if (fs.existsSync(scratchPath)) {
        fs.unlinkSync(scratchPath);
        console.log('=== Successfully deleted scratch_403067.js ===');
      }
    } catch (e) {
      console.log('=== Error deleting scratch_403067.js:', e.message, '===');
    }

    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            
            // Console log the submission
            console.log('\n=== NEW REGISTRATION RECEIVED ===');
            console.log('Lead Name:', data.fullName);
            console.log('Email:', data.email);
            console.log('CNIC:', data.cnic);
            console.log('Team Name:', data.teamName || 'Solo');
            console.log('Module:', data.moduleId);
            console.log('Accommodation:', data.accommodationId);
            console.log('Ambassador Code:', data.ambassadorCode || 'None');
            console.log('Team Members Count:', data.teamMembers ? data.teamMembers.length : 0);
            console.log('Total Fee Paid:', data.totalPaid);
            console.log('=================================\n');

            // Save to submissions.json
            const submissionsPath = path.join(__dirname, 'submissions.json');
            let submissions = [];
            if (fs.existsSync(submissionsPath)) {
              const fileContent = fs.readFileSync(submissionsPath, 'utf8');
              submissions = JSON.parse(fileContent || '[]');
            }
            submissions.push({
              ...data,
              timestamp: new Date().toISOString()
            });
            fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2), 'utf8');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success', message: 'Registered successfully!' }));
          } catch (e) {
            console.error('Error saving registration:', e);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'error', message: 'Internal Server Error' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()],
})
