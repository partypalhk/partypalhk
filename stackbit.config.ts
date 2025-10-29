import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.7.0",
  ssgName: "custom",
  nodeVersion: "18",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["products"],
      models: [
        {
          name: "PartyKit",
          type: "data",
          label: "Party Kit",
          filePath: "products/{slug}.json",
          fields: [
            { name: "name", type: "string", label: "Name", required: true },
            { name: "price", type: "number", label: "Price (HK$)", required: true },
            { name: "img", type: "image", label: "Image" },
            { name: "desc", type: "text", label: "Description" }
          ]
        },
        {
          name: "Page",
          type: "page",
          label: "Homepage",
          urlPath: "/",
          filePath: "index.html",
          fields: [
            { name: "title", type: "string", label: "Title" },
            { name: "subtitle", type: "string", label: "Subtitle" },
            { name: "tagline", type: "string", label: "Tagline" },
            { name: "checkoutTitle", type: "string", label: "Checkout Title" },
            { name: "checkoutQR", type: "image", label: "PayMe QR" },
            { name: "checkoutInstruction", type: "string", label: "Instruction" }
          ]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "images",
        publicPath: "/"
      }
    })
  ]
});
