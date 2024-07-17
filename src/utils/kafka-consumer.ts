import { Consumer, Kafka } from 'kafkajs';

export class KafkaConsumer {
	kafka: Kafka;
	consumer: Consumer;
	constructor() {
		this.kafka = new Kafka({
			brokers: ['localhost:9092'],
		});
	}
	async connent() {
		this.consumer = this.kafka.consumer({ groupId: 'test-group' });
		await this.consumer.connect();
	}
  
	async subscribe(topic: string) {
		await this.consumer.subscribe({ topic, fromBeginning: true });
		await this.consumer
			.run({
				// eachBatch: async ({ batch }) => {
				//   console.log(batch)
				// },
				eachMessage: async ({ topic, message }) => {
					const msg = JSON.parse(message.value.toString('utf8'));
					console.log(
						`[Kafka Consumer] message recieved from topic: ${topic}\n message: ${JSON.stringify(
							msg
						)}`
					);
				},
			})
			.catch((e) => console.error(`[Kafka Consumer] ERROR: ${e.message}`, e));
	}
}
