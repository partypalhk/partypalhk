import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.7.0",
  ssgName: "custom",
  nodeVersion: "18",

  // STEP 1: Define content structure (products)
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["products"],
      models: [
        {
          name: "PartyKit",
          type: "data",  // Not a page, just data
          label: "Party Kit",
          filePath: "products/{slug}.json",
          fields: [
            { name: "name", type: "string", label: "Name", required: true },
            { name: "price", type: "number", label: "Price (HK$)", required: true },
            { name: "img", type: "image", label: "Image" },
            { name: "type", type: "enum", label: "Type", options: ["digital", "physical", "bundle"] },
            { name: "desc", type: "text", label: "Description" }
          ]
        },
        // STEP 2: Define PAGE model (your homepage)
        {
          name: "Page",
          type: "page",  // This is a PAGE
          label: "Page",
          urlPath: "/",  // STEP 3: URL = homepage
          filePath: "index.html",  // Your index.html
          fields: [
            { name: "title", type: "string", label: "Site Title" },
            { name: "subtitle", type: "string", label: "Hero Subtitle" },
            { name: "tagline", type: "string", label: "Hero Tagline" },
            {
              name: "products",
              type: "list",
              label: "Products",
              items: { type: "model", models: ["PartyKit"] }
            },
            { name: "checkoutTitle", type: "string", label: "Checkout Title" },
            { name: "checkoutQR", type: "image", label: "PayMe QR" },
            { name: "checkoutInstruction", type: "string", label: "Checkout Instruction" }
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
  ],

  // STEP 3: Connect page to URL (already done in urlPath above)
  mapModels: {
    Page: "page"
  }
});
