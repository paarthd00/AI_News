# C# ReactJS Tanstack Template

The program is a starting point for users trying to create a full-stack web application using C#, ReactJS, and MySQL.

- Models directory contains the data models
- Controllers Directory contains all the controllers for the backend
- The frontend directory is a Vite react app for state management, routing, and Querying. Tanstack is being used.
- Validation is done using ZOD.

## Get Started

### Backend

To get started inside the root directory for the application, install the following dotnet packages

`dotnet add package Pomelo.EntityFrameworkCore.MySql`

`dotnet add package DotNetEnv`

`dotnet add package Swashbuckle.AspNetCore`

Once the packages are installed, please use the `.env.template` to create a new `.env` file and fill in the database credentials.

The server can be started using the `dotnet watch` command.

### Frontend

We are using a proxy to the dotnet backend.

In `vite.config.ts,` ensure the target is pointing to the backend server.

```json

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5117",
        changeOrigin: true,
      },
    },
  },

```

### Tanstack

#### Tanstack Query

This app uses tanstack query to make calls to the backend, and manage state in the frontend.

Below is an example for querying some list of data from the backend API.

```ts
let { isPending, error, data } = useQuery({
  queryKey: ["milkData"],
  queryFn: () => fetch("/api/Milks").then((res) => res.json()),
});
```

#### Mutations

The following code is used for creating mutations.

```ts
const addMilkMutation = useMutation({
  mutationFn: createMilk,
  onSettled: () => queryClient.invalidateQueries({ queryKey: ["milkData"] }),
});
```

Here we call the mutation function `createMilk,` and one success, we invalidate the milkData queryKey,
allowing you to clear the cache and refresh the data.

Our newly created mutation can be using the code below.

```ts
addMilkMutation.mutate({ type, rating });
```

#### Search Params

So for using search params and passing data from URL, we are using `ZOD` along with `createFileRoute.`
from tanstack router

Using Zod, we will validate the search parameters.

```ts
export const editSearchSchema = z.object({
  id: z.number(),
  type: z.string(),
  rating: z.number().min(0).max(5),
  createdAt: z.string(),
});
```

The above code creates a schema for search param data and can be found in `validation.ts.`

And the code below creates a new route for search parameters that would validate the data.

```ts
export const Route = createFileRoute("/edit")({
  validateSearch: editSearchSchema,
});
```

And we can get the fields like this.

```ts
const { id, type, rating, createdAt } = Route.useSearch();
```


Thank you for reading!