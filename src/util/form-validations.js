export default function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Please enter your username';
  } else if (values.username.length > 20) {
    errors.username = '20 characters or less';
  }
  if (!values.password) {
    errors.password = 'Please enter your password';
  }
  if (!values.costs) {
    errors.costs = 'Required';
  } else if (values.costs.length > 12) {
    errors.costs = 'You passed the maximum costs allowed';
  } else if (values.costs < 0) {
    errors.costs = 'Please enter only positive numbers';
  }
  return errors;
}
