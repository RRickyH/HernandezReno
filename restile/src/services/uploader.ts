const API_URL = import.meta.env.VITE_API_URL;

export async function uploadImage(file: File, projectID: string) {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams({
    filename: file.name,
    projectID: projectID,
    contentType: file.type,
  });
  let response = await fetch(`${API_URL}/uploader?${params.toString()}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("unable to get presigned url from backend!");
    return null;
  }
  const data = await response.json();

  console.log("uploading image", data.objectKey);
  response = await fetch(data.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
  if (!response.ok) {
    console.error("unable to upload image", data.objectKey);
    return null;
  }
  console.log("image uploaded successfully", data.objectKey);
  return data.objectKey;
}
