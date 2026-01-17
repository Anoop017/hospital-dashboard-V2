Controller: Handles HTTP request & response only
Service: Contains business logic
Repository: Talks to database

Flow:
Request → Controller → Service → Repository → Response


Success Response:
{
  "success": true,
  "data": {},
  "message": "optional"
}

Error Response:
{
  "success": false,
  "error": {
     "code": "AUTH_ERROR",
     "message": "Invalid credentials"
  }
}
