import { Data } from "@/types";

export const getStatusCountData = (
  data: Data[]
): { labels: string[]; data: number[] } => {
  const countObj = {} as Record<string, number>;
  data?.forEach(({ status }) => {
    if (!countObj[status]) {
      countObj[status] = 1;
    }
    countObj[status] += 1;
  });

  return {
    labels: Object.keys(countObj),
    data: Object.values(countObj),
  };
};
