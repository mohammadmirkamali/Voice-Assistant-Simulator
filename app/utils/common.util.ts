export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const responseText = await response.text();

  // Fixing the response text to be valid JSON
  const fixedResponseText = responseText
    .replace(/(\w+):/g, '"$1":') // Enclose keys in double quotes
    .replace(/,\n/g, ","); // Remove any trailing commas causing issues

  return JSON.parse(fixedResponseText) as T;
};
