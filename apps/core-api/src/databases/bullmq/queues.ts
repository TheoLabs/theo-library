export enum QueueName {
  HEALTH = 'health-queue',
  ADMIN = 'admin-queue',
}

export default Object.values(QueueName).map((name) => ({ name }));
