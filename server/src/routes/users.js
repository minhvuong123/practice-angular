const express = require('express');
const Router = express.Router();

const {
  User: UserModel,
} = require('../../models');

const { handleSuccess, handleError } = require('../helpers/response');

const fakeID = require('../helpers/generateId');

Router.get('/', async (req, res) => {
  try {
    const users = await UserModel.getAll([], {});

    handleSuccess(res, { users });
  } catch (err) {
    if (err.msg)
      handleError(res, { code: err.code, msg: err.msg });
    else
      handleError(res, { code: err.code, msg: "Server is error" });
  }
})

Router.post('/', async (req, res) => {
  try {
    const { page, limit } = req.body;

    if (!page || !limit) {
      handleError(res, { code: 400, msg: "Invalid values" });
      return;
    }
    const offset = (page - 1) * limit;

    const users = await UserModel.getAll([], {}, { offset, limit });

    handleSuccess(res, { users });
  } catch (err) {
    if (err.msg)
      handleError(res, { code: err.code, msg: err.msg });
    else
      handleError(res, { code: err.code, msg: "Server is error" });
  }
})

Router.post('/add', async (req, res) => {
  try {
    const { ...userRequest } = req.body;

    if (!userRequest.email || !userRequest.password) {
      handleError(res, { code: 400, msg: "Invalid values" });
      return;
    }

    const id  = fakeID(10);

    const userEntity = { ...userRequest, id };

    const user = await UserModel.add(userEntity);

    if (!user) {
      handleError(res, { code: 400, msg: "Creating user is failed" });
      return;
    }

    handleSuccess(res, { user });

  } catch (err) {
    if (err.msg)
      handleError(res, { code: err.code, msg: err.msg });
    else
      handleError(res, { code: err.code, msg: "Server is error" });
  }
})

Router.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      handleError(res, { code: 400, msg: "Invalid values" });
      return;
    }

    const result = await UserModel.delete({ where: { id } });

    // result = 1 is success
    // result = 0 is fail
    if (!result) {
      handleError(res, { code: 400, msg: "Delete is failed" });
      return;
    }

    handleSuccess(res, { msg: 'Delete is success' });
  } catch (err) {
    if (err.msg)
      handleError(res, { code: err.code, msg: err.msg });
    else
      handleError(res, { code: err.code, msg: "Server is error" });
  }
})

Router.put('/modify', async (req, res) => {
  try {
    const { id, ...user } = req.body;

    if (!id || !user) {
      handleError(res, { code: 400, msg: "Invalid values" });
      return;
    }

    const userCheck = await UserModel.getAll([], { where: { id } });

    if (userCheck.length) {
      // result = [1] is mysql change
      // result = [0] is mysql not change
      await UserModel.modify(user, { where: { id } });

      handleSuccess(res, { msg: 'Update is success' });
    } else {
      handleError(res, { code: 500, msg: "id not found" });
    }
  } catch (err) {
    if (err.msg)
      handleError(res, { code: err.code, msg: err.msg });
    else
      handleError(res, { code: err.code, msg: "Server is error" });
  }
})

module.exports = Router;