import { PAGINATION } from "../constants/index.js";
import Permission from "../models/permissions.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";

const UserController = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId).exec();

      const permission = await Permission.findOne({ user: userId }).exec();

      res.json({
        ...user.toJSON(),
        role: permission.role,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { userName, phoneNumber, fullName, cccd } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        {
          userName,
          phoneNumber,
          fullName,
          cccd,
        },
        { new: true }
      ).exec();

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  changeProfilePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { password, newPassword } = req.body;

      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản!",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Mật khẩu hiện tại không chính xác!" });
      }

      const isSameOldPassword = await bcrypt.compare(
        newPassword,
        findUser.password
      );
      if (isSameOldPassword) {
        return res
          .status(406)
          .json({ message: "Mật khẩu cũ không được trùng mật khẩu mới" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
      }).exec();

      res.json({
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      // Lấy danh sách người dùng
      const users = await User.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      // Lấy tổng số người dùng để tính tổng số trang
      const count = await User.countDocuments();
      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      // Lấy danh sách quyền tương ứng với userIds
      const userIds = users.map((user) => user._id);
      const permissions = await Permission.find({
        user: { $in: userIds },
      }).exec();

      // Tạo một map để ánh xạ userId với role
      const permissionMap = permissions.reduce((acc, permission) => {
        acc[permission.user] = permission.role;
        return acc;
      }, {});

      // Gắn thông tin role vào danh sách người dùng
      const usersWithRoles = users.map((user) => ({
        ...user.toJSON(),
        role: permissionMap[user._id] || null, // Nếu không tìm thấy role thì để null
      }));

      res.json({
        data: usersWithRoles,
        totalPage,
        currentPage,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { userName, phoneNumber, fullName, cccd } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        {
          userName,
          phoneNumber,
          fullName,
          cccd,
        },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateUserRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(404).json({
          message: "User không tồn tại",
        });
      }

      await Permission.findOneAndUpdate({ user: id }, { role }).exec();

      res.json({
        message: "Update role successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default UserController;
