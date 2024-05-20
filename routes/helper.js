function containsInvalidQueries(obj, keys) {
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      return true;
    }
  }

  return false;
}

export { containsInvalidQueries };
