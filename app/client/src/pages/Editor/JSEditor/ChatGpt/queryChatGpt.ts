const token = "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";

const extractResponse = (str: string) => {
  if (!str) return;
  const [first, ...allComponents] = str.split("\n\n");

  return allComponents.join("\n\n");
};
export const queryChatGpt = async (query: string) => {
  try {
    const resp = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        model: "code-davinci-002",
        prompt: query,
        max_tokens: 100,
        temperature: 0,
      }),
    });
    const { choices } = (await resp.json()) || {};

    const responseText = choices?.[0]?.text;

    return responseText;
  } catch (e) {
    console.log("surya ", e);
  }
};
export {};
