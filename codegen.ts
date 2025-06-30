import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/app/graphql/schema.ts",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/app/graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/app/graphql/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  }
}

export default config