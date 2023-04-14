const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
 
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {

    production: false,
    firebase: {
      apiKey: '${process.GOOGLE_API_KEY}',
      authDomain: '${process.AUTH_DOMAIN}',
      databaseURL: '${process.DATA_BASE_URL}',
      projectId: '${process.PROJECT_ID}',
      storageBucket: '${process.STORAGE_BUCKET}',
      messagingSenderId:'${process.MESSAGING_SENDER_ID}',
      appId: '${process.APP_ID}',
      measurementId: '${process.MEASUREMENT_ID}',
    }
};
`;
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv();
