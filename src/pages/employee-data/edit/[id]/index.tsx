import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef, useMemo } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { useRoqClient, useEmployeeDataFindFirst } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';
import { convertQueryToPrismaUtil } from 'lib/utils';
import { employeeDataValidationSchema } from 'validationSchema/employee-data';
import { EmployeeDataInterface } from 'interfaces/employee-data';
import { UserInterface } from 'interfaces/user';

function EmployeeDataEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const roqClient = useRoqClient();
  const queryParams = useMemo(
    () =>
      convertQueryToPrismaUtil(
        {
          id,
        },
        'employee_data',
      ),
    [id],
  );
  const { data, error, isLoading, mutate } = useEmployeeDataFindFirst(queryParams, {}, { disabled: !id });
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: EmployeeDataInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await roqClient.employee_data.update({
        data: values as RoqTypes.employee_data,
        where: {
          id,
        },
      });
      mutate(updated);
      resetForm();
      router.push('/employee-data');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<EmployeeDataInterface>({
    initialValues: data,
    validationSchema: employeeDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Employee Data',
              link: '/employee-data',
            },
            {
              label: 'Update Employee Data',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Employee Data
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="date_of_birth" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Of Birth
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_of_birth ? new Date(formik.values?.date_of_birth) : null}
              onChange={(value: Date) => formik.setFieldValue('date_of_birth', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.gender}
            label={'Gender'}
            props={{
              name: 'gender',
              placeholder: 'Gender',
              value: formik.values?.gender,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.marital_status}
            label={'Marital Status'}
            props={{
              name: 'marital_status',
              placeholder: 'Marital Status',
              value: formik.values?.marital_status,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.nationality}
            label={'Nationality'}
            props={{
              name: 'nationality',
              placeholder: 'Nationality',
              value: formik.values?.nationality,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.phone_number}
            label={'Phone Number'}
            props={{
              name: 'phone_number',
              placeholder: 'Phone Number',
              value: formik.values?.phone_number,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/employee-data')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'employee_data',
    operation: AccessOperationEnum.UPDATE,
  }),
)(EmployeeDataEditPage);
