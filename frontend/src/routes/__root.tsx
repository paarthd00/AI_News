import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '@/components/header'
export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 items-center justify-center w-100">
        <Link to="/" className="[&.active]:font-bold">
          <Header />
        </Link>{' '}
        <Link to="/new" className="[&.active]:font-bold">
          new {' | '}
        </Link>
        <Link to="/threads" className="[&.active]:font-bold">
          threads {' | '}
        </Link>
        <Link to="/comments" className="[&.active]:font-bold">
          comments {' | '}
        </Link>
        <Link to="/submit" className="[&.active]:font-bold">
          submit
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})