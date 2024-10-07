const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken, authenticateJWT } = require("../services/auth");
const { getRandom } = require("../utility/getRandom");
const userModel = require("../Models/user");
const { sendEmail,forgetAck } = require("../services/Email");

// ==============================Login Route===============================
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    // Check if the password is correct
    const isMatch = bcrypt.compareSync(password, user.hashPassword);

    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }

    // Generate a token
    const token = generateToken(user.email, user.hashPassword);
    res.cookie(token); // Use secure in production
    res.json({
      user: "Login SuccessFully",
      token: token,
    });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
// ==========================================Register Route===============================
async function register(req, res) {
  const { username, password, name, email, phoneNumber } = req.body;

  const hashPassword = bcrypt.hashSync(password, saltRounds);

  try {
    const newUser = new User({
      username,
      hashPassword,
      name,
      email,
      phoneNumber,
    });
    await newUser.save();

    res.send(newUser);
  } catch (err) {
    res.send(err.message);
  }
}

// ======================Update route=========================================
async function update(req, res) {
  const { username, email, phoneNumber, name } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

    // If user not found
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return updated user
    res.status(200).json({
      status: "Update successfully",
      UpdatedData: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// ===================================Forget password==========
async function forget(req, res) {
  const { newPassword, email} = req.body;
  const user = await userModel.findOne({ email });

  if(!user){
    res.json({
        message:"User Not Found",
        status:'false'
    })
  }
 
  try {
    const hashPassword = bcrypt.hashSync(newPassword, saltRounds);
    user.hashPassword = hashPassword;
    await user.save();
    await forgetAck();
    res.json({
      forget: "Password Forget Successfully",
      Update: "true",
      acknowledge:"Email  send Successfully"
    });
  } catch (err) {
    res.send(err.message);
  }
}

// ==============================Generate Otp========================
async function sendOTP(req, res) {
  const { email } = req.body;
  const otp = getRandom();

  const user = await userModel.findOne({ email });

  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await sendEmail(otp);
      res.status(200).json({
        OTP: otp,
        message: "Email send SuccessFully",
        status: "true",
      });
    }
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = { login, register, update, forget, sendOTP };
