import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const component = function Threads() {
  return <div className="py-10 container">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Threads</h1>
        <Input>Search...
        </Input>  
    </div>
    </div>;
};
