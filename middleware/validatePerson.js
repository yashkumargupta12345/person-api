module.exports = function validatePerson(req, res, next) {
  const { name, age, mobile } = req.body
  const errors = []

  // Name: required, letters only, min length
  if (!name || name.trim().length < 2 || !/^[a-zA-Z ]+$/.test(name)) {
    errors.push('Name must be at least 2 characters and contain only letters.')
  }

  // Age: required, numeric, 0–120
  if (!age || isNaN(age) || age < 0 || age > 120) {
    errors.push('Age must be a number between 0 and 120.')
  }

  // Mobile: required, 10-digit numeric
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    errors.push('Mobile number must be a 10-digit number.')
  }

  if (errors.length > 0) {
    return res.render('form', { errors, old: req.body })
  }

  next() 
}
