import JWT from 'jsonwebtoken';

const Authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Access Denied. No token found in cookies.' });
    }

    const verified = JWT.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Invalid token.', error: error.message });
  }
};

export default Authentication;
