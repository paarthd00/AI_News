import { Input } from "@/components/ui/input";
export const component = function Threads() {
  return <div className="py-10 container flex gap-2 items-center justify-center bg-[#F6F6EF]">
      <p>Search : </p>
      <Input
        className="w-[15rem]"
        placeholder="Search threads"
      />
  </div>;
};
