import { KafkaConsumer } from './utils/kafka-consumer';

import * as express from 'express';
import * as dotenv from 'dotenv';
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger/swagger.json');

dotenv.config();

import { getwayRouter } from './restapi/routes/getway.router';

const app = express();
const port = process.env.PORT;

app.use(express.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', getwayRouter);
const kafkaConsumer = new KafkaConsumer();
kafkaConsumer.connent();
kafkaConsumer.subscribe('topic-test');

app.listen(port, () => {
	console.log(`[API Getway Server]: running at http://localhost:${port}`);
});
