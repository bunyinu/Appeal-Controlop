const chokidar = require('chokidar');
const { exec } = require('child_process');
const nodemon = require('nodemon');

const nodeEnv = process.env.NODE_ENV || 'dev_stage';
const childEnv = { ...process.env, NODE_ENV: nodeEnv };

const migrationsWatcher = chokidar.watch('./src/db/migrations', {
    persistent: true,
    ignoreInitial: true
});
migrationsWatcher.on('add', (filePath) => {
    console.log(`[DEBUG] New migration file: ${filePath}`);
    exec('npm run db:migrate', { env: childEnv }, (error, stdout, stderr) => {
        console.log(stdout);
        if (error) {
            console.error(stderr);
        }
    });
});

const seedersWatcher = chokidar.watch('./src/db/seeders', {
    persistent: true,
    ignoreInitial: true
});
seedersWatcher.on('add', (filePath) => {
    console.log(`[DEBUG] New seed file: ${filePath}`);
    exec('npm run db:seed', { env: childEnv }, (error, stdout, stderr) => {
        console.log(stdout);
        if (error) {
            console.error(stderr);
        }
    });
});

nodemon({
    script: './src/index.js',
    env: childEnv,
    ignore: ['./src/db/migrations', './src/db/seeders'],
    delay: '500'
});

nodemon.on('start', () => {
    console.log('Nodemon started');
});

nodemon.on('restart', (files) => {
    console.log('Nodemon restarted due changes in:', files);
});
