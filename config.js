const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  const colors = require('colors');
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env'
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {

    production: false,
    firebase: {
      apiKey: '${process.env.GOOGLE_API_KEY}',
      authDomain: '${process.env.AUTH_DOMAIN}',
      databaseURL: '${process.env.DATA_BASE_URL}',
      projectId: '${process.env.PROJECT_ID}',
      storageBucket: '${process.env.STORAGE_BUCKET}',
      messagingSenderId:'${process.env.MESSAGING_SENDER_ID}',
      appId: '${process.env.APP_ID}',
      measurementId: '${process.env.MEASUREMENT_ID}'
    }
};
`;
  console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};

setEnv();
