const camelizeData = (obj: object) => {
  const camelize = (s: string) => s.replace(/_./g, x => x[1].toUpperCase());
  return Object.entries(obj).reduce((newObj: { [key: string]: unknown }, [key, value]) => {
    newObj[camelize(key)] = value;
    return newObj;
  }, {});
};

export default camelizeData;
