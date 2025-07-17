import ImageKit from "imagekit";

let imagekit = null;

// Only initialize ImageKit if environment variables are provided
if (
  process.env.IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.IMAGEKIT_URL_ENDPOINT
) {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
} else {
  console.log(
    "Warning: ImageKit configuration not found. Image upload features will be disabled.",
  );
}

export default imagekit;
