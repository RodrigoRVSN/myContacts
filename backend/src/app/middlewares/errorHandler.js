module.exports =
  (error, req, res, next) => {
    console.log('Error handler! ⚠️ -> ' + error);
    res.sendStatus(500);
  }
