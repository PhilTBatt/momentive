import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/graphql/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../context#MyContext",
        avoidOptionals: true,
        noImplicitAny: true
      }
    }
  },
  ignoreNoDocuments: true
}

export default config