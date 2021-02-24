const codegen = require("@graphql-codegen/cli");

const GRAPHQL_ENDPOINT = "http://localhost:3000/api/graphql";
const _root = process.cwd();

const createConfig = (output, plugins) => ({
  schema: GRAPHQL_ENDPOINT,
  documents: _root + "/src/**/*.gql",
  generates: {
    [_root + output]: {
      plugins: ["typescript", "typescript-operations", ...plugins],
    },
  },
});

codegen.generate(
  createConfig("/src/api/graphql.ts", ["typescript-graphql-request"]),
  true
);
