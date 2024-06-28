require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passportSetup');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const mongoose=require("mongoose")
// require("dotenv").config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true
// }));

const corsOptions = {
  origin: 'http://recom-ai.site:3000',
  methods: "GET,POST,PUT,DELETE", // This should match the URL of your frontend
  credentials: true, // This allows the server to accept credentials (cookies, authorization headers, etc.) from the frontend
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'hsf25h2th5rst23h',  // Should ideally be a long, random, and secure string
    resave: false,
    saveUninitialized: false,  // This prevents empty session objects being stored
    cookie: {
        // httpOnly: true,  // Prevents client-side JS from accessing the cookie data
        // secure: process.env.NODE_ENV === "production",  // Ensures cookies are sent over HTTPS only
        // sameSite: 'strict',  // Helps mitigate CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 24 hours; sets the cookie expiry time
    }
}));




DB=process.env.DATABASE;

mongoose.connect(DB).then(()=> console.log("Db connected")).catch((error)=>console.log(error))



app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
  res.send("Hello user I am a nodejs server !!!")
})
// --testing--
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// app.post("/generate", async (req, res) => {
//     const { prompt } = req.body;
//     try {
//       // For text-only input, use the gemini-pro model
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text();
//       res.send(text);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Failed to generate content");
//     }
//   });

app.use('/auth', authRoutes);
// Express route to verify token
// app.post('/auth/verifyToken', (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//   }
//   try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       res.status(200).json({ valid: true, userId: decoded.id });
//   } catch (error) {
//       res.status(401).json({ valid: false, message: "Invalid token" });
//   }
// });

// app.post('/auth/verifyToken', cors(corsOptions), (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//   }
//   try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       res.status(200).json({ valid: true, userId: decoded.id });
//   } catch (error) {
//       res.status(401).json({ valid: false, message: "Invalid token" });
//   }
// });
// app.post('/auth/verifyToken', cors(corsOptions), (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//   }
//   try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       res.status(200).json({ valid: true, userId: decoded.id });
//   } catch (error) {
//       res.status(401).json({ valid: false, message: "Invalid token" });
//   }
// });




const PORT = process.env.PORT || 6005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
