import express from 'express';
import cors from 'cors';
import axios from 'axios';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'build')));

const corsOptions = {
    origin: ["http://localhost:3000","https://youtube-clone-nine-vert.vercel.app/","https://youtube-clone-37armu1o9-ashim-guptas-projects.vercel.app/","https://youtube-clone-git-main-ashim-guptas-projects.vercel.app/"],
    method: ["GET","POST"]
};
app.use(cors(corsOptions));

const requestEndpoint = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/getSearchResults', async (req, res) => {
    try {
        const response = await axios.get(requestEndpoint+req.query.q, { 
            httpsAgent: new https.Agent({ rejectUnauthorized: false }) })
        console.log(response.data)
        const x = response.data
        res.send(x)
    } catch (error) {
        console.error(error);
    }
});

export default app;
