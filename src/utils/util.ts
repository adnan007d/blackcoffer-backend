export function getFilter(filter: Record<string, any>) {
  Object.keys(filter).forEach((key) => {
    if (Array.isArray(filter[key])) {
      filter[key] = { $in: filter[key] };
    } else if (filter[key]) {
      filter[key] = { $in: [filter[key]] };
    } else {
      delete filter[key];
    }
  });
  return filter;
}
