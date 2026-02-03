export function getSingleIncluded(data, rel) {
  return data.included.find(
    (included) => included.type === rel.type && included.id === rel.id,
  );
}
