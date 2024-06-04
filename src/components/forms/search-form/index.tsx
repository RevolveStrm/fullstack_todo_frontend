"use client";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  prioritySelectData,
  searchSchema,
  statusSelectData,
} from "./constants";
import { Input } from "@/components/input";
import { useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pickBy from "lodash.pickby";
import { Select } from "@/components/select";

type SearchFormData = z.infer<typeof searchSchema>;

export const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const { handleSubmit, control, register } = useForm<SearchFormData>({
    defaultValues: { title: "", priority: "priority_ASC", status: "all" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const newParams = new URLSearchParams(searchParams.toString());

    const params = {
      sortField: data?.priority?.split("_")?.[0]?.toLowerCase(),
      sortDirection: data?.priority?.split("_")?.[1]?.toLowerCase(),
      title: data.title,
      status: data.status,
    };

    const filteredParams = pickBy(params, (value) => value && value.length > 0);

    if (filteredParams?.title) {
      newParams.set("title", `${params.title}`);
    } else {
      newParams.delete("title");
    }

    if (filteredParams?.sortField) {
      newParams.set("sortField", `${params.sortField}`);
    } else {
      newParams.delete("sortField");
    }

    if (filteredParams?.sortDirection) {
      newParams.set("sortDirection", `${params.sortDirection}`);
    } else {
      newParams.delete("sortDirection");
    }

    if (filteredParams?.status) {
      newParams.set("status", `${params.status}`);
    } else {
      newParams.delete("status");
    }
    if (searchParams.toString() !== newParams.toString()) {
      router.push(`${pathname}?${newParams}`, { scroll: false });
    }
  });

  const [titleValue, priorityValue, statusValue] = useWatch({
    control,
    name: ["title", "priority", "status"],
  });

  const debouncedTitleValue = useDebounce<string | undefined>(titleValue, 500);

  useEffect(() => {
    if (debouncedTitleValue || priorityValue || statusValue) {
      onSubmit();
    }
  }, [debouncedTitleValue, priorityValue, statusValue]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center  items-center gap-10 max-sm:flex-wrap"
    >
      <Input id="title" placeholder="Search" {...register("title")} />

      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            options={statusSelectData}
            onChange={(val) => onChange(val?.value)}
            onBlur={onBlur}
            isSearchable={false}
            unstyled
            value={statusSelectData.find((c) => c.value === value)}
            id={"status"}
            ref={ref}
          />
        )}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            options={prioritySelectData}
            onChange={(val) => onChange(val?.value)}
            onBlur={onBlur}
            unstyled
            isSearchable={false}
            value={prioritySelectData.find((c) => c.value === value)}
            id="priority"
            ref={ref}
          />
        )}
      />
    </form>
  );
};
