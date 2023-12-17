export function loginValidation(values) {
    let errors = {};
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if (!values.email.trim()) {
      errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Invalid email format";
    }
  
    if (!values.password.trim()) {
      errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
      errors.password = "Password should contain at least 8 characters with one uppercase letter, one lowercase letter, and one number";
    }
  
    return errors;
  }
  