# AskWave Backend

## Requirements

- Ruby `3.2.11`
- PostgreSQL

Check your Ruby version before starting:

```bash
ruby -v
```

It must report `3.2.11`. Then install gems and prepare the database:

```bash
PATH="/opt/homebrew/opt/ruby@3.2/bin:$PATH" bin/setup
```

Start the backend on port `3001`:

```bash
PATH="/opt/homebrew/opt/ruby@3.2/bin:$PATH" bin/rails server -p 3001
```

If you want that to work without prefixing each command, add Homebrew Ruby to your shell `PATH`:

```bash
echo 'export PATH="/opt/homebrew/opt/ruby@3.2/bin:$PATH"' >> ~/.bash_profile
```

Then reload your shell and run:

```bash
bin/setup
bin/rails server -p 3001
```

The root endpoint at `http://localhost:3001/` should return a small JSON health response when the server is running.

For local PostgreSQL, the app now defaults to your current macOS username over the local socket. If you need a different role or password, set `POSTGRES_USER`, `POSTGRES_PASSWORD`, and the database name env vars before running `bin/setup`.
