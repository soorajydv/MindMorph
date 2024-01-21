function validateUser(username, email, password) {
    if (username == '' || email == '' || password == '') {
        return {
          status: 'Failed',
          message: 'Empty inputs'
        };
      } else if (!/^[a-zA-Z]*$/.test(username)) {
        return {
          status: 'Failed',
          Message: "Name should only contain letters"
        };
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return {
          status: "Failed",
          message: "invalid email"
        };
      }
      else if (password.length < 8) {
        return {
          status: "Failed",
          message: "password too short"
        };
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
        return {
          status: 'Failed',
          message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
        };
      }
    
}

module.exports = validateUser;