import { useState } from "react";

const useForm = (callback, initialValues = {}) => {
  const [values, setValues] = useState(() => initialValues);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const changeValues = valuesToChange => {
    setValues({ ...values, ...valuesToChange });
  };

  return {
    changeValues,
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
