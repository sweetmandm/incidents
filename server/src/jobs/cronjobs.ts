let CronJob = require('cron').CronJob;
import performIncidentFetch from './incident-rss/incidents';

function registerIncidentCron(runImmediately: boolean = true): void {
  if (runImmediately) { performIncidentFetch(); }
  // Fetch incidents every 10 minutes
  const job = new CronJob('0 */10 * * * *', performIncidentFetch);
  job.start();
}

function registerCronJobs(): void {
  registerIncidentCron();
}

export default registerCronJobs;
