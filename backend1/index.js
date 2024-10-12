const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Using bcrypt to securely hash passwords
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();
const app = express();

// Secure JWT token secret from environment variables
const tok = process.env.JWT_SECRET || "c44d14c3ec99655146083383eb33b6d2f720927f05b19ad29f711540576cfef5bdf2ee4c918f1d2d4831ef726d2068cf9c973924939646198836a8dc19bae4eb"; // Ensure you set this in your .env file for production

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: ["https://lastfront.vercel.app"], // Update this with the correct frontend origin
  methods: ["GET", "POST", "PUT", "OPTIONS"],
  credentials: true, // Allow credentials (cookies)
}));

// MongoDB connection
mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema & model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password match
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// JWT token generation function
// const generateToken = (id) => {
//   return jwt.sign({ id }, tok, { expiresIn: '10d' });
// };

const generateToken = (id) => jwt.sign({ id }, tok, { expiresIn: '10d' });
console.log(generateToken)
// Verify Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, tok);
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null; // Handle error as needed
  }
};

verifyToken()

// Middleware to protect routes
const protect = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Adjust to get the token from headers
  if (!token) {
    return res.status(401).json({ message: 'No token, not authorized' });
  }
  try {
    const decoded = jwt.verify(token, tok);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

// Routes

// Register
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const newUser = await User.create({ username, email, password });
    const token = generateToken(newUser._id);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred, please try again.' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate request data
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user does not exist, return an error
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate and set token in response cookie
    // const token = generateToken(user._id);
    // res.cookie('token', token, { httpOnly: true, secure: false});
const token = generateToken(user._id);

// Send token in cookie (if required)
res.cookie('token', token, { httpOnly: true, secure: false });

// Also send the token in the response body
res.json({ token });

    // Return success message
    return res.status(200).json({ message: 'Login successful.' });

  } catch (error) {
    console.error('Login Error:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout successful' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

// GET all accounts - Protected route
app.get('/account', protect, async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching accounts' });
  }
});

// PUT update an account by ID
app.put('/account/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const account = await Account.findByIdAndUpdate(id, update, { new: true });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: 'Error updating account' });
  }
});

