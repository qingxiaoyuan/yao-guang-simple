export interface TaskType {
  jobId?: string;
  jobName?: string;
  jobGroup?: string;
  invokeTarget?: string;
  cronExpression?: string;
  misfirePolicy?: string;
  concurrent?: string;
  status?: string;
  createTime?: string;
}
