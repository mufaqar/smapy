console.log(
  `process.env.VERCEL_GIT_COMMIT_REF === ${process.env.VERCEL_GIT_COMMIT_REF}`
);

process.env.VERCEL_GIT_COMMIT_REF === "dev" ||
process.env.VERCEL_GIT_COMMIT_REF === "main"
  ? process.exit(1)
  : process.exit(0);
