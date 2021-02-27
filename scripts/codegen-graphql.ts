import { generate } from "@graphql-codegen/cli";
import checkEnv from "@47ng/check-env";

checkEnv({
  required: ["NEXT_PUBLIC_API_URL"],
});

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

const _root = process.cwd();

const createConfig = (output: string, plugins: string[]) => ({
  schema: GRAPHQL_ENDPOINT,
  documents: _root + "/src/**/*.gql",
  generates: {
    [_root + output]: {
      plugins: ["typescript", "typescript-operations", ...plugins],
    },
  },
});

(async function () {
  await generate(
    createConfig("/src/api/graphql.ts", ["typescript-graphql-request"]),
    true
  );
})();
