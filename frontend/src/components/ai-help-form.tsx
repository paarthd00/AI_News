import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function AIHelpForm(
  {
    aiHelpForm,
    handleAIHelpSubmit
  }: {
    aiHelpForm: any,
    handleAIHelpSubmit: any
  }
) {
  if (!aiHelpForm) {
    return null;
  }
  return (
    <Form {...aiHelpForm}>
      <form
        onSubmit={aiHelpForm.handleSubmit(handleAIHelpSubmit)}
        className="py-10 px-4  flex items-center gap-3  w-full max-w-[600px] mx-auto bg-white rounded-lg shadow-lg"
      >
        <FormField
          control={aiHelpForm.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormControl>
                <Input className="rounded" placeholder="Write post about C++" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="btn bg-[#f0f0f0]">AI help</Button>
      </form>
    </Form>
  );
}
