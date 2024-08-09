import {object, string} from 'yup';

const deviceConfigSchema = object().shape({
  orgId: string().required('Organization ID is required'),
  deviceId: string().required('Device ID is required'),
  ssid: string().required('SSID is required'),
  pass: string().required('Password is required'),
  socketIP: string().required('Socket IP is required'),
  port: string().required('Socket Port is required'),
});

export default deviceConfigSchema;
