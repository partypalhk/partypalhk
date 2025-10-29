import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
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
            { name: "type", type: "enum", label: "Type", options: ["digital", "physical", "bundle"] },
            { name: "desc", type: "text", label: "Description" }
          ]
        }
      ],
      assetsConfig: {
        referenceType: "relative",
        assetsDir: "images"
      }
    })
  ],
  modelExtensions: [{ name: "PartyKit", type: "data", urlPath: "/products/{slug}" }],
  mapModels: { PartyKit: "party-kit" }
});
