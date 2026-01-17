POST /auth/login

Body:{
    "email":"string",
    "password":"string"
}

Response:{
    "success":true,
    "data":{
        "accesstoken":"jwt",
        "refreshtoken":"jwt",
        "role":"Doctor"
    }
}