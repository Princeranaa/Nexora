import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { getAllEmployee, addEmployee } from "../service/employeeApi.service";
import { useEffect, useState } from "react";

export const useEmployee = (page, search) => {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["employees", page, search],
    queryFn: () => getAllEmployee(page, 10, search),
    staleTime: 100000,
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isPending,
    isFetching,
    error,
  };
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};


export const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};