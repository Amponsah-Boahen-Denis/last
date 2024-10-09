// // // index.js
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const dotenv = require('dotenv');

// // dotenv.config();

// // const app = express();
// // app.use(cors(
// // ));
// // app.use(bodyParser.json());

// // mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0')
// // .then(() => console.log('MongoDB connected'))
// // .catch(err => console.log(err));

// // const accountSchema = new mongoose.Schema({
// //   Description: String,
// //   Username: String,
// //   Password: String,
// //   URL: String,
// //   Notes: String,
// // });

// // const Account = mongoose.model('account', accountSchema);

// // app.get('/account', async (req, res) => {
// //   try {
// //     const accounts = await Account.find();
// //     res.json(accounts);
// //   } catch (err) {
// //     res.status(500).send(err);
// //   }
// // });

// // app.put('/account/:id', async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const update = req.body;
// //     const account = await Account.findByIdAndUpdate(id, update, { new: true });
// //     res.json(account);
// //   } catch (err) {
// //     res.status(500).send(err);
// //   }
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');


// const app = express();
// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());






// // CORS configuration for specific frontend origin
// app.use(cors({
//   origin: ["https://fullstack-mern-front.vercel.app","http://localhost:3000"], 
//   methods: ["GET", "POST", "PUT"],
//   credentials: true
// }));

// app.use(bodyParser.json());


// // MongoDB connection
// mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));


// // MongoDB connection
// // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => console.log('MongoDB connected'))
// //     .catch((err) => console.log(err));

// // User schema & model
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// const accountSchema = new mongoose.Schema({
//   Description: String,
//   Username: String,
//   Password: String,
//   URL: String,
//   Notes: String,
// });

// const Account = mongoose.model('Account', accountSchema);

// // Password hashing
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Check password match
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };



// // JWT token generation
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });
// };

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//     let token = req.cookies.token;
//     if (token) {
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             return res.status(401).json({ message: 'Not authorized' });
//         }
//     } else {
//         return res.status(401).json({ message: 'No token, not authorized' });
//     }
// };

// // Routes

// // Register
// app.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });

//         if (user) {
//             return res.redirect('/login');  // Redirect if user already exists
//         }

//         user = await User.create({ username, email, password });
//         const token = generateToken(user._id);

//         res.cookie('token', token, { httpOnly: true });
//         return res.status(201).json({ message: 'Registered successfully', user });
//     } catch (error) {
//         return res.status(500).json({ error: 'Server error' });
//     }
// });

// // Login
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user || !(await user.matchPassword(password))) {
//             return res.redirect('/register');  // Redirect if user is not found or wrong password
//         }

//         const token = generateToken(user._id);
//         res.cookie('token', token, { httpOnly: true });
//         return res.redirect('/')
//     } catch (error) {
//         return res.status(500).json({ error: 'Server error' });
//     }
// });

// // Logout
// app.get('/logout', protect, (req, res) => {
//     res.clearCookie('token');
//     return res.status(200).json({ message: 'Logout successful' });
// });

// // Protected route (example)
// // app.get('/dashboard', protect, (req, res) => {
// //     return res.status(200).json({ message: `Welcome ${req.user.username}!`, user: req.user });
// // });




// // Account schema


// // Root route
// app.get('/', protect, (req, res) => {
//   res.send('Welcome to the backend server');
// });

// // GET route to fetch all accounts
// app.get('/account',  protect, async (req, res) => {
//   try {
//     const accounts = await Account.find();
//     res.json(accounts);
//   } catch (err) {
//     res.status(500).json({ error: 'An error occurred while fetching accounts' });
//   }
// });


// // PUT route to update an account by ID
// app.put('/account/:id', protect, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const update = req.body;
//     const account = await Account.findByIdAndUpdate(id, update, { new: true });
//     res.json(account);
//   } catch (err) {
//     res.status(500).json({ error: 'An error occurred while updating the account' });
//   }
// });

// // POST route to add a new account (password record)
// app.post('/account', protect, async (req, res) => {
//   try {
//     const { Description, Username, Password, URL, Notes } = req.body;

//     // Create a new account instance
//     const newAccount = new Account({
//       Description,
//       Username,
//       Password,
//       URL,
//       Notes,
//     });


//     // Save the new account to the database
//     const savedAccount = await newAccount.save();
//     res.status(201).json(savedAccount); // Respond with the created account
//   } catch (err) {
//     res.status(500).json({ error: 'An error occurred while creating the account' });
//   }
// });


// // Server listening on PORT
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: ["https://lastfront.vercel.app", "http://localhost:3000"], 
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema & model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Account schema & model
const accountSchema = new mongoose.Schema({
  Description: String,
  Username: String,
  Password: String,
  URL: String,
  Notes: String,
});

const Account = mongoose.model('Account', accountSchema);

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

// JWT token generation function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });
};

// Middleware to protect routes
const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, not authorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.redirect('/login'); // Redirect if user exists
    }
    user = await User.create({ username, email, password });
    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });
    return res.status(201).json({ message: 'Registered successfully', user });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.redirect('/register'); // Redirect if user not found or incorrect password
    }
    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/');
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Logout
app.get('/logout', protect, (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout successful' });
});

// Root route
app.get('/', protect, (req, res) => {
  res.send('Welcome to the backend server');
});

// GET all accounts
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
