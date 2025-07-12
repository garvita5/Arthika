const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error.status = 400;
    error.message = 'Validation Error';
    error.details = err.details;
  } else if (err.name === 'MulterError') {
    error.status = 400;
    error.message = 'File upload error';
  } else if (err.code === 'ENOENT') {
    error.status = 404;
    error.message = 'Resource not found';
  } else if (err.code === 'ECONNREFUSED') {
    error.status = 503;
    error.message = 'Service temporarily unavailable';
  }

  // Log error details in development
  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  res.status(error.status).json({
    success: false,
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    ...(error.details && { details: error.details })
  });
};

module.exports = errorHandler;
