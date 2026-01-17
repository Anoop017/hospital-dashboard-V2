POST /appointments

Body:{
    "patientId":"string",
    "doctorId":"string",
    "time":"ISO-Date"
}

Response:{
    "success":true,
    "data":{
        "appointmentId":"string",
        "status":"pending"
    }
}