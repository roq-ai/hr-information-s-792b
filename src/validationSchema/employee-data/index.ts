import * as yup from 'yup';

export const employeeDataValidationSchema = yup.object().shape({
  date_of_birth: yup.date().nullable(),
  gender: yup.string().nullable(),
  marital_status: yup.string().nullable(),
  nationality: yup.string().nullable(),
  phone_number: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
