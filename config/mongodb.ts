interface mongodbConfiguration {
  host: string;
  port: number;
  database: string;
  password?: string;
};

const conf: mongodbConfiguration = {
  host: 'localhost',
  port: 27017,
  database: 'Oryx'
};

export default conf;