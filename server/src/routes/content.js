const express = require('express');
const Router = express.Router();

const { 
  Content: ContentModel,
  List: ListModel
 } = require('../../models');

const { handleSuccess, handleError } = require('../helpers/response');

Router.get('/', async (req, res) => {
  try {
      const contents = await ContentModel.getAll( [], {});

      handleSuccess(res, { contents });
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
        
        const contents = await ContentModel.getAll( [], {}, { offset, limit } );

        handleSuccess(res, { contents });
    } catch (err) {
      if(err.msg) 
       handleError(res, { code: err.code, msg: err.msg});
      else 
        handleError(res, { code: err.code, msg: "Server is error" });
    }
})

Router.post('/add', async (req, res) => {
    try {
        const { ...contentRequest } = req.body;

        if( !contentRequest.english ) {
          handleError(res, { code: 400, msg: "Invalid values" });
          return;
        }

        const ListCheck = await ListModel.getAll([], { where : { id: contentRequest.listId }});

        if(ListCheck.length){
          const contentEntity = {...contentRequest};

          const content = await ContentModel.add(contentEntity);

          if(!content) {
            handleError(res, { code: 400, msg: "Creating position is failed" });
            return;
          }
          handleSuccess(res, { content });
        } else {
          handleError(res, { code: 400, msg: "List ID not found" });
        }
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

        const result = await ContentModel.delete({ where: { id } });
        
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
        const { id, ...Content } = req.body;

        if( !id || !Content ) {
            handleError(res, { code: 400, msg: "Invalid values" });
            return;
        }

        const ContentCheck = await ContentModel.getAll([], { where : { id }});

        if(ContentCheck.length){
          // result = [1] is mysql change
          // result = [0] is mysql not change
          await ContentModel.modify( Content , { where: { id } });

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