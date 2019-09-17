export async function get_file(owner, repo, ref, path) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {Accept: "application/vnd.github.v3.raw"};
  const response = await fetch(url, {headers});
  if (!response.ok) {
    throw await response.json();
  }
  return response.text();
}
