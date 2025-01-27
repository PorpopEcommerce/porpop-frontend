import { FaCaretRight } from "react-icons/fa";

interface TRoutes {
  routes: string[];
}

export default function Routes({ routes }: TRoutes) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <p className="text-white shrink-0">Dashboard</p>
      {routes.map((route, index) => (
        <div key={route} className="shrink-0 flex items-center gap-4 text-sm">
          <FaCaretRight className="text-grey-300" />
          <p
            className={
              index === routes.length - 1 ? "text-grey-300" : "text-white"
            }
          >
            {route}
          </p>
        </div>
      ))}
    </div>
  );
}
