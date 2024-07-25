

// @csrf_exempt
// def create_password(request):
//     if request.method == 'POST':
//         json_data = json.loads(request.body)
//         email = json_data['email']
//         password = json_data['password']
//         confirmPassword = json_data['confirmPassword']


//         return JsonResponse({'data':json_data}, status=400)

const bcrypt = require('bcrypt');
const authSchema = require('../../validation/auth');
const serverError = require('../../handler/auth');
const prisma = require('../../../prisma/prisma');
const deleteFile = require('../../middleware/deleteFile');


const createPassword = async (req, res) => {
  const { error, value } = authSchema.createPassword.validate(req.body);

  // If Joi validation fails, send an error response
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Validate passwords
  if (value.password!==value.confirmPassword) 
    return res.status(400).json({ message: 'Password & Confirm Password don\'t match' });

  // Check if a user with the same email already exists
  const user = await prisma.user.findUnique({
    where: {
      email: value.email,
    },
  });
  if (!user) 
    return res.status(400).json({ message: 'User doesn\'t exists' });
  

  const hash = await bcrypt.hash(value.password, 10);

  try {
    await prisma.user.update({
     where:{
        email:value.email
     },
     data:{
        password:hash
     }
    });

    // Send a success response with the created user object
    res.status(200).json({
      message: 'Password Changed'
    });
  } catch (e) {

    return res.status(500).json({ message: 'Server Chilling' });
  }
};
module.exports = createPassword
