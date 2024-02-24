import "dotenv/config";
import chalk from 'chalk';
import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(chalk.bgGreenBright.bold("Servidor escutando!")); 
})