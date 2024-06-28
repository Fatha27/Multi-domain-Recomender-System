const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../config/passportSetup");
const jwt = require("jsonwebtoken");

// Route for Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // Successful authentication, generate token and set cookie
//     const user = req.user; // Retrieve the authenticated user from the request object
//     // authController.generateTokenAndSetCookie(user, res);
//     // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     // res.cookie('token', token, {
//     //     httpOnly: true,
//     //     maxAge: 3600000 // 1 hour in milliseconds
//     // });
//     if (req.user && req.user.token) {
//       // Set the cookie with the token
//       res.cookie("token", req.user.token, {
//         httpOnly: true,
//         maxAge: 3600000, // 1 hour in milliseconds
//       });
//     }
// 
//     res.status(201).json({ message: "User registered successfully", token: req.user.token });

//     // Redirect to dashboard or any other route
//     res.redirect("http://localhost:3000/dashboard");
//   }
// );


// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     (req, res) => {
//       // Successful authentication, generate token and set cookie
//       const user = req.user; // Retrieve the authenticated user from the request object
  
//       if (user && user.token) {
//         // Set the cookie with the token
//         res.cookie("token", user.token, {
//           httpOnly: true,
//           maxAge: 3600000, // 1 hour in milliseconds

//         });
  
//         // Redirect to dashboard with cookies set
//         res.redirect("http://localhost:3000/dashboard");
//       } else {
//         res.redirect("/login"); // Redirect to login if no user or token
//       }
//     }
//   );
  

// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     (req, res) => {
//       // Successful authentication, generate token and set cookie
//       const user = req.user; // Retrieve the authenticated user from the request object
  
//       if (user && user.token) {
//         // Set the cookie with the token
//         res.cookie("token", user.token, {
//           // httpOnly: true,
//           maxAge: 3600000, // 1 hour in milliseconds
//           // Add other cookie options if needed
//         });
  
//         // Send response with the token cookie set
//         // res.status(201).json({user:user})
//         res.redirect("http://localhost:3000/recommenders")
//         // res.status(200).json({ message: "User authenticated", token: user.token,user:user });
//       } else {
//         res.status(401).json({ message: "User not authenticated" });
//       }
//     }
//   );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//       // Successful authentication, generate token and set cookie
//       const user = req.user; // Retrieve the authenticated user from the request object

//       if (user && user.token) {
//           // Set the cookie with the token
//           res.cookie("token", user.token, {
//               maxAge: 3600000, // 1 hour in milliseconds
//           });

//           // Send JSON response with user details
//           res.status(200).json({ message: "User authenticated", user: user });
//       } else {
//           res.status(401).json({ message: "User not authenticated" });
//       }
//   }
// );
let userData;

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
      // Successful authentication, generate token and set cookie
      const user = req.user; // Retrieve the authenticated user from the request object
      userData=req.user
      if (user && user.token) {
          // Set the cookie with the token
          res.cookie("token", user.token, {
              maxAge: 3600000, // 1 hour in milliseconds
          });

          // Send JSON response with user details
          res.redirect("http://recom-ai.site/recommenders")
          // res.status(200).json({ message: "User authenticated"});
      } else {
          res.status(401).json({ message: "User not authenticated" });
      }
  }
);
router.get('/user', (req, res) => {
  // Send user data obtained from Google authentication
  res.json(userData);
  console.log(userData)
});


  

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;

// const express = require('express');
// const passport = require('passport');
// const router = express.Router();
// const authController = require("../config/passportSetup");

// // Route for Google OAuth
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, set cookie and redirect to dashboard
//     // Retrieve the authenticated user from the request object
//     // res.cookie('token', req.user.token, { httpOnly: true, maxAge: 3600000 }); // Set cookie
//     res.redirect('http://localhost:3000/dashboard');
//   }
// );

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);

// module.exports = router;
