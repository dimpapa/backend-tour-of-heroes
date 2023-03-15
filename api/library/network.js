'use strict';

/**
 * Network communication
 */

 const Method = Object.freeze({
  GET: Symbol('GET'),
  PATCH: Symbol('PATCH'),
  POST: Symbol('POST'),
  DELETE: Symbol('DELETE')
 });

const replyError = ({ res, httpMethod, httpStatus, error, message }) => {
  
  res.status(httpStatus).json({
    status: 'fail',
    httpMethod,
    message,
    error: error ? error : 'Hm.. I do not know what was wrong.',
    data: [],
    count: 0
  });
}

const replyData = ({ res, httpMethod, httpStatus, data, message}) => {
  
  console.debug('method:', httpMethod);
  console.debug('status:', httpStatus);
  console.debug('data:', data);
  console.debug('message:', message);
  console.debug('Count:', data.length);
  
  let  count = 0;
  
  switch (httpMethod) {
    case Method.GET:
    case Method.POST:
      count = data.length;
      break;
    case Method.DELETE:
    case Method.PATCH:
      count = 1;
      break;
  }
  res.status(httpStatus).json({
    status: 'ok',
    message: message ? message : 'Ok',
    count,
    data
  });
}

const replyAuthData = ({res, httpStatus, authToken, authData}) => {

  res
    .status(httpStatus)
    .header('x-auth', authToken)
    .json({
      status: 'ok',
      message: 'Authenticated succesfully',
      authData
    });
}

module.exports = { Method, replyError, replyData, replyAuthData };
