import { Pencil1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { Data } from "@/types";
import { useData } from "@/state";

const formSchema = z.object({
  len: z.number().min(1),
  status: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

type FormDataProps = {
  isAdd?: boolean;
  isEdit?: boolean;
  data?: Data;
};

const FormData = ({ isAdd, isEdit, data }: FormDataProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      len: isAdd ? 0 : isEdit ? data?.len : 0,
      status: isAdd ? "" : isEdit ? data?.status.toString() : "",
    },
  });

  const { editData, mutateData } = useData();

  function onSubmit(values: FormSchema) {
    const parseStatus = Number(values.status);
    const newValues = {
      ...values,
      status: parseStatus,
    };

    isAdd
      ? mutateData(newValues)
      : isEdit && data?.id
      ? editData(data?.id, newValues)
      : null;

    form.reset();
    setIsMenuOpen(false);
  }

  return (
    <Dialog open={isMenuOpen} onOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
      <DialogTrigger>
        <Button className="flex gap-2" variant={isEdit ? "ghost" : "default"}>
          {isAdd ? (
            <>
              <PlusCircledIcon /> Add New Data
            </>
          ) : isEdit ? (
            <Pencil1Icon />
          ) : (
            ""
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isAdd ? "Add New Data" : isEdit ? "Edit Data" : ""}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="len"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter len information</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 ml-auto w-fit">
              <Button type="submit" variant={"outline"}>
                Save
              </Button>
              <Button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                Close
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormData;
