export default function Header() {
  return (
    <div className="flex items-center gap-2">
      <svg
        className="border border-[white]"
        xmlns="http://www.w3.org/2000/svg"
        height="18"
        viewBox="4 4 188 188"
        width="18"
      >
        <path d="m4 4h188v188h-188z" fill="#f60" />
        <path
          d="m73.2521756 45.01 22.7478244 47.39130083 22.7478244-47.39130083h19.56569631l-34.32352071 64.48661468v41.49338532h-15.98v-41.49338532l-34.32352071-64.48661468z"
          fill="#fff"
        />
      </svg>
      <h1 className="text-lg font-bold">AI News</h1>
    </div>
  );
}