// POST create a new account
app.post('/account', protect, async (req, res) => {
  try {
    const { Description, Username, Password, URL, Notes } = req.body;
    const newAccount = new Account({ Description, Username, Password, URL, Notes });
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    res.status(500).json({ error: 'Error creating account' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

// // Load environment variables
// dotenv.config();
// const app = express();

// // Secure JWT token secret from environment variables
// const tok = process.env.JWT_SECRET || "c44d14c3ec99655146083383eb33b6d2f720927f05b19ad29f711540576cfef5bdf2ee4c918f1d2d4831ef726d2068cf9c973924939646198836a8dc19bae4eb"; // Ensure you set this in your .env file for production

// // Middleware setup
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.json());

// // CORS configuration
// app.use(cors({
//   origin: ["https://lastfront.vercel.app"], // Update this with the correct frontend origin
//   methods: ["GET", "POST", "PUT", "OPTIONS"],
//   credentials: true, // Allow credentials (cookies)
// }));

// // MongoDB connection
// mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0', 
//   { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // User schema & model
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // // Password hashing middleware
// // userSchema.pre('save', async function (next) {
// //   if (!this.isModified('password')) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // Method to check password match
// // userSchema.methods.matchPassword = async function (enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // JWT token generation function
// const generateToken = (id) => {
//   return jwt.sign({ id }, tok, { expiresIn: '10d' });
// };

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: 'No token, not authorized' });
//   }
//   try {
//     const decoded = jwt.verify(token, tok);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Not authorized' });
//   }
// };

// // Routes

// // Register
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists.' });
//     }

//     const newUser = await User.create({ username, email, password });
//     const token = generateToken(newUser._id);
//     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
//     return res.status(201).json({ message: 'Registration successful.' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'An error occurred, please try again.' });
//   }
// });


// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Validate request data
//   if (!email || !password) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });

//     // If user does not exist, return an error
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     // Compare the input password with the stored password (no bcrypt, direct comparison)
//     if (password !== user.password) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     // Generate and set token in response cookie
//     const token = generateToken(user._id);
//     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

//     // Return success message
//     return res.status(200).json({ message: 'Login successful.' });

//   } catch (error) {
//     console.error('Login Error:', error); // Log the error for debugging
//     return res.status(500).json({ message: 'Server error, please try again later.' });
//   }
// });



// // Login
// // app.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   if (!email || !password) {
// //     return res.status(400).json({ message: 'All fields are required.' });
// //   }

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user || !(await user.matchPassword(password))) {
// //       return res.status(401).json({ message: 'Invalid email or password.' });
// //     }

// //     const token = generateToken(user._id);
// //     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
// //     return res.status(200).json({ message: 'Login successful.' });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: 'Server error, please try again later.' });
// //   }
// // });

// // Logout
// app.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   return res.status(200).json({ message: 'Logout successful' });
// });

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the backend server');
// });

// // GET all accounts - Protected route
// app.get('/account', protect, async (req, res) => {
//   try {
//     const accounts = await Account.find();
//     res.json(accounts);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching accounts' });
//   }
// });

// // PUT update an account by ID
// app.put('/account/:id', protect, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const update = req.body;
//     const account = await Account.findByIdAndUpdate(id, update, { new: true });
//     res.json(account);
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating account' });
//   }
// });

// // POST create a new account
// app.post('/account', protect, async (req, res) => {
//   try {
//     const { Description, Username, Password, URL, Notes } = req.body;
//     const newAccount = new Account({ Description, Username, Password, URL, Notes });
//     const savedAccount = await newAccount.save();
//     res.status(201).json(savedAccount);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating account' });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// dotenv.config();
// const app = express();
// const tok = "c44d14c3ec99655146083383eb33b6d2f720927f05b19ad29f711540576cfef5bdf2ee4c918f1d2d4831ef726d2068cf9c973924939646198836a8dc19bae4eb"; // Keep your secret secure

// // Middleware setup
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.json());
// // CORS configuration
// app.use(cors({
//   origin: ["https://lastfront.vercel.app"],
//   methods: ["GET", "POST", "PUT", "OPTIONS"], // Include OPTIONS for preflight requests
//   credentials: true, // This allows cookies to be included in the requests
// }));

// // MongoDB connection
// mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0', 
//   { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // User schema & model
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // Account schema & model
// const accountSchema = new mongoose.Schema({
//   Description: String,
//   Username: String,
//   Password: String,
//   URL: String,
//   Notes: String,
// });

// const Account = mongoose.model('Account', accountSchema);

// // Password hashing middleware
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Method to check password match
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // JWT token generation function
// const generateToken = (id) => {
//   return jwt.sign({ id }, tok, { expiresIn: '10d' });
// };

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: 'No token, not authorized' });
//   }
//   try {
//     const decoded = jwt.verify(token, tok);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Not authorized' });
//   }
// };

// // Routes
// // Register
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   // Validate request data quickly
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Check for existing user in one step
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists.' });
//     }

//     // Create new user and set token
//     const newUser = await User.create({ username, email, password });
//     const token = generateToken(newUser._id);
//     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Use secure cookie in production

//     return res.status(201).json({ message: 'Registration successful.' });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     return res.status(500).json({ message: 'An error occurred, please try again.' });
//   }
// });

// // Login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Validate request data
//   if (!email || !password) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Check for existing user by email
//     const user = await User.findOne({ email });

//     // If user does not exist
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     // Generate and set token in the response cookie
//     const token = generateToken(user._id);
//     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

//     // Return successful login message
//     return res.status(200).json({ message: 'Login successful.' });

//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     return res.status(500).json({ message: 'Server error, please try again later.' });
//   }
// });

// // Logout
// app.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   return res.status(200).json({ message: 'Logout successful' });
// });

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the backend server');
// });

// // GET all accounts - Protected route
// app.get('/account', protect, async (req, res) => { // Added 'protect' middleware
//   try {
//     const accounts = await Account.find();
//     res.json(accounts);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching accounts' });
//   }
// });

// // PUT update an account by ID
// app.put('/account/:id', protect, async (req, res) => { // Added 'protect' middleware
//   try {
//     const { id } = req.params;
//     const update = req.body;
//     const account = await Account.findByIdAndUpdate(id, update, { new: true });
//     res.json(account);
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating account' });
//   }
// });

// // POST create a new account
// app.post('/account', protect, async (req, res) => { // Added 'protect' middleware
//   try {
//     const { Description, Username, Password, URL, Notes } = req.body;
//     const newAccount = new Account({ Description, Username, Password, URL, Notes });
//     const savedAccount = await newAccount.save();
//     res.status(201).json(savedAccount);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating account' });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
