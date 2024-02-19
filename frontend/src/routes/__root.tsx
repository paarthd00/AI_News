import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/add" className="[&.active]:font-bold">
          Add 
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})