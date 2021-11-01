import Queue from 'bull';
import redisConfig from '../config/redis';
import * as Jobs from '../jobs';

const queues = Object.values(Jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,

}))

export default {
  queues,
  add(name: string, data: any) {
    const queue = queues.find(queue => queue.name === name);

    const options = {
      delay: 4000,
      attempts: 1
    };

    return queue?.bull.add(data, options);
  },
  process() {
    return queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job Failed', queue.key, job.data);
        console.log(err);
      })
    })
  }
}