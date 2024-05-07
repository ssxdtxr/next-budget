import { TransactionType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

interface ICategoryPicker {
  type: TransactionType;
}

const CategoryPicker: FC<ICategoryPicker> = ({ type }) => {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });
  return <div>CategoryPicker</div>;
};

export default CategoryPicker;
