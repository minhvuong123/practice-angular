const express = require('express');
const Router = express.Router();

const { List: ListModel } = require('../../models');

const { handleSuccess, handleError } = require('../helpers/response');

Router.get('/', async (req, res) => {
  try {
      const lists = await ListModel.getAll( [], {});

      handleSuccess(res, { lists });
  } catch (err) {
    if(err.msg) 
      handleError(res, { code: err.code, msg: err.msg});
    else 
      handleError(res, { code: err.code, msg: "Server is error" });
  }
})

Router.post('/', async (req, res) => {
    try {
        const { page, limit } = req.body;

        if(!page || !limit) {
            handleError(res, { code: 400, msg: "Invalid values" });
            return;
        }
        const offset = (page - 1) * limit;
        
        const lists = await ListModel.getAll( [], {}, { offset, limit } );

        handleSuccess(res, { lists });
    } catch (err) {
      if(err.msg) 
       handleError(res, { code: err.code, msg: err.msg});
      else 
        handleError(res, { code: err.code, msg: "Server is error" });
    }
})

Router.post('/add', async (req, res) => {
    try {
        const { ...listRequest } = req.body;

        if( !listRequest.name ) {
          handleError(res, { code: 400, msg: "Invalid values" });
          return;
        }

        const listEntity = {...listRequest};

        const list = await ListModel.add(listEntity);

        if(!list) {
          handleError(res, { code: 400, msg: "Creating position is failed" });
          return;
        }

        handleSuccess(res, { list });
    } catch (err) {
      if(err.msg) 
        handleError(res, { code: err.code, msg: err.msg});
      else 
        handleError(res, { code: err.code, msg: "Server is error" });
    }
})

Router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body; 
        if(!id) {
            handleError(res, { code: 400, msg: "Invalid values" });
            return;
        }

        const result = await ListModel.delete({ where: { id } });
        
        // result = 1 is success
        // result = 0 is fail
        if(!result){
            handleError(res, { code: 400, msg: "Delete is failed" });
            return;
        }

        handleSuccess(res, { msg: 'Delete is success' });
    } catch (err) {
      if(err.msg) 
        handleError(res, { code: err.code, msg: err.msg});
      else 
        handleError(res, { code: err.code, msg: "Server is error" });
    }
})

Router.put('/modify', async (req, res) => {
    try {
        const { id, ...List } = req.body;

        if( !id || !List ) {
            handleError(res, { code: 400, msg: "Invalid values" });
            return;
        }

        const ListCheck = await ListModel.getAll([], { where : { id }});

        if(ListCheck.length){
          // result = [1] is mysql change
          // result = [0] is mysql not change
          await ListModel.modify( List , { where: { id } });

          handleSuccess(res, { msg: 'Update is success' });
        }

        handleError(res, { code: 500, msg: "id not found" });
        
    } catch (err) {
      if(err.msg) 
        handleError(res, { code: err.code, msg: err.msg});
      else 
        handleError(res, { code: err.code, msg: "Server is error" });
    }
})

module.exports = Router;