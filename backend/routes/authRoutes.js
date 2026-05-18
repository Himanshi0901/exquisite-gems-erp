const express =
  require("express");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const router =
  express.Router();

/* REGISTER */

router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
      } = req.body;

      const existing =
        await User.findOne(
          {
            where: {
              email,
            },
          }
        );

      if (existing) {
        return res
          .status(400)
          .json({
            error:
              "User already exists",
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create(
          {
            name,
            email,
            password:
              hashedPassword,
            role,
          }
        );

      res.json({
        message:
          "User created",
        user,
      });
    } catch (error) {
      console.log(
        error
      );

      res.status(500).json(
        {
          error:
            "Registration failed",
        }
      );
    }
  }
);

/* LOGIN */

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne(
          {
            where: {
              email,
            },
          }
        );

      if (!user) {
        return res
          .status(400)
          .json({
            error:
              "Invalid credentials",
          });
      }

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (
        !validPassword
      ) {
        return res
          .status(400)
          .json({
            error:
              "Invalid credentials",
          });
      }

      const token =
        jwt.sign(
          {
            id: user.id,
            role:
              user.role,
          },
          process.env
            .JWT_SECRET,
          {
            expiresIn:
              "7d",
          }
        );

      res.json({
        token,

        user: {
          id: user.id,
          name:
            user.name,
          email:
            user.email,
          role:
            user.role,
        },
      });
    } catch (error) {
      console.log(
        error
      );

      res.status(500).json(
        {
          error:
            "Login failed",
        }
      );
    }
  }
);

module.exports =
  router;